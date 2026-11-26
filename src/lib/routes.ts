import { PRODUCTS } from '../data/noniseData';
import { LANDING_PAGES, LANDING_SLUGS } from '../data/landingPages';
import { PageView, Product, SpecialtyKey } from '../types';

export const SITE_URL = 'https://noniseflorist.com';

export interface RouteState {
  view: PageView;
  productSlug?: string;
  specialty?: SpecialtyKey;
  inquiryTopic?: string;
  landingSlug?: string;
}

type ShopFilterKey = Exclude<SpecialtyKey, 'all' | 'events'>;

const COLLECTION_SLUGS = [
  'basket-arrangements',
  'box-arrangements',
  'extras',
  'funeral-flowers',
  'funeral-package-sets',
  'hampers',
  'mixed-bouquets',
  'protea-bouquets',
  'rose-bouquets',
  'vase-arrangements',
] as const satisfies readonly ShopFilterKey[];

// Collection URLs mirror the shop filters, so the slug is the filter key.
const SLUG_TO_FILTER: Record<string, SpecialtyKey> = {
  ...Object.fromEntries(COLLECTION_SLUGS.map((slug) => [slug, slug])),
  // Legacy collection URLs keep working after the 2026 category rename.
  roses: 'rose-bouquets',
  'everyday-bouquets': 'mixed-bouquets',
  gifting: 'hampers',
};

export function productBySlug(slug?: string): Product | undefined {
  if (!slug) return undefined;
  return PRODUCTS.find((product) => product.slug === slug);
}

function normalizePath(pathname: string): string {
  const raw = (pathname || '/').split('?')[0].split('#')[0];
  const collapsed = raw.replace(/\/{2,}/g, '/');
  if (collapsed.length > 1) return collapsed.replace(/\/+$/, '').toLowerCase();
  return '/';
}

export function parseRoute(pathname: string, search = ''): RouteState {
  const path = normalizePath(pathname);
  const params = new URLSearchParams(search);

  if (path === '/' || path === '/home') {
    return { view: 'home' };
  }

  if (path === '/shop') {
    const filter = params.get('filter');
    const specialty = filter && (filter === 'all' || filter in SLUG_TO_FILTER)
      ? filter === 'all'
        ? 'all'
        : SLUG_TO_FILTER[filter]
      : 'all';
    return { view: 'shop', specialty };
  }

  const landingSlug = LANDING_SLUGS.find((slug) => LANDING_PAGES[slug].path === path);
  if (landingSlug) {
    return { view: 'landing', landingSlug };
  }

  if (path.startsWith('/collections/')) {
    const slug = path.slice('/collections/'.length);
    return { view: 'shop', specialty: SLUG_TO_FILTER[slug] ?? 'all' };
  }

  if (path.startsWith('/product/')) {
    const slug = path.slice('/product/'.length);
    const match = productBySlug(slug);
    if (match) return { view: 'product', productSlug: match.slug };
    return { view: 'shop', specialty: 'all' };
  }

  if (path === '/gallery') return { view: 'gallery' };
  if (path === '/about' || path === '/about-us') return { view: 'about' };
  if (path === '/contact' || path === '/contact-us') return { view: 'contact' };
  if (path === '/checkout' || path === '/cart') return { view: 'checkout' };
  if (path === '/my-account') return { view: 'shop', specialty: 'all' };

  return { view: 'home' };
}

export function readRouteFromLocation(): RouteState {
  if (typeof window === 'undefined') return { view: 'home' };
  return parseRoute(window.location.pathname, window.location.search);
}

export function pathFor(route: RouteState): string {
  switch (route.view) {
    case 'home':
      return '/';
    case 'shop': {
      const specialty = route.specialty ?? 'all';
      if (specialty === 'events') {
        return LANDING_PAGES['weddings-events']?.path ?? '/shop';
      }
      return specialty === 'all' ? '/shop' : `/collections/${specialty}`;
    }
    case 'product': {
      const slug = route.productSlug ?? PRODUCTS[0]?.slug;
      return slug ? `/product/${slug}` : '/shop';
    }
    case 'gallery':
      return '/gallery';
    case 'about':
      return '/about';
    case 'contact':
      return '/contact';
    case 'checkout':
      return '/checkout';
    case 'landing':
      return LANDING_PAGES[route.landingSlug ?? '']?.path ?? '/shop';
    default:
      return '/';
  }
}

export function canonicalUrl(route: RouteState): string {
  const path = pathFor(route);
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function routeKey(route: RouteState): string {
  return [
    route.view,
    route.productSlug ?? '',
    route.specialty ?? '',
    route.inquiryTopic ?? '',
    route.landingSlug ?? '',
  ].join('|');
}

export const INDEXABLE_ROUTES: RouteState[] = [
  { view: 'home' },
  { view: 'shop', specialty: 'all' },
  ...COLLECTION_SLUGS.map((specialty): RouteState => ({ view: 'shop', specialty })),
  ...LANDING_SLUGS.map((landingSlug): RouteState => ({ view: 'landing', landingSlug })),
  { view: 'gallery' },
  { view: 'about' },
  { view: 'contact' },
  ...PRODUCTS.map((product): RouteState => ({ view: 'product', productSlug: product.slug })),
];

export const PRERENDER_ROUTES: RouteState[] = [
  ...INDEXABLE_ROUTES,
  { view: 'checkout' },
];
