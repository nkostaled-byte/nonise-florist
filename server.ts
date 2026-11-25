import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();

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
