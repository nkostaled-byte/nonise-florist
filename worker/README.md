Nonise Florist - Cloudflare Worker for Dynamic OG Images
========================================================

## What it does
Generates Open Graph images on-the-fly via Cloudflare Workers, 
ensuring perfect rendering across all social platforms.

## Endpoints

| Path | Purpose | Dimensions |
|------|---------|------------|
| `/og` | Default OG image | 1200×630 |
| `/og?title=...&subtitle=...&bg=...&color=...` | Custom OG image | 1200×630 |
| `/favicon` | Favicon (SVG) | 32×32 |
| `/apple-touch-icon` | Apple Touch Icon | 180×180 |

## Deployment

```bash
cd worker
npm install -g wrangler
wrangler login
wrangler deploy
```

## Integration

Update your `index.html` to reference the worker:

```html
<meta property="og:image" content="https://og.noniseflorist.com/og" />
<meta name="twitter:image" content="https://og.noniseflorist.com/og" />
<link rel="icon" href="https://og.noniseflorist.com/favicon" />
<link rel="apple-touch-icon" href="https://og.noniseflorist.com/apple-touch-icon" />
```

## Custom OG for Products

You can generate product-specific OG images by passing parameters:

```
https://og.noniseflorist.com/og?title=50%20Roses%20with%20GYP&subtitle=R1500%20|%20Everyday%20Bouquets&bg=#FDFBF7&color=#D84A6A
```

Parameters:
- `title` - Product name (URL encoded)
- `subtitle` - Price and category (URL encoded)
- `bg` - Background color hex
- `color` - Accent color hex

## Note on Local Development

For local development, the static site still serves the SVG files from
`public/assets/nonise/seo/og-image.svg`. The worker is intended for 
production deployment via Cloudflare Workers.

To test locally:
```bash
wrangler dev
```
Then visit http://localhost:8787/og