import { createHash } from 'node:crypto';
import {
  CHECKOUT_ADDONS,
  deliveryFeeZAR,
  ROSE_COLOR_OPTIONS,
  ROSE_SIZE_PRODUCTS,
  SELLABLE_PRODUCTS,
} from '../data/noniseData';

export interface PayfastConfig {
  merchantId: string;
  merchantKey: string;
  passphrase: string;
  host: string;
}

export interface PayfastResult {
  status: number;
  body: Record<string, unknown>;
}

export function payfastConfig(env: Record<string, unknown> = {}): PayfastConfig {
  return {
    merchantId: String(env.PAYFAST_MERCHANT_ID || '31790723'),
    merchantKey: String(env.PAYFAST_MERCHANT_KEY || 'yx6v2da4vda4vdd37'),
    passphrase: String(env.PAYFAST_PASSPHRASE || ''),
    host: env.PAYFAST_SANDBOX === 'true' ? 'sandbox.payfast.co.za' : 'www.payfast.co.za',
  };
}

// PayFast signs the fields in form order using PHP-style urlencode.
export function payfastEncode(value: string) {
  return encodeURIComponent(value.trim()).replace(/%20/g, '+');
}

export function payfastSignature(fields: Record<string, string>, passphrase = '') {
  const body = Object.entries(fields)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => `${key}=${payfastEncode(value)}`)
    .join('&');
  const signed = passphrase ? `${body}&passphrase=${payfastEncode(passphrase)}` : body;
  return createHash('md5').update(signed).digest('hex');
}

// Build a signed PayFast payment from the cart. Prices come from the server
// catalogue, never from the browser.
export function buildCheckout(
  body: Record<string, unknown>,
  origin: string,
  config: PayfastConfig
): PayfastResult {
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
        return {
          status: 400,
          body: { error: 'Choose a rose colour for every rose bouquet.' },
        };
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
    return { status: 400, body: { error: 'A valid cart, name and email are required.' } };
  }

  const [firstName, ...restName] = senderName.split(/\s+/);
  const reference = `NF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const base = origin.replace(/\/+$/, '');
  const text = (value: unknown) => String(value ?? '').trim().slice(0, 255);

  const addonSummary = addons.length
    ? ` + ${addons.map((addon) => addon.label).join(', ')}`
    : '';
  const fields: Record<string, string> = {
    merchant_id: config.merchantId,
    merchant_key: config.merchantKey,
    return_url: `${base}/checkout?paid=1&ref=${encodeURIComponent(reference)}`,
    cancel_url: `${base}/checkout?cancelled=1`,
    notify_url: `${base}/api/payfast/notify`,
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
  fields.signature = payfastSignature(fields, config.passphrase);

  return {
    status: 200,
    body: {
      processUrl: `https://${config.host}/eng/process`,
      fields,
      reference,
      subtotal,
      deliveryFee,
      amount,
    },
  };
}

// PayFast ITN webhook: verify the signature, confirm the payload with PayFast,
// then record the result. No order store exists yet, so paid orders are written
// to the process log for manual reconciliation.
// shortcut: log-only order recording, add a database/email alert before volume grows.
export async function handleNotify(
  body: Record<string, unknown>,
  config: PayfastConfig
): Promise<{ status: number; body: string }> {
  try {
    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(body)) {
      if (key !== 'signature') fields[key] = String(value ?? '');
    }
    const signature = String(body.signature ?? '');
    if (!signature || payfastSignature(fields, config.passphrase) !== signature) {
      console.warn('[payfast] ITN rejected: signature mismatch');
      return { status: 400, body: 'Invalid signature' };
    }
    if (fields.merchant_id !== config.merchantId) {
      console.warn('[payfast] ITN rejected: unknown merchant');
      return { status: 400, body: 'Unknown merchant' };
    }

    const form = new URLSearchParams();
    for (const [key, value] of Object.entries(body)) form.set(key, String(value ?? ''));
    const check = await fetch(`https://${config.host}/eng/query/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    });
    if ((await check.text()).trim() !== 'VALID') {
      console.warn('[payfast] ITN rejected: PayFast did not validate the payload');
      return { status: 400, body: 'Invalid ITN' };
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
    return { status: 200, body: 'OK' };
  } catch (error) {
    console.error('[payfast] ITN error:', error);
    return { status: 500, body: 'ITN error' };
  }
}
