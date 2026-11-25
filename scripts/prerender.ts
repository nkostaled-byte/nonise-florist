import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import {
  INDEXABLE_ROUTES,
  PRERENDER_ROUTES,
  canonicalUrl,
  pathFor,
  type RouteState,
} from '../src/lib/routes';
import { renderHeadTags, seoFor } from '../src/lib/seo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const SEO_BLOCK = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/;
const ROOT_BLOCK = /<div id="root"><\/div>/;

function outputFileFor(route: RouteState): string {
  const routePath = pathFor(route);
  if (routePath === '/' || routePath === '') {
    return path.join(distDir, 'index.html');
  }
  const segments = routePath.replace(/^\/+|\/+$/g, '').split('/');
  const dir = path.join(distDir, ...segments);
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'index.html');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function writeSitemap(): void {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = INDEXABLE_ROUTES.map((route) => {
    const loc = canonicalUrl(route);
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
}

function main(): void {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Missing ${templatePath}. Run "vite build" before prerendering.`);
  }

  const template = fs.readFileSync(templatePath, 'utf8');
  if (!SEO_BLOCK.test(template)) {
    throw new Error('index.html is missing the <!-- SEO:START --> / <!-- SEO:END --> markers.');
  }
  if (!ROOT_BLOCK.test(template)) {
    throw new Error('index.html is missing an empty <div id="root"></div> mount point.');
  }

  let count = 0;

  for (const route of PRERENDER_ROUTES) {
    const head = renderHeadTags(seoFor(route));
    const body = renderToString(
      React.createElement(App as React.FC<{ initialRoute?: RouteState }>, {
        initialRoute: route,
      })
    );
    const html = template
      .replace(SEO_BLOCK, `<!-- SEO:START -->\n    ${head}\n    <!-- SEO:END -->`)
      .replace(ROOT_BLOCK, `<div id="root">${body}</div>`);
    fs.writeFileSync(outputFileFor(route), html, 'utf8');
    count += 1;
  }

  writeSitemap();
  console.log(`Prerendered ${count} routes and wrote sitemap.xml.`);
}

main();
