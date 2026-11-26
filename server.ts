import 'dotenv/config';
import crypto from 'crypto';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  CHECKOUT_ADDONS,
  deliveryFeeZAR,
  ROSE_COLOR_OPTIONS,
  ROSE_SIZE_PRODUCTS,
  SELLABLE_PRODUCTS,
} from './src/data/noniseData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// The merchant key is public (PayFast forms post it in plain HTML); the
// optional passphrase is the real secret and must stay in the environment.
const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID || '31790723';
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY || 'yx6v2da4vda4vdd37';
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE || '';
const PAYFAST_HOST =
  process.env.PAYFAST_SANDBOX === 'true' ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';

// PayFast signs the fields in form order using PHP-style urlencode.
function payfastEncode(value: string) {
  return encodeURIComponent(value.trim()).replace(/%20/g, '+');
}

function payfastSignature(fields: Record<string, string>) {
  const body = Object.entries(fields)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => `${key}=${payfastEncode(value)}`)
    .join('&');
  const signed = PAYFAST_PASSPHRASE
    ? `${body}&passphrase=${payfastEncode(PAYFAST_PASSPHRASE)}`
    : body;
  return crypto.createHash('md5').update(signed).digest('hex');
}

async function startServer() {
  const app = express();

  app.use('/api', express.json({ limit: '64kb' }));
  app.use('/api', express.urlencoded({ extended: false, limit: '64kb' }));

  // Build a signed PayFast payment from the cart. Prices come from the server
  // catalogue, never from the browser.
  app.post('/api/payfast/checkout', (req, res) => {
    const body = (req.body ?? {}) as Record<string, unknown>;

    const items: {
      product: (typeof SELLABLE_PRODUCTS)[number];
      quantity: number;
      color?: string;
    }[] = [];
    for (const raw of Array.isArray(body.items) ? body.items : []) {
      const entry = (raw ?? {}) as Record<string, unknown>;
      const product = SELLABLE_PRODUCTS.find((p) => p.id === Number(entry.id));
      const quantity = Math.floor(Number(entry.quantity));
      if (product && quantity > 0) {
        const isRoseSize = ROSE_SIZE_PRODUCTS.some((rose) => rose.id === product.id);
        const color = isRoseSize ? String(entry.color ?? '').trim() : '';
        if (isRoseSize && !ROSE_COLOR_OPTIONS.some((option) => option === color)) {
          return res
            .status(400)
            .json({ error: 'Choose a rose colour for every rose bouquet.' });
        }
        items.push({
          product,
          quantity: Math.min(quantity, 99),
          color: color || undefined,
        });
      }
    }

    const addonIds = Array.isArray(body.addonIds)
      ? body.addonIds.filter((id): id is string => typeof id === 'string')
      : [];
    const addons = CHECKOUT_ADDONS.filter((addon) => addonIds.includes(addon.id));

    const fulfillment = body.fulfillment === 'collection' ? 'collection' : 'delivery';
    const subtotal = items.reduce((sum, i) => sum + i.product.priceZAR * i.quantity, 0);
    const itemsTotal = subtotal + addons.reduce((sum, addon) => sum + addon.priceZAR, 0);
    const deliveryFee = deliveryFeeZAR(itemsTotal, fulfillment);
    const amount = itemsTotal + deliveryFee;

    const senderName = String(body.senderName ?? '').trim();
    const email = String(body.senderEmail ?? '').trim();
    if (items.length === 0 || !senderName || !email || amount <= 0) {
      return res.status(400).json({ error: 'A valid cart, name and email are required.' });
    }

    const [firstName, ...restName] = senderName.split(/\s+/);
    const reference = `NF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const origin = (process.env.APP_URL || `${req.protocol}://${req.get('host')}`).replace(
      /\/+$/,
      ''
    );
    const text = (value: unknown) => String(value ?? '').trim().slice(0, 255);

    const addonSummary = addons.length
      ? ` + ${addons.map((addon) => addon.label).join(', ')}`
      : '';
    const fields: Record<string, string> = {
      merchant_id: PAYFAST_MERCHANT_ID,
      merchant_key: PAYFAST_MERCHANT_KEY,
      return_url: `${origin}/checkout?paid=1&ref=${encodeURIComponent(reference)}`,
      cancel_url: `${origin}/checkout?cancelled=1`,
      notify_url: `${origin}/api/payfast/notify`,
      name_first: firstName.slice(0, 100),
      name_last: (restName.join(' ') || '-').slice(0, 100),
      email_address: email.slice(0, 100),
      cell_number: text(body.senderPhone),
      m_payment_id: reference,
      amount: amount.toFixed(2),
      item_name: 'Nonise Florist order',
      item_description: `${items
        .map((i) => `${i.quantity}x ${i.product.name}${i.color ? ` (${i.color})` : ''}`)
        .join('; ')}${addonSummary}${deliveryFee ? ' + R100 local delivery' : ''}`.slice(0, 255),
      custom_str1: `Fulfilment: ${fulfillment}`,
      custom_str2: `Date: ${text(body.deliveryDate)} ${text(body.timeWindow)}`,
      custom_str3: `Recipient: ${text(body.recipientName)} ${text(body.recipientPhone)} ${text(
        body.deliveryAddress
      )} ${text(body.suburb)}`
        .trim()
        .slice(0, 255),
      custom_str4: text(body.cardMessage),
      custom_str5: text(body.specialInstructions),
      email_confirmation: '1',
      confirmation_address: email,
    };
    fields.signature = payfastSignature(fields);

    return res.json({
      processUrl: `https://${PAYFAST_HOST}/eng/process`,
      fields,
      reference,
      subtotal,
      deliveryFee,
      amount,
    });
  });

  // PayFast ITN webhook: verify the signature, confirm the payload with
  // PayFast, then record the result. No order store exists yet, so paid
  // orders are written to the process log for manual reconciliation.
  // shortcut: log-only order recording, add a database/email alert before volume grows.
  app.post('/api/payfast/notify', async (req, res) => {
    try {
      const body = (req.body ?? {}) as Record<string, string>;
      const { signature, ...fields } = body;
      if (!signature || payfastSignature(fields) !== signature) {
        console.warn('[payfast] ITN rejected: signature mismatch');
        return res.status(400).send('Invalid signature');
      }
      if (fields.merchant_id !== PAYFAST_MERCHANT_ID) {
        console.warn('[payfast] ITN rejected: unknown merchant');
        return res.status(400).send('Unknown merchant');
      }

      const check = await fetch(`https://${PAYFAST_HOST}/eng/query/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body).toString(),
      });
      if ((await check.text()).trim() !== 'VALID') {
        console.warn('[payfast] ITN rejected: PayFast did not validate the payload');
        return res.status(400).send('Invalid ITN');
      }

      console.log(
        '[payfast] ITN',
        JSON.stringify({
          reference: fields.m_payment_id,
          status: fields.payment_status,
          amount: fields.amount_gross,
          items: fields.item_description,
          email: fields.email_address,
          name: `${fields.name_first ?? ''} ${fields.name_last ?? ''}`.trim(),
          fulfilment: fields.custom_str1,
          delivery: fields.custom_str2,
          recipient: fields.custom_str3,
          card: fields.custom_str4,
          notes: fields.custom_str5,
        })
      );
      return res.status(200).send('OK');
    } catch (error) {
      console.error('[payfast] ITN error:', error);
      return res.status(500).send('ITN error');
    }
  });

  if (IS_PRODUCTION) {
    app.set('trust proxy', true);

    // HSTS: force HTTPS for a year on every response (ignored over plain HTTP).
    app.use((_req, res, next) => {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      next();
    });

    const canonicalHost = (process.env.CANONICAL_HOST || 'noniseflorist.com').toLowerCase();
    const forceHttps = process.env.FORCE_HTTPS !== 'false';

    // Normalise the host, protocol and trailing slash to the canonical URL so
    // search engines only ever see one version of each page.
    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();

      const host = (req.hostname || '').toLowerCase();
      if (!host) return next();

      const isCanonical = host === canonicalHost;
      const isWww = host === `www.${canonicalHost}`;
      if (!isCanonical && !isWww) return next();

      const proto = (req.protocol || 'http').toLowerCase();
      const original = req.originalUrl || req.url || '/';
      const queryIndex = original.indexOf('?');
      const pathOnly = queryIndex >= 0 ? original.slice(0, queryIndex) : original;
      const query = queryIndex >= 0 ? original.slice(queryIndex) : '';
      const trimmedPath = pathOnly.length > 1 ? pathOnly.replace(/\/+$/, '') : pathOnly;
      const targetPath = trimmedPath === pathOnly ? original : `${trimmedPath}${query}`;
      const targetHost = isWww ? canonicalHost : host;

      if (isWww || (forceHttps && proto !== 'https') || trimmedPath !== pathOnly) {
        return res.redirect(301, `https://${targetHost}${targetPath}`);
      }

      return next();
    });

    // 301 legacy/alias paths to their canonical URLs so crawlers never index duplicates.
    const ALIAS_REDIRECTS: Record<string, string> = {
      '/home': '/',
      '/about-us': '/about',
      '/contact-us': '/contact',
      '/cart': '/checkout',
      '/my-account': '/shop',
      // Collection categories renamed in 2026.
      '/collections/roses': '/collections/rose-bouquets',
      '/collections/everyday-bouquets': '/collections/mixed-bouquets',
      '/collections/gifting': '/collections/hampers',
    };

    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();

      const rawPath = (req.path || '/').replace(/\/+$/, '') || '/';
      const pathname = rawPath.toLowerCase();
      const target =
        ALIAS_REDIRECTS[pathname] ?? (rawPath !== pathname ? pathname : undefined);
      if (!target) return next();

      const original = req.originalUrl || '';
      const queryIndex = original.indexOf('?');
      const query = queryIndex >= 0 ? original.slice(queryIndex) : '';
      return res.redirect(301, `https://${canonicalHost}${target}${query}`);
    });
  }

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    const indexFile = path.join(distDir, 'index.html');

    if (!fs.existsSync(indexFile)) {
      throw new Error('Build output not found. Run "npm run build" first.');
    }

    // Serve real files (assets, robots.txt, sitemap.xml) with appropriate caching.
    app.use(
      express.static(distDir, {
        index: false,
        redirect: false,
        setHeaders: (res, filePath) => {
          const normalized = filePath.replace(/\\/g, '/');
          if (/\/assets\/(nonise|floral|aistudio)\//.test(normalized)) {
            res.setHeader('Cache-Control', 'public, max-age=604800');
          } else if (/\/assets\//.test(normalized)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          } else {
            res.setHeader('Cache-Control', 'no-cache');
          }
        },
      })
    );

    // Serve the prerendered HTML for each known route (/, /shop, /product/:slug, ...).
    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next();
      }

      let pathname: string;
      try {
        pathname = decodeURIComponent(req.path);
      } catch {
        return next();
      }

      const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
      const candidate = path.resolve(
        distDir,
        cleanPath ? path.join(cleanPath, 'index.html') : 'index.html'
      );

      if (!candidate.startsWith(`${distDir}${path.sep}`)) {
        return next();
      }

      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        res.setHeader('Cache-Control', 'no-cache');
        return res.sendFile(candidate);
      }

      return next();
    });

    // Unknown paths are genuine 404s (no soft-404 home fallback).
    app.use((_req, res) => {
      res.status(404);
      res.setHeader('Cache-Control', 'no-store');
      const notFoundFile = path.join(distDir, '404.html');
      if (fs.existsSync(notFoundFile)) {
        res.sendFile(notFoundFile);
      } else {
        res.type('text/plain').send('404 Not Found');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nonise Florist server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
