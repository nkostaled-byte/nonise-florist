import { BRAND_STORY, BUSINESS_INFO, PRODUCTS } from '../data/noniseData';
import { LandingPageConfig, landingBySlug } from '../data/landingPages';
import { Product } from '../types';
import { RouteState, SITE_URL, canonicalUrl, pathFor, productBySlug } from './routes';

const OG_IMAGE = `${SITE_URL}/assets/nonise/seo/og-image.jpg`;

// Social scrapers handle JPEG more reliably than WebP, so every product has a
// pre-rendered 1200x630 JPEG named after its slug.
function productOgImage(slug: string): string {
  return `${SITE_URL}/assets/nonise/seo/og-${slug}.jpg`;
}

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  image: string;
  imageAlt?: string;
  type: 'website' | 'product' | 'article';
  jsonLd: Record<string, unknown>[];
}

function absoluteAsset(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

// Keep meta descriptions within the ~155-160 character window Google shows in
// the SERP, trimming on a word boundary rather than cutting mid-phrase.
function clampDescription(value: string, max = 158): string {
  const clean = value.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const base = lastSpace > 80 ? cut.slice(0, lastSpace) : cut;
  return `${base.replace(/[\s.,;:!?-]+$/, '')}…`;
}

function localBusinessJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['Florist', 'LocalBusiness'],
    '@id': `${SITE_URL}/#florist`,
    name: BUSINESS_INFO.name,
    alternateName: 'Nonise Florist Pietermaritzburg',
    description: BRAND_STORY.whoWeAre,
    url: `${SITE_URL}/`,
    image: OG_IMAGE,
    logo: absoluteAsset(BUSINESS_INFO.logo),
    telephone: '+27823218905',
    email: BUSINESS_INFO.emailPrimary,
    priceRange: 'R350–R4500',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.addressLine1,
      addressLocality: BUSINESS_INFO.city,
      addressRegion: 'KwaZulu-Natal',
      postalCode: BUSINESS_INFO.postalCode,
      addressCountry: 'ZA',
    },
    areaServed: {
      '@type': 'City',
      name: 'Pietermaritzburg',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -29.6015,
      longitude: 30.3805,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '13:00',
      },
    ],
    sameAs: [BUSINESS_INFO.instagramHref],
    founder: {
      '@type': 'Person',
      name: BUSINESS_INFO.director,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Floral services',
      itemListElement: BRAND_STORY.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
        },
      })),
    },
  };
}

function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: BUSINESS_INFO.name,
    description: BRAND_STORY.whoWeAre,
    inLanguage: 'en-ZA',
    publisher: { '@id': `${SITE_URL}/#florist` },
  };
}

function breadcrumbJsonLd(items: { name: string; route: RouteState }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.route),
    })),
  };
}

function productJsonLd(product: Product): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map(absoluteAsset),
    sku: String(product.id),
    category: product.wooCategory,
    brand: {
      '@type': 'Brand',
      name: BUSINESS_INFO.name,
    },
    offers: {
      '@type': 'Offer',
      url: canonicalUrl({ view: 'product', productSlug: product.slug }),
      priceCurrency: 'ZAR',
      price: product.priceZAR.toFixed(2),
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE_URL}/#florist` },
    },
  };
}

function pageJsonLd(
  name: string,
  description: string,
  route: RouteState
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl(route)}#webpage`,
    url: canonicalUrl(route),
    name,
    description,
    inLanguage: 'en-ZA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#florist` },
  };
}

const COLLECTION_META: Record<
  string,
  { title: string; description: string; name: string }
> = {
  all: {
    title: 'Flower Bouquets & Roses | Nonise Florist Pietermaritzburg',
    description:
      'Shop hand-tied bouquets, 30–50 stem roses, Protea mixes and Ferrero gifts from our Pietermaritzburg studio. Fresh flowers, local delivery, order online today.',
    name: 'Fresh Flower Bouquets & Roses',
  },
  'box-arrangements': {
    title: 'Flower Box Arrangements | Nonise Florist Pietermaritzburg',
    description:
      'Hand-arranged flower boxes and hatboxes for birthdays, anniversaries and gifting in Pietermaritzburg. Fresh blooms, local delivery, order online.',
    name: 'Box Arrangements',
  },
  'funeral-flowers': {
    title: 'Funeral Flowers & Tributes | Nonise Florist Pietermaritzburg',
    description:
      'Coffin sprays, crosses, posies and upright tributes arranged with compassion for Pietermaritzburg funeral services. Order online or request a quote.',
    name: 'Funeral Flowers',
  },
  'funeral-package-sets': {
    title: 'Funeral Flower Packages | Nonise Florist Pietermaritzburg',
    description:
      'Coordinated funeral flower packages with casket sprays, posies and standing tributes, delivered to services across Pietermaritzburg.',
    name: 'Funeral Package Sets',
  },
  hampers: {
    title: 'Gift Hampers | Nonise Florist Pietermaritzburg',
    description:
      'Curated gift hampers with chocolates, treats and beverages for birthdays, corporate gifting and celebrations in Pietermaritzburg.',
    name: 'Hamper',
  },
  'mixed-bouquets': {
    title: 'Mixed Flower Bouquets | Nonise Florist Pietermaritzburg',
    description:
      'Fresh mixed bouquets hand-tied daily with seasonal flowers and delivered across Pietermaritzburg. Order online or via WhatsApp.',
    name: 'Mixed Bouquets',
  },
  'protea-bouquets': {
    title: 'Protea Bouquets | Nonise Florist Pietermaritzburg',
    description:
      'Indigenous protea bouquets with pincushions and fresh foliage, hand-tied by Nonise Florist in Pietermaritzburg with local delivery.',
    name: 'Protea Bouquets',
  },
  'rose-bouquets': {
    title: 'Rose Bouquets | Nonise Florist Pietermaritzburg',
    description:
      'Fresh red, white and blush rose bouquets hand-tied by Nonise Florist in Pietermaritzburg. Order online for local flower delivery.',
    name: 'Rose Bouquets',
  },
  'vase-arrangements': {
    title: 'Flower Vase Arrangements | Nonise Florist Pietermaritzburg',
    description:
      'Ready-to-display flower arrangements in glass vases, delivered fresh across Pietermaritzburg by Nonise Florist.',
    name: 'Vase Arrangements',
  },
  events: {
    title: 'Wedding & Event Flowers | Nonise Florist Pietermaritzburg',
    description:
      'Bridal bouquets, ceremony flowers, reception tablescapes and corporate event florals styled by Nonise Florist in Pietermaritzburg. Request a bespoke quote.',
    name: 'Weddings & Events',
  },
};

export function seoFor(route: RouteState): SeoMeta {
  const base = [localBusinessJsonLd(), websiteJsonLd()];
  const canonical = canonicalUrl(route);
  const robots = 'index, follow, max-image-preview:large';

  if (route.view === 'product') {
    const product = productBySlug(route.productSlug);
    if (product) {
      const title = `${product.name} | Nonise Florist Pietermaritzburg`;
      const description = `${product.shortDescription} Handcrafted in Pietermaritzburg by Nonise Florist. Order online or via WhatsApp for local delivery.`;
      return {
        title,
        description,
        canonical,
        robots,
        image: productOgImage(product.slug),
        imageAlt: product.altText || product.shortDescription,
        type: 'product',
        jsonLd: [
          ...base,
          productJsonLd(product),
          breadcrumbJsonLd([
            { name: 'Home', route: { view: 'home' } },
            { name: 'Shop', route: { view: 'shop', specialty: 'all' } },
            { name: product.name, route },
          ]),
          pageJsonLd(title, description, route),
        ],
      };
    }
  }

  if (route.view === 'shop') {
    const collection = COLLECTION_META[route.specialty ?? 'all'] ?? COLLECTION_META.all;
    return {
      title: collection.title,
      description: collection.description,
      canonical,
      robots,
      image: OG_IMAGE,
      type: 'website',
      jsonLd: [
        ...base,
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${canonical}#collection`,
          url: canonical,
          name: collection.name,
          description: collection.description,
          inLanguage: 'en-ZA',
          isPartOf: { '@id': `${SITE_URL}/#website` },
        },
        breadcrumbJsonLd([
          { name: 'Home', route: { view: 'home' } },
          { name: 'Shop', route: { view: 'shop', specialty: 'all' } },
          ...(route.specialty && route.specialty !== 'all'
            ? [{ name: collection.name, route }]
            : []),
        ]),
        pageJsonLd(collection.name, collection.description, route),
      ],
    };
  }

  if (route.view === 'gallery') {
    const title = 'Floral Gallery | Nonise Florist Pietermaritzburg';
    const description =
      'Browse real weddings, rose and protea bouquets, vase arrangements, flower boxes, gift hampers and sympathy tributes created by Nonise Florist in Pietermaritzburg.';
    return {
      title,
      description,
      canonical,
      robots,
      image: OG_IMAGE,
      type: 'website',
      jsonLd: [
        ...base,
        breadcrumbJsonLd([
          { name: 'Home', route: { view: 'home' } },
          { name: 'Gallery', route },
        ]),
        pageJsonLd('Floral Gallery', description, route),
      ],
    };
  }

  if (route.view === 'about') {
    const title = 'About Nonise Florist | Pietermaritzburg Florist';
    const description =
      'Meet Mrs. Nokwanda Mthembu and the story behind Nonise Florist, a female-owned floral boutique serving Pietermaritzburg with fresh flowers and heartfelt service.';
    return {
      title,
      description,
      canonical,
      robots,
      image: OG_IMAGE,
      type: 'website',
      jsonLd: [
        ...base,
        breadcrumbJsonLd([
          { name: 'Home', route: { view: 'home' } },
          { name: 'About Us', route },
        ]),
        pageJsonLd('About Nonise Florist', description, route),
      ],
    };
  }

  if (route.view === 'contact') {
    const title = 'Contact Nonise Florist | Pietermaritzburg Flower Shop';
    const description =
      'Visit Nonise Florist at Shop 1, 47–49 Peter Kerchhoff Street, Pietermaritzburg. Call +27 82 321 8905, WhatsApp us, or send a floral enquiry online.';
    return {
      title,
      description,
      canonical,
      robots,
      image: OG_IMAGE,
      type: 'website',
      jsonLd: [
        ...base,
        breadcrumbJsonLd([
          { name: 'Home', route: { view: 'home' } },
          { name: 'Contact', route },
        ]),
        pageJsonLd('Contact Nonise Florist', description, route),
      ],
    };
  }

  if (route.view === 'checkout') {
    const title = 'Checkout | Nonise Florist';
    const description =
      'Complete your Nonise Florist order for fresh flowers, bouquets and floral gifts with delivery across Pietermaritzburg.';
    return {
      title,
      description,
      canonical,
      robots: 'noindex, nofollow',
      image: OG_IMAGE,
      type: 'website',
      jsonLd: base,
    };
  }

  if (route.view === 'landing' && route.landingSlug) {
    const landingConfig = landingBySlug(route.landingSlug) as LandingPageConfig;
    if (landingConfig) {
      const title = landingConfig.title;
      const description = landingConfig.description;
      // Landing heroes are WebP, which some social scrapers still refuse to
      // render. Use a dedicated JPEG when provided, otherwise the site OG image.
      const image = landingConfig.ogImage
        ? absoluteAsset(landingConfig.ogImage)
        : OG_IMAGE;

      return {
        title,
        description,
        canonical,
        robots,
        image,
        imageAlt: landingConfig.ogImage
          ? landingConfig.heroImageAlt
          : 'Nonise Florist — Let Beauty Bloom',
        type: 'website',
        jsonLd: [
          ...base,
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: title,
            description,
            inLanguage: 'en-ZA',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#florist` },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${canonical}#service`,
            name: `${landingConfig.breadcrumbLabel} — Nonise Florist`,
            serviceType: landingConfig.breadcrumbLabel,
            description,
            url: canonical,
            provider: { '@id': `${SITE_URL}/#florist` },
            areaServed: { '@type': 'City', name: 'Pietermaritzburg' },
          },
          ...(landingConfig.faqs.length > 0
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  '@id': `${canonical}#faq`,
                  mainEntity: landingConfig.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: faq.answer,
                    },
                  })),
                },
              ]
            : []),
          breadcrumbJsonLd([
            { name: 'Home', route: { view: 'home' } },
            { name: 'Shop', route: { view: 'shop', specialty: 'all' } },
            { name: landingConfig.breadcrumbLabel, route },
          ]),
        ],
      };
    }
  }

  const title = 'Nonise Florist | Florist & Flower Delivery, Pietermaritzburg';
  const description =
    'Female-owned florist in Pietermaritzburg. Order fresh bouquets, luxury roses, wedding flowers and sympathy tributes with reliable local delivery. Let beauty bloom.';
  return {
    title,
    description,
    canonical,
    robots,
    image: OG_IMAGE,
    type: 'website',
    jsonLd: [
      ...base,
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Signature floral arrangements',
        itemListElement: PRODUCTS.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: canonicalUrl({ view: 'product', productSlug: product.slug }),
          name: product.name,
        })),
      },
      breadcrumbJsonLd([{ name: 'Home', route: { view: 'home' } }]),
    ],
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderHeadTags(meta: SeoMeta): string {
  const description = clampDescription(meta.description);
  const jsonLd = meta.jsonLd
    .map(
      (schema) =>
        `<script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(schema).replace(
          /</g,
          '\\u003c'
        )}</script>`
    )
    .join('\n    ');

  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${escapeHtml(meta.robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="${escapeHtml(meta.type)}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(meta.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt || 'Nonise Florist — Let Beauty Bloom')}" />`,
    `<meta property="og:site_name" content="Nonise Florist" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(meta.image)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(meta.imageAlt || 'Nonise Florist — Let Beauty Bloom')}" />`,
    `<meta name="twitter:site" content="@nonise.florist" />`,
    `    ${jsonLd}`,
  ].join('\n    ');
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function applySeoToDocument(meta: SeoMeta): void {
  if (typeof document === 'undefined') return;

  const description = clampDescription(meta.description);
  document.title = meta.title;
  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', meta.robots);
  upsertMeta('property', 'og:title', meta.title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:type', meta.type);
  upsertMeta('property', 'og:url', meta.canonical);
  upsertMeta('property', 'og:image', meta.image);
  upsertMeta('property', 'og:image:alt', meta.imageAlt || 'Nonise Florist — Let Beauty Bloom');
  upsertMeta('property', 'og:site_name', 'Nonise Florist');
  upsertMeta('property', 'og:locale', 'en_ZA');
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', meta.title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', meta.image);
  upsertMeta('name', 'twitter:image:alt', meta.imageAlt || 'Nonise Florist — Let Beauty Bloom');
  upsertMeta('name', 'twitter:site', '@nonise.florist');

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = meta.canonical;

  document.head
    .querySelectorAll('script[data-seo-jsonld="true"]')
    .forEach((node) => node.remove());

  meta.jsonLd.forEach((schema) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoJsonld = 'true';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export function pathForSeo(route: RouteState): string {
  return pathFor(route);
}
