/**
 * Nonise Florist - Dynamic Open Graph Image Generator
 * Cloudflare Worker that creates SVG OG images on-the-fly
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === '/favicon' || pathname === '/favicon.ico') {
      return generateFavicon();
    }

    if (pathname === '/apple-touch-icon' || pathname === '/apple-touch-icon.png') {
      return generateAppleTouchIcon();
    }

    // OG image endpoint
    if (pathname === '/' || pathname === '/og' || pathname === '/og-image') {
      const title = url.searchParams.get('title') || 'Nonise Florist';
      const subtitle = url.searchParams.get('subtitle') || 'Let Beauty Bloom';
      const bg = url.searchParams.get('bg') || '#FDFBF7';
      const color = url.searchParams.get('color') || '#AB274A';
      return generateOgImage(title, subtitle, bg, color);
    }

    return new Response('Not Found', { status: 404 });
  },
};

function generateOgImage(title, subtitle, bg, color) {
  const width = 1200;
  const height = 630;

  // Escape special characters for SVG
  const escTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escSubtitle = subtitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escTitle}">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#F7EFE3"/>
    </linearGradient>
    <radialGradient id="petalAcc">
      <stop offset="0%" stop-color="#FFD9DD"/>
      <stop offset="100%" stop-color="${color}"/>
    </radialGradient>
  </defs>
  
  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
  
  <g fill="#E87A90" opacity="0.15">
    <path d="M200 120 c15 -20 35 -20 50 0 c15 20 15 40 0 50 c-15 20 -35 20 -50 0 c-15 -20 -15 -40 0 -50"/>
    <path d="M1000 150 c20 -15 35 -35 25 -55 c-10 -20 -30 -25 -50 -10 c-20 15 -25 35 -10 50 c15 15 35 10 50 -10"/>
    <path d="M300 400 c12 -8 22 -22 20 -35 c-2 -13 -12 -18 -25 -15 c-13 3 -18 18 -15 30 c3 12 12 17 24 20"/>
    <path d="M850 380 c10 -12 28 -18 40 -10 c12 8 18 28 10 42 c-8 14 -28 18 -42 10 c-14 -8 -18 -28 -10 -42"/>
  </g>
  
  <g font-family="Playfair Display, serif" text-anchor="start">
    <text x="60" y="180" fill="#2F1B2E" font-weight="700" font-size="48" letter-spacing="0.5px">
      NONISE
      <tspan x="60" dy="0" font-size="48">FLORIST</tspan>
    </text>
    <text x="60" y="240" fill="${color}" font-weight="500" font-size="48" letter-spacing="1px">
      ${escSubtitle}
    </text>
  </g>
  
  <text x="60" y="320" fill="#584144" font-family="Plus Jakarta Sans, sans-serif" font-size="28" letter-spacing="0.5px">
    ${escSubtitle}
  </text>
  
  <text x="60" y="370" fill="#584144" font-family="Plus Jakarta Sans, sans-serif" font-size="22" letter-spacing="0.3px">
    Female-owned floristry boutique • Pietermaritzburg
  </text>
  
  <line x1="60" y1="430" x2="960" y2="430" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
  
  <text x="60" y="480" fill="#8B7073" font-family="Plus Jakarta Sans, sans-serif" font-size="20">
    noniseflorist.com
  </text>
  
  <circle cx="40" cy="560" r="8" fill="${color}" opacity="0.3"/>
  <circle cx="20" cy="575" r="5" fill="${color}" opacity="0.2"/>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml;charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function generateFavicon() {
  // Simple colored circle favicon
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="16" fill="#D84A6A"/>
  <circle cx="16" cy="16" r="8" fill="#AB274A" opacity="0.9"/>
  <circle cx="16" cy="16" r="4" fill="white"/>
</svg>`;
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml;charset=utf-8',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}

function generateAppleTouchIcon() {
  // 180x180 Apple Touch Icon
  const size = 180;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#D84A6A"/>
  <text x="${size/2}" y="${size/2 + 12}" text-anchor="middle" font-family="Playfair Display, serif" 
        font-size="64" font-weight="700" fill="white">NF</text>
</svg>`;
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml;charset=utf-8',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}