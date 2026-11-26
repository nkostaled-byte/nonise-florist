import {
  CategoryShowcase,
  CheckoutAddon,
  GalleryPhoto,
  OccasionItem,
  Product,
  SpecialtyKey,
} from '../types';

export const BUSINESS_INFO = {
  name: 'Nonise Florist',
  tagline: 'Let Beauty Bloom',
  director: 'Mrs. Nokwanda Mthembu',
  addressLine1: 'Shop 1, 47–49 Peter Kerchhoff Street',
  city: 'Pietermaritzburg',
  postalCode: '3201',
  country: 'South Africa',
  fullAddress: 'Shop 1, 47–49 Peter Kerchhoff Street, Pietermaritzburg, 3201, South Africa',
  phoneDisplay: '+27 (0) 82 321 8905',
  phoneHref: 'tel:+27823218905',
  whatsappHref: 'https://wa.me/27823218905',
  instagramHref: 'https://www.instagram.com/nonise.florist/',
  instagramHandle: '@nonise.florist',
  tiktokHref: 'https://www.tiktok.com/@nonise.florist',
  tiktokHandle: '@nonise.florist',
  facebookHref: 'https://www.facebook.com/p/Nonise-Florist-61584167942723/',
  facebookHandle: 'Nonise Florist',
  emailPrimary: 'info@noniseflorist.com',
  emailSecondary: 'noniseflorist@gmail.com',
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 4:30 PM' },
    { days: 'Saturday', time: '8:00 AM – 1:00 PM' },
    { days: 'Sunday', time: 'Closed (Pre-booked events by arrangement)' },
  ],
  promise: 'Our Promise: We Deliver, Whatever It Takes!',
  logo: '/assets/nonise/logo.webp',
  copyrightYear: 2026,
};

// Flat local delivery fee, waived from the threshold. Used by checkout and the
// PayFast server so the charged amount always matches what the shopper saw.
export const DELIVERY = {
  flatRateZAR: 100,
  freeFromZAR: 2500,
};

export function deliveryFeeZAR(
  orderValueZAR: number,
  fulfillment: 'delivery' | 'collection'
): number {
  if (fulfillment === 'collection' || orderValueZAR >= DELIVERY.freeFromZAR) return 0;
  return DELIVERY.flatRateZAR;
}

export const BRAND_STORY = {
  whoWeAre:
    'Nonise Florist is a female-owned floristry business based on Peter Kerchhoff Street in Pietermaritzburg, founded and led by Mrs. Nokwanda Mthembu. The business offers a full range of floristry services including bouquets, flower arrangements, wedding flowers, funeral coffin sprays, party and birthday flowers, gift boxes, anniversary flowers, and corporate and business function florals.',
  reputation:
    'Nonise Florist has built a strong local reputation for reliability and quality, reflected in a five-star customer rating for consistently fresh flowers and on-time delivery.',
  directorBio:
    'Nonise Florist is owned and led by Mrs. Nokwanda Mthembu, whose personal story and family legacy form the emotional foundation of the brand. As a female entrepreneur in the floristry and events industry, Mrs. Mthembu brings both a deeply personal commitment to the business and a hands-on approach to service delivery and client care.',
  mission:
    'Nonise Florist exists to share love, passion, and kindness through beautifully crafted, fresh floral arrangements for every life moment — from weddings and celebrations to remembrance and comfort — while delivering reliable, professional service that clients can depend on, every time.',
  vision:
    'To be Pietermaritzburg’s most trusted and heartfelt florist; a brand where every bouquet honours the legacy of love it was born from, and every client feels that same love in the flowers they receive.',
  eventPromise:
    'We’ll make your event blooming and beautiful with our stunning flowers, custom bouquets, and thoughtfully curated hampers.',
  futureHorizon:
    'Looking ahead, Nonise Florist is on track to expand into a full-service event space, with plans for a dedicated showhouse and event venue serving Pietermaritzburg.',
  services: [
    'Hand-Crafted Bouquets',
    'Luxury Flower Arrangements',
    'Wedding Flowers & Bridal Styling',
    'Funeral Coffin Sprays & Tributes',
    'Party & Birthday Flowers',
    'Gift Boxes & Curated Hampers',
    'Anniversary & Romantic Florals',
    'Corporate & Business Function Florals',
  ],
};

/**
 * Verified product catalogue recovered directly from https://noniseflorist.com/wp-json/wc/store/v1/products
 * All titles, prices (ZAR), and primary photography are authentic to Nonise Florist.
 */
const SIGNATURE_PRODUCTS: Product[] = [
  {
    id: 248,
    slug: '50-roses-with-gyp',
    name: '50 Red & White Roses with Gypsophila',
    priceZAR: 1500,
    wooCategory: 'Rose Bouquets',
    specialty: 'rose-bouquets',
    occasions: ['Anniversaries & Romance', 'Birthdays & Parties'],
    shortDescription: '50 fresh roses styled with delicate gypsophila in signature boutique wrapping.',
    description:
      'An unforgettable luxury bouquet of fifty fresh-cut roses nestled in clouds of delicate white gypsophila (baby’s breath), hand-tied and finished with Nonise Florist’s signature wrapping and satin ribbon.',
    images: ['/assets/nonise/50-roses-with-gyp.webp'],
    altText: 'Luxury 50 roses with gypsophila in signature boutique wrapping by Nonise Florist',
    includes: [
      '50 fresh long-stemmed roses',
      'Delicate white gypsophila accents',
      'Signature layered boutique wrap & ribbon',
      'Complimentary personalised gift card',
    ],
    presentation: 'Hand-tied luxury presentation bouquet',
    inStock: true,
    featured: true,
    badgeText: 'Signature Luxury',
  },
  {
    id: 244,
    slug: 'red-rose-vase',
    name: 'Red Rose Vase',
    priceZAR: 1500,
    wooCategory: 'Vase Arrangements',
    specialty: 'vase-arrangements',
    occasions: ['Anniversaries & Romance', 'Corporate & Events'],
    shortDescription: 'Abundant velvety red roses arranged in a clear glass vase with signature satin ribbon.',
    description:
      'A classic statement of timeless devotion. Abundant crimson roses arranged lushly in a clear rounded glass vase, finished with Nonise Florist’s black satin monogram ribbon and crest seal.',
    images: ['/assets/nonise/red-rose-vase.webp', '/assets/nonise/home-hero-roses.webp'],
    altText: 'Abundant velvety red roses in clear glass vase with satin ribbon by Nonise Florist',
    includes: [
      'Premium fresh red roses with rich foliage',
      'Clear glass keepsake vase',
      'Signature Nonise Florist satin ribbon & seal',
      'Complimentary personalised gift card',
    ],
    presentation: 'Ready-to-display glass vase arrangement',
    inStock: true,
    featured: true,
    badgeText: 'Vase Included',
  },
  {
    id: 242,
    slug: 'roses-with-ferrero',
    name: 'White Roses with Ferrero Rocher',
    priceZAR: 1200,
    wooCategory: 'Rose Bouquets',
    specialty: 'rose-bouquets',
    occasions: ['Anniversaries & Romance', 'Birthdays & Parties'],
    shortDescription: 'Fresh white roses paired with golden Ferrero Rocher chocolates in marble-trimmed wrap.',
    description:
      'Elegance meets indulgence. A lush ring of crisp white roses framing a bouquet centre of golden Ferrero Rocher chocolates, presented in gold-edged marble wrap for heartfelt gifting.',
    images: ['/assets/nonise/roses-with-ferrero.webp'],
    altText: 'Fresh white roses with golden Ferrero Rocher chocolates in gold-edged marble wrap',
    includes: [
      'Fresh white roses arranged in a full dome',
      'Golden Ferrero Rocher chocolate centrepiece',
      'Gold-trimmed marble boutique wrap',
      'Complimentary personalised gift card',
    ],
    presentation: 'Floral & chocolate gift bouquet',
    inStock: true,
    featured: true,
    badgeText: 'Gifting Favourite',
  },
  {
    id: 207,
    slug: '30-white-roses-with-gyp',
    name: '30 White Roses with GYP',
    priceZAR: 900,
    wooCategory: 'Rose Bouquets',
    specialty: 'rose-bouquets',
    occasions: ['Anniversaries & Romance', 'Weddings & Bridal', 'Sympathy & Remembrance'],
    shortDescription: '30 luminous white roses haloed with baby’s breath and Nonise Florist white satin ribbon.',
    description:
      'Pure, serene, and refined. Thirty fresh white roses surrounded by an airy halo of gypsophila, styled in monochrome ivory-and-black edged wrap with a white Nonise Florist satin bow.',
    images: ['/assets/nonise/30-white-roses-with-gyp.webp'],
    altText: 'Thirty elegant white roses with gypsophila in monochrome wrap',
    includes: [
      '30 fresh creamy white roses',
      'Fresh gypsophila halo',
      'Monochrome tailored boutique wrap & satin bow',
      'Complimentary personalised gift card',
    ],
    presentation: 'Hand-tied monochrome luxury bouquet',
    inStock: true,
    featured: true,
  },
  {
    id: 219,
    slug: 'mixed-lillies',
    name: 'Pink & Yellow Lily Bouquet',
    priceZAR: 750,
    wooCategory: 'Mixed Bouquets',
    specialty: 'mixed-bouquets',
    occasions: ['Birthdays & Parties', 'Sympathy & Remembrance', 'Corporate & Events'],
    shortDescription: 'Fragrant fresh mixed lilies styled with seasonal foliage for lasting beauty.',
    description:
      'Graceful, fragrant mixed lilies selected in bud and bloom so your recipient enjoys days of unfolding colour and scent, paired with fresh botanical greenery in boutique wrapping.',
    images: ['/assets/nonise/mixed-lillies.webp'],
    altText: 'Fragrant mixed lilies with seasonal foliage in boutique wrap',
    includes: [
      'Assorted fresh fragrant lilies',
      'Fresh seasonal greenery',
      'Nonise Florist boutique presentation wrap',
      'Complimentary personalised gift card',
    ],
    presentation: 'Hand-tied seasonal lily bouquet',
    inStock: true,
    featured: true,
  },
  {
    id: 241,
    slug: 'sunshine-bouquet',
    name: 'Sunflower Sunshine Bouquet',
    priceZAR: 500,
    wooCategory: 'Mixed Bouquets',
    specialty: 'mixed-bouquets',
    occasions: ['Birthdays & Parties', 'Baby Showers & Celebrations'],
    shortDescription: 'Radiant sunlit blooms arranged to bring warmth, cheer, and joy to any room.',
    description:
      'A bright, uplifting seasonal arrangement composed to capture warmth and celebration. Ideal for birthdays, congratulations, thank-you gestures, or simply brightening someone’s day.',
    images: ['/assets/nonise/sunshine-bouquet.webp'],
    altText: 'Bright sunshine bouquet with warm seasonal blooms and greenery',
    includes: [
      'Radiant seasonal blooms in warm tones',
      'Fresh botanical foliage',
      'Boutique wrapping & ribbon finish',
      'Complimentary personalised gift card',
    ],
    presentation: 'Hand-tied radiant bouquet',
    inStock: true,
    featured: true,
  },
  {
    id: 238,
    slug: 'mixed-bouquet',
    name: 'Mixed Pink Bouquet',
    priceZAR: 450,
    wooCategory: 'Mixed Bouquets',
    specialty: 'mixed-bouquets',
    occasions: ['Birthdays & Parties', 'Everyday Gifting'],
    shortDescription: 'Mixed bouquet for special occasions — thoughtfully composed with fresh seasonal stems.',
    description:
      'Our versatile everyday floral gesture, crafted with the freshest seasonal stems available in our Pietermaritzburg studio each morning. Balanced in texture, colour, and fragrance.',
    images: ['/assets/nonise/mixed-bouquet.webp'],
    altText: 'Versatile mixed seasonal flower bouquet with greenery accents',
    includes: [
      'Curated mix of fresh seasonal flowers',
      'Lush greenery accents',
      'Signature studio wrap & ribbon',
      'Complimentary personalised gift card',
    ],
    presentation: 'Hand-tied mixed seasonal bouquet',
    inStock: true,
    featured: true,
  },
  {
    id: 246,
    slug: 'protea-mix',
    name: 'Pink Protea & Rose Mix',
    priceZAR: 350,
    wooCategory: 'Protea Bouquets',
    specialty: 'protea-bouquets',
    occasions: ['Birthdays & Parties', 'Corporate & Events', 'Everyday Gifting'],
    shortDescription: 'South African proteas paired with soft blush roses, tulips, and delicate seasonal stems.',
    description:
      'Celebrating South African botanical beauty. Textured native proteas nestled among soft pink roses, lavender tulips, and crisp snapdragons in vibrant rose wrap sealed with our Nonise Florist crest.',
    images: ['/assets/nonise/protea-mix.webp'],
    altText: 'South African proteas with blush roses and tulips in vibrant wrap',
    includes: [
      'Fresh South African proteas',
      'Blush roses & seasonal floral accents',
      'Vibrant boutique presentation wrap & Nonise seal',
      'Complimentary personalised gift card',
    ],
    presentation: 'Indigenous-inspired hand-tied bouquet',
    inStock: true,
    featured: true,
    badgeText: 'Local Favour',
  },
];

type ShopCategory = Exclude<SpecialtyKey, 'all' | 'events'>;

const CATALOGUE_CATEGORY_META: Record<
  ShopCategory,
  {
    label: string;
    occasions: string[];
    includes: string[];
    presentation: string;
    description: string;
  }
> = {
  'basket-arrangements': {
    label: 'Basket Arrangements',
    occasions: [
      'Birthdays & Parties',
      'Anniversaries & Romance',
      'Everyday Gifting',
      'Corporate & Events',
    ],
    includes: [
      'Fresh seasonal flowers arranged in a woven basket',
      'Signature Nonise Florist ribbon finish',
      'Complimentary personalised gift card',
    ],
    presentation: 'Ready-to-display woven basket arrangement',
    description:
      'A hand-arranged floral design set in a woven basket, styled in our Pietermaritzburg studio and ready to display.',
  },
  'box-arrangements': {
    label: 'Box Arrangements',
    occasions: ['Birthdays & Parties', 'Anniversaries & Romance', 'Everyday Gifting'],
    includes: [
      'Fresh seasonal flowers arranged in a keepsake hatbox',
      'Signature Nonise Florist ribbon & seal',
      'Complimentary personalised gift card',
    ],
    presentation: 'Ready-to-display keepsake hatbox arrangement',
    description:
      'A hand-arranged floral design set in a keepsake hatbox, styled in our Pietermaritzburg studio for effortless gifting and lasting display.',
  },
  extras: {
    label: 'Extras',
    occasions: ['Birthdays & Parties', 'Everyday Gifting'],
    includes: [
      'A finishing touch for any flower gift',
      'Prepared in our Pietermaritzburg studio',
    ],
    presentation: 'Celebration extra',
    description:
      'A little extra to complete your flower gift, prepared in our Pietermaritzburg studio.',
  },
  'funeral-flowers': {
    label: 'Funeral Flowers',
    occasions: ['Sympathy & Remembrance'],
    includes: [
      'Fresh white and green funeral flowers',
      'Hand-crafted tribute form',
      'Complimentary sympathy card',
    ],
    presentation: 'Funeral tribute arrangement',
    description:
      'Crafted with compassion by Nonise Florist for funeral services and memorial tributes across Pietermaritzburg.',
  },
  'funeral-package-sets': {
    label: 'Funeral Package Sets',
    occasions: ['Sympathy & Remembrance'],
    includes: [
      'Coordinated funeral flower package',
      'Coffin spray and standing tributes',
      'Delivery arranged with the funeral parlour',
    ],
    presentation: 'Complete funeral flower package',
    description:
      'A complete, coordinated tribute package arranged with our team and delivered to the service or funeral parlour.',
  },
  hampers: {
    label: 'Hamper',
    occasions: [
      'Birthdays & Parties',
      'Anniversaries & Romance',
      'Corporate & Events',
      'Everyday Gifting',
    ],
    includes: [
      'Curated treats, chocolates and beverages',
      'Hand-tied ribbon & gift presentation',
      'Complimentary personalised gift card',
    ],
    presentation: 'Curated gift hamper',
    description:
      'A thoughtfully curated gift hamper assembled in our Pietermaritzburg studio, ready for local delivery.',
  },
  'mixed-bouquets': {
    label: 'Mixed Bouquets',
    occasions: ['Birthdays & Parties', 'Everyday Gifting', 'Anniversaries & Romance'],
    includes: [
      'Fresh mixed seasonal flowers',
      'Signature boutique wrap & ribbon',
      'Complimentary personalised gift card',
    ],
    presentation: 'Hand-tied mixed bouquet',
    description:
      'Hand-tied with the freshest seasonal stems available in our studio each morning.',
  },
  'protea-bouquets': {
    label: 'Protea Bouquets',
    occasions: ['Birthdays & Parties', 'Corporate & Events', 'Everyday Gifting'],
    includes: [
      'Fresh South African proteas',
      'Mixed seasonal foliage',
      'Signature boutique wrap & ribbon',
      'Complimentary personalised gift card',
    ],
    presentation: 'Indigenous-inspired hand-tied bouquet',
    description:
      'Celebrating South African botanical beauty with fresh proteas and textured indigenous foliage.',
  },
  'rose-bouquets': {
    label: 'Rose Bouquets',
    occasions: ['Anniversaries & Romance', 'Birthdays & Parties', 'Everyday Gifting'],
    includes: [
      'Fresh long-stemmed roses',
      'Signature boutique wrap & ribbon',
      'Complimentary personalised gift card',
    ],
    presentation: 'Hand-tied rose bouquet',
    description:
      'Hand-tied with fresh roses and finished in our signature wrap for a timeless floral gift.',
  },
  'vase-arrangements': {
    label: 'Vase Arrangements',
    occasions: [
      'Anniversaries & Romance',
      'Birthdays & Parties',
      'Corporate & Events',
      'Everyday Gifting',
    ],
    includes: [
      'Fresh seasonal flowers',
      'Clear glass keepsake vase',
      'Signature ribbon finish',
      'Complimentary personalised gift card',
    ],
    presentation: 'Ready-to-display glass vase arrangement',
    description:
      'Arranged in a clear glass vase and ready to display the moment it arrives.',
  },
};

interface CatalogueEntry {
  category: ShopCategory;
  name: string;
  priceZAR: number;
  blurb: string;
}

const CATALOGUE_ENTRIES: CatalogueEntry[] = [
  // Box Arrangements
  { category: 'box-arrangements', name: 'Spring Garden Hatbox', priceZAR: 950, blurb: 'Pink, lilac and butter-yellow blooms gathered in a blush keepsake hatbox.' },
  { category: 'box-arrangements', name: 'Crimson & Ivory Rose Hatbox', priceZAR: 1800, blurb: 'Red and cream roses set in a black hatbox with a striped ribbon finish.' },
  { category: 'box-arrangements', name: 'Blush & Burgundy Rose Box', priceZAR: 750, blurb: 'Cream, blush and burgundy roses with tall branches in a marble-look box.' },
  { category: 'box-arrangements', name: 'Peach & Pink Celebration Hatbox', priceZAR: 950, blurb: 'Soft peach roses and pink carnations arranged in a pink hatbox.' },
  { category: 'box-arrangements', name: 'Pink Lily & Gerbera Hatbox', priceZAR: 800, blurb: 'Pink lilies, gerberas and alstroemeria in a soft pink hatbox.' },
  { category: 'box-arrangements', name: 'Blush Rose & Carnation Box', priceZAR: 1200, blurb: 'Blush roses and carnations in a white gift box tied with ribbon.' },
  { category: 'box-arrangements', name: 'Sunlit Yellow & Cream Hatbox', priceZAR: 1100, blurb: 'Yellow roses, cream lisianthus and pink gerbera in a red hatbox.' },
  { category: 'box-arrangements', name: 'Red Rose & Champagne Celebration Box', priceZAR: 1400, blurb: 'Red roses, a bottle of champagne and a celebration balloon in a pink hatbox.' },
  { category: 'box-arrangements', name: 'Ferrero Heart & Rose Celebration Box', priceZAR: 1800, blurb: 'Deep red roses around a heart of Ferrero Rocher chocolates with champagne.' },
  { category: 'box-arrangements', name: 'Pastel Garden Hatbox', priceZAR: 950, blurb: 'Pink, white and lilac flowers arranged in a silver-pink hatbox.' },

  // Funeral Flowers
  { category: 'funeral-flowers', name: 'White Posy Tribute', priceZAR: 450, blurb: 'A soft white and cream posy with eucalyptus for funeral services.' },
  { category: 'funeral-flowers', name: 'Ivory Upright Tribute', priceZAR: 550, blurb: 'An upright white and cream arrangement finished with a sympathy ribbon.' },
  { category: 'funeral-flowers', name: 'White Lily & Rose Upright Spray', priceZAR: 650, blurb: 'A large white lily and rose spray with fresh greenery.' },
  { category: 'funeral-flowers', name: 'White & Green Coffin Spray', priceZAR: 850, blurb: 'A white and green coffin spray with eucalyptus and roses.' },
  { category: 'funeral-flowers', name: 'Pink & Purple Funeral Cross', priceZAR: 850, blurb: 'A floral cross in pink, purple and lilac tones.' },
  { category: 'funeral-flowers', name: 'White Rose Funeral Cross', priceZAR: 850, blurb: 'A classic white rose and chrysanthemum funeral cross.' },
  { category: 'funeral-flowers', name: 'Sunflower Funeral Cross', priceZAR: 850, blurb: 'A bright sunflower cross for a life remembered with warmth.' },
  { category: 'funeral-flowers', name: 'Colourful Coffin Spray', priceZAR: 1000, blurb: 'A vibrant orange, yellow and blue coffin spray presented in a white urn.' },

  // Funeral Package Sets
  { category: 'funeral-package-sets', name: 'White Funeral Package with Upright & Posies', priceZAR: 3200, blurb: 'A coordinated white tribute set with an upright spray, two posies and a coffin spray.' },
  { category: 'funeral-package-sets', name: 'Pink Funeral Package with Casket Spray', priceZAR: 2900, blurb: 'A pink and white package with a casket spray and four matching posies.' },
  { category: 'funeral-package-sets', name: 'White Funeral Package with Arch & Pedestals', priceZAR: 3500, blurb: 'A white package with an arch and pedestal tributes for the service.' },

  // Hamper
  { category: 'hampers', name: 'Snack & Treat Gift Box', priceZAR: 850, blurb: 'A black gift box filled with snacks, fruit and a bottled drink.' },
  { category: 'hampers', name: 'Hennessy & Chocolate Gift Hamper', priceZAR: 1200, blurb: 'Hennessy, Ferrero Rocher and sweet treats in a black gift box.' },
  { category: 'hampers', name: 'Rose & Wine Celebration Hamper', priceZAR: 1200, blurb: 'Fresh pink roses, a bottle of wine and chocolates in a woven basket.' },
  { category: 'hampers', name: 'Wine & Snack Wooden Crate', priceZAR: 1100, blurb: 'A wooden crate with red wine, roses and savoury snacks.' },
  { category: 'hampers', name: 'Pink Teddy & Rosé Luxury Hamper', priceZAR: 3200, blurb: 'A pink gift box with a teddy, Protea rosé, biscuits and chocolates.' },
  { category: 'hampers', name: 'Chocolate & Snack Wooden Tray', priceZAR: 990, blurb: 'A wooden tray of chocolates, sweets and savoury snacks.' },
  { category: 'hampers', name: 'Golden Ribbon Snack Tray', priceZAR: 890, blurb: 'A wooden tray of treats tied with a golden ribbon.' },
  { category: 'hampers', name: 'Red Teddy & Rosé Hatbox Hamper', priceZAR: 950, blurb: 'A black hatbox with a red teddy, rosé and biscuits.' },
  { category: 'hampers', name: 'Sunflower Bouquet & Snack Hamper', priceZAR: 2000, blurb: 'A sunflower bouquet paired with a box of snacks, wine and treats.' },
  { category: 'hampers', name: 'Pink Sweet Treat Hatbox', priceZAR: 750, blurb: 'A pink hatbox overflowing with sweets and snacks.' },
  { category: 'hampers', name: 'Fruit & Chocolate Gift Crate', priceZAR: 1300, blurb: 'A wooden crate with bananas, chocolate and wine tied in black ribbon.' },
  { category: 'hampers', name: 'Rustic Gourmet Hamper', priceZAR: 950, blurb: 'A raffia-tied wooden crate of gourmet treats and wine.' },
  { category: 'hampers', name: 'Flower & Snack Celebration Hamper', priceZAR: 1200, blurb: 'A hatbox of fresh flowers paired with a snack selection.' },
  { category: 'hampers', name: 'Congratulations Snack Hamper', priceZAR: 1200, blurb: 'A celebration snack box with a “Well done” balloon.' },
  { category: 'hampers', name: 'Wellness & Pantry Gift Bowl', priceZAR: 750, blurb: 'A wooden bowl with olive oil, skincare and everyday treats.' },
  { category: 'hampers', name: 'Movie Night Snack Hamper', priceZAR: 900, blurb: 'A black tray of chips, chocolate, wine and movie-night snacks.' },
  { category: 'hampers', name: 'White Teddy & Rosé Luxury Hamper', priceZAR: 2500, blurb: 'A pink gift box with a white teddy, rosé, biscuits and chocolates.' },

  // Mixed Bouquets
  { category: 'mixed-bouquets', name: 'Pink Celebration Mixed Bouquet', priceZAR: 1200, blurb: 'Pink, coral and white blooms hand-tied in bright pink wrap.' },
  { category: 'mixed-bouquets', name: 'Gerbera Sunshine Bouquet', priceZAR: 450, blurb: 'Orange, yellow and purple gerberas in kraft wrap.' },
  { category: 'mixed-bouquets', name: 'Jewel Tone Mixed Bouquet', priceZAR: 550, blurb: 'Roses, lisianthus and purple accents in a rich jewel palette.' },
  { category: 'mixed-bouquets', name: 'Pink Lily & Alstroemeria Bouquet', priceZAR: 650, blurb: 'Pink lilies and alstroemeria with soft seasonal greenery.' },
  { category: 'mixed-bouquets', name: 'Sunset Rose & Ranunculus Bouquet', priceZAR: 350, blurb: 'Red roses, orange ranunculus and yellow tulips in a dark wrap.' },
  { category: 'mixed-bouquets', name: 'Rose & Lily Romance Bouquet', priceZAR: 950, blurb: 'Red roses, white lilies and gypsophila in a classic white wrap.' },
  { category: 'mixed-bouquets', name: 'Colourburst Mixed Bouquet', priceZAR: 850, blurb: 'A cheerful mix of yellow, pink and purple seasonal flowers.' },
  { category: 'mixed-bouquets', name: 'Red Rose & Lily Kraft Bouquet', priceZAR: 650, blurb: 'Red roses with green lilies wrapped in natural kraft paper.' },
  { category: 'mixed-bouquets', name: 'Lily & Rose Garden Bouquet', priceZAR: 650, blurb: 'Yellow lilies, pink roses and garden-style foliage.' },
  { category: 'mixed-bouquets', name: 'Pink Lily & Carnation Grand Bouquet', priceZAR: 1500, blurb: 'A generous pink bouquet of lilies, carnations and stocks.' },
  { category: 'mixed-bouquets', name: 'Fuchsia Sunset Bouquet', priceZAR: 850, blurb: 'Hot pink, red and orange blooms in a fuchsia wrap.' },
  { category: 'mixed-bouquets', name: 'Pink Tulip & Lily Bouquet', priceZAR: 1200, blurb: 'Pink tulips, lilies and daisies in soft pink wrap.' },
  { category: 'mixed-bouquets', name: 'Orange Bloom Mixed Bouquet', priceZAR: 900, blurb: 'Orange gerberas, tulips and purple accents in white wrap.' },

  // Protea Bouquets
  { category: 'protea-bouquets', name: 'Protea & Leucadendron Bouquet', priceZAR: 750, blurb: 'Pink proteas and leucadendron in a monochrome wrap.' },
  { category: 'protea-bouquets', name: 'Blush Protea & Rose Bouquet', priceZAR: 550, blurb: 'Blush proteas, roses and seasonal greenery.' },
  { category: 'protea-bouquets', name: 'Protea & Pincushion Bouquet', priceZAR: 950, blurb: 'Pink proteas with orange pincushions and lush foliage.' },
  { category: 'protea-bouquets', name: 'King Protea Indigenous Bouquet', priceZAR: 450, blurb: 'King proteas with pink blooms and indigenous greenery.' },

  // Rose Bouquets
  { category: 'rose-bouquets', name: 'Ivory Rose Ring with Red Heart', priceZAR: 1500, blurb: 'Ivory roses ringed around a heart of deep red roses and gypsophila.' },
  { category: 'rose-bouquets', name: 'Blush Pink Rose & Gypsophila Bouquet', priceZAR: 600, blurb: 'Blush pink roses with gypsophila in a kraft wrap.' },
  { category: 'rose-bouquets', name: 'Cream Rose & Gypsophila Bouquet', priceZAR: 2000, blurb: 'Cream roses haloed with gypsophila in a white wrap.' },
  { category: 'rose-bouquets', name: 'Ruby Red Rose Statement Bouquet', priceZAR: 3000, blurb: 'A grand all-red rose bouquet finished in black wrap.' },
  { category: 'rose-bouquets', name: 'Classic Red Rose Bouquet', priceZAR: 600, blurb: 'Red roses with gypsophila in a natural brown wrap.' },
  { category: 'rose-bouquets', name: 'Red & White Birthday Rose Bouquet', priceZAR: 1200, blurb: 'Red and white roses with gypsophila and a “Happy Birthday” ribbon.' },
  { category: 'rose-bouquets', name: 'Ruby Birthday Rose Bouquet', priceZAR: 1500, blurb: 'Red roses with gypsophila, black wrap and a birthday sash.' },
  { category: 'rose-bouquets', name: 'Red Rose Noir Bouquet', priceZAR: 1200, blurb: 'Red roses finished with a black satin ribbon and dark wrap.' },
  { category: 'rose-bouquets', name: 'Burgundy Velvet Rose Bouquet', priceZAR: 2700, blurb: 'Deep burgundy roses in a monochrome presentation wrap.' },
  { category: 'rose-bouquets', name: 'Rose & Chocolate Keepsake Bouquet', priceZAR: 850, blurb: 'Red roses around a chocolate keepsake centre with gypsophila.' },
  { category: 'rose-bouquets', name: 'Monogram Red Rose Grand Bouquet', priceZAR: 4500, blurb: 'A grand red rose bouquet finished with a monogram and gypsophila border.' },
  { category: 'rose-bouquets', name: 'Ivory Rose & Gypsophila Bouquet', priceZAR: 1000, blurb: 'Ivory roses with gypsophila in a clear presentation wrap.' },

  // Vase Arrangements
  { category: 'vase-arrangements', name: 'Garden Medley Vase Arrangement', priceZAR: 1500, blurb: 'A mixed garden bouquet of pink, blue and orange blooms in a glass vase.' },
  { category: 'vase-arrangements', name: 'Rose & Delphinium Vase', priceZAR: 950, blurb: 'Pink roses with blue delphinium in a green glass vase.' },
  { category: 'vase-arrangements', name: 'Peach Rose & Lily Vase', priceZAR: 650, blurb: 'Peach roses, lilies and soft foliage in a clear glass vase.' },
  { category: 'vase-arrangements', name: 'Lilac & Pink Vase Arrangement', priceZAR: 1200, blurb: 'Pink, lilac and blue flowers arranged in a glass vase.' },
  { category: 'vase-arrangements', name: 'Eucalyptus & Rose Vase', priceZAR: 850, blurb: 'Pink roses, orange gerbera and eucalyptus in a glass vase.' },
  { category: 'vase-arrangements', name: 'Red Rose Vase with Ribbon', priceZAR: 790, blurb: 'Red roses in a glass vase finished with a red ribbon.' },
  { category: 'vase-arrangements', name: 'Golden Lily & Sunflower Vase', priceZAR: 1400, blurb: 'Yellow lilies, sunflowers and golden foliage in a glass vase.' },
  { category: 'vase-arrangements', name: 'Vibrant Gerbera Vase Arrangement', priceZAR: 950, blurb: 'Hot pink gerberas with orange and purple accents in a glass vase.' },
  { category: 'vase-arrangements', name: 'Pastel Garden Vase Arrangement', priceZAR: 980, blurb: 'Soft pink, lilac and blue blooms in a glass vase.' },
  { category: 'vase-arrangements', name: 'Bright Summer Vase Arrangement', priceZAR: 650, blurb: 'Pink, orange and purple summer flowers in a glass vase.' },
  { category: 'vase-arrangements', name: 'White Lily Vase Arrangement', priceZAR: 550, blurb: 'White and green lilies in a glass vase with a raffia tie.' },
  { category: 'vase-arrangements', name: 'Luxury Mixed Vase Arrangement', priceZAR: 1600, blurb: 'A generous mix of pink, orange and yellow blooms in a glass vase.' },
  { category: 'vase-arrangements', name: 'Sunset Garden Vase Arrangement', priceZAR: 750, blurb: 'Yellow, orange and purple flowers in a glass vase with orange ribbon.' },
  { category: 'vase-arrangements', name: 'Sunflower & Yellow Rose Vase', priceZAR: 1150, blurb: 'Sunflowers and yellow roses with greenery in a glass vase.' },
  { category: 'vase-arrangements', name: 'Sunflower Grand Vase', priceZAR: 1300, blurb: 'A tall sunflower arrangement with yellow craspedia in a glass vase.' },
  { category: 'vase-arrangements', name: 'Protea & Foliage Vase Arrangement', priceZAR: 750, blurb: 'Proteas and textured greenery in a glass vase.' },

  // Basket Arrangements
  { category: 'basket-arrangements', name: 'Country Garden Flower Basket', priceZAR: 650, blurb: 'Pink and red roses, lilies, thistles and gypsophila in a rustic handled basket.' },
  { category: 'basket-arrangements', name: 'Ruby Celebration Flower Basket', priceZAR: 680, blurb: 'Red gerberas, carnations and roses finished with a bright red ribbon.' },
  { category: 'basket-arrangements', name: 'Sunshine Meadow Flower Basket', priceZAR: 680, blurb: 'Yellow roses, white chrysanthemums, orange carnations and eucalyptus.' },
  { category: 'basket-arrangements', name: 'Roses & Ferrero Gift Basket', priceZAR: 850, blurb: 'Roses and tulips paired with Ferrero Rocher and Appletiser in a handled basket.' },
  { category: 'basket-arrangements', name: 'Pink Blush Flower Basket', priceZAR: 720, blurb: 'Pink roses, gerberas, lilies and snapdragons gathered in a rustic basket.' },
  { category: 'basket-arrangements', name: 'Red Rose & Chocolate Basket', priceZAR: 950, blurb: 'Red roses arranged with a box of chocolate seashells.' },
  { category: 'basket-arrangements', name: 'Golden Lily Flower Basket', priceZAR: 750, blurb: 'Yellow lilies, orange blooms, white chrysanthemums and a single red rose.' },
  { category: 'basket-arrangements', name: 'Autumn Glow Flower Basket', priceZAR: 850, blurb: 'Red roses, orange lilies, berries and eucalyptus with an orange ribbon.' },
  { category: 'basket-arrangements', name: 'Pastel Celebration Flower Basket', priceZAR: 850, blurb: 'Pink, white and orange roses with chrysanthemums and a pink bow.' },
  { category: 'basket-arrangements', name: 'Ivory Elegance Flower Basket', priceZAR: 550, blurb: 'White roses, cream lisianthus and gypsophila in a small woven basket.' },
  { category: 'basket-arrangements', name: 'Pink & Lilac Flower Basket', priceZAR: 650, blurb: 'Pink roses, alstroemeria and chrysanthemums with lilac accents.' },
  { category: 'basket-arrangements', name: 'Peach Gerbera Flower Basket', priceZAR: 650, blurb: 'A peach gerbera with purple lisianthus and pink roses in a woven basket.' },
  { category: 'basket-arrangements', name: 'Blush Alstroemeria Flower Basket', priceZAR: 850, blurb: 'Pink alstroemeria, chrysanthemums and roses with soft eucalyptus.' },
  { category: 'basket-arrangements', name: 'Citrus Sunrise Flower Basket', priceZAR: 650, blurb: 'Orange and yellow gerberas, yellow roses and eucalyptus.' },
  { category: 'basket-arrangements', name: 'Lemon & Lilac Flower Basket', priceZAR: 550, blurb: 'Yellow and white chrysanthemums, yellow roses and purple accents.' },

  // Extras
  { category: 'extras', name: 'Dried Rose Petal Pouch', priceZAR: 35, blurb: 'A kraft pouch of naturally dried rose petals for scattering or styling.' },
  { category: 'extras', name: 'Foil Balloon', priceZAR: 50, blurb: 'A helium-ready foil balloon in an assorted celebration design.' },
];

function slugifyName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CATALOGUE_PRODUCTS: Product[] = CATALOGUE_ENTRIES.map((entry, index) => {
  const meta = CATALOGUE_CATEGORY_META[entry.category];
  return {
    id: 1001 + index,
    slug: slugifyName(entry.name),
    name: entry.name,
    priceZAR: entry.priceZAR,
    wooCategory: meta.label,
    specialty: entry.category,
    occasions: meta.occasions,
    shortDescription: entry.blurb,
    description: `${entry.blurb} ${meta.description}`,
    images: [`/assets/nonise/${slugifyName(entry.name)}.webp`],
    altText: `${entry.name} by Nonise Florist in Pietermaritzburg`,
    includes: meta.includes,
    presentation: meta.presentation,
    inStock: true,
  };
});

const ROSE_SIZES = [10, 15, 20, 30, 40, 50, 100] as const;

// One price list for every rose colour; the shopper picks the colour when buying.
export const ROSE_COLOR_OPTIONS = ['Red', 'White', 'Pink', 'Mixed'] as const;

export const ROSE_COLOR_SWATCHES: Record<(typeof ROSE_COLOR_OPTIONS)[number], string> = {
  Red: '#B3122F',
  White: '#F4EFE6',
  Pink: '#E7A6B8',
  Mixed: 'conic-gradient(#B3122F, #E7A6B8, #F4EFE6, #C77E93, #B3122F)',
};

// Prices follow the studio rose price list (26 Nov 2026): plain vs with gyp.
const ROSE_SIZE_GROUPS = [
  {
    arrangement: 'Roses',
    slugBase: 'roses',
    image: '/assets/nonise/ruby-red-rose-statement-bouquet.webp',
    blurb: 'Fresh roses hand-tied in our signature wrap.',
    prices: [250, 400, 500, 750, 1000, 1250, 2500],
  },
  {
    arrangement: 'Roses with Gyp',
    slugBase: 'roses-with-gyp',
    image: '/assets/nonise/classic-red-rose-bouquet.webp',
    blurb: 'Fresh roses with delicate gypsophila in a natural wrap.',
    prices: [350, 500, 600, 900, 1200, 1500, 3000],
  },
] as const;

// Studio rose price list. Sizes are stem counts, priced per arrangement.
export const ROSE_SIZE_GUIDE = {
  sizes: ROSE_SIZES,
  rows: ROSE_SIZE_GROUPS.map(({ arrangement, slugBase, prices }) => ({
    arrangement,
    slugBase,
    prices,
  })),
  extras: [
    { label: 'Mixed bouquets', price: 'From R200' },
    { label: 'Flower boxes', price: 'From R650' },
    { label: 'Romantic hampers', price: 'From R850' },
    { label: 'Foil balloons', price: 'R50' },
  ],
};

// Each rose size is a real cart product so the comparison table can add it to the bag.
// They stay out of PRODUCTS so the grid does not repeat the same 14 options twice.
export const ROSE_SIZE_PRODUCTS: Product[] = ROSE_SIZE_GROUPS.flatMap((group, groupIndex) =>
  group.prices.map((price, sizeIndex) => {
    const size = ROSE_SIZES[sizeIndex];
    const name = `${size} ${group.arrangement}`;
    return {
      id: 3001 + groupIndex * ROSE_SIZES.length + sizeIndex,
      slug: `${group.slugBase}-${size}`,
      name,
      priceZAR: price,
      wooCategory: 'Rose Bouquets',
      specialty: 'rose-bouquets',
      colorOptions: [...ROSE_COLOR_OPTIONS],
      occasions: ['Anniversaries & Romance', 'Birthdays & Parties', 'Everyday Gifting'],
      shortDescription: `${group.blurb} ${size} stems. Choose red, white, pink or mixed.`,
      description: `${group.blurb} This arrangement includes ${size} fresh roses, hand-tied and finished with our signature wrap and ribbon. Choose red, white, pink or mixed roses when adding it to your bag.`,
      images: [group.image],
      altText: `${name} by Nonise Florist in Pietermaritzburg`,
      includes: [
        `${size} fresh long-stemmed roses`,
        'Signature boutique wrap & ribbon',
        'Complimentary personalised gift card',
      ],
      presentation: 'Hand-tied rose bouquet',
      inStock: true,
      badgeText: `${size} Stems`,
    };
  })
);

// Fail the build if the price table and the cart catalogue drift apart.
if (
  ROSE_SIZE_GUIDE.rows.some((row) =>
    ROSE_SIZES.some(
      (size) => !ROSE_SIZE_PRODUCTS.some((product) => product.slug === `${row.slugBase}-${size}`)
    )
  )
) {
  throw new Error('Rose price table is missing a cart product');
}

export const PRODUCTS: Product[] = [...SIGNATURE_PRODUCTS, ...CATALOGUE_PRODUCTS];

// Every product that can sit in a bag, including the rose-size price table.
export const SELLABLE_PRODUCTS: Product[] = [...PRODUCTS, ...ROSE_SIZE_PRODUCTS];

// Fail the build rather than ship two products that resolve to the same URL.
if (new Set(PRODUCTS.map((product) => product.slug)).size !== PRODUCTS.length) {
  throw new Error('Duplicate product slug in catalogue');
}

export const SPECIALTY_CATEGORIES: CategoryShowcase[] = [
  {
    id: 'box-arrangements',
    title: 'Box Arrangements',
    subtitle: 'Keepsake Hatboxes',
    description: 'Hand-arranged hatboxes and flower boxes, ready to gift and display.',
    image: '/assets/nonise/peach-and-pink-celebration-hatbox.webp',
    filterKey: 'box-arrangements',
    actionType: 'shop',
  },
  {
    id: 'rose-bouquets',
    title: 'Rose Bouquets',
    subtitle: 'Signature Floristry',
    description: 'From classic reds to ivory and blush roses, hand-tied for every moment.',
    image: '/assets/nonise/ivory-rose-ring-with-red-heart.webp',
    filterKey: 'rose-bouquets',
    actionType: 'shop',
  },
  {
    id: 'hampers',
    title: 'Hamper',
    subtitle: 'Thoughtful Pairings',
    description: 'Curated hampers of chocolates, treats and beverages for every celebration.',
    image: '/assets/nonise/pink-teddy-and-rose-luxury-hamper.webp',
    filterKey: 'hampers',
    actionType: 'shop',
  },
  {
    id: 'funeral-flowers',
    title: 'Funeral Flowers',
    subtitle: 'Dignified Tributes',
    description: 'Coffin sprays, crosses, posies and standing tributes crafted with compassion.',
    image: '/assets/nonise/white-rose-funeral-cross.webp',
    filterKey: 'funeral-flowers',
    actionType: 'shop',
  },
];

export const OCCASIONS: OccasionItem[] = [
  {
    id: 'weddings',
    title: 'Weddings & Bridal',
    summary:
      'Romantic bridal bouquets, ceremony florals, and lush cascading reception tablescapes tailored to your palette.',
    image: '/assets/nonise/gallery-10.webp',
    ctaLabel: 'Enquire for Weddings',
    targetView: 'contact',
    inquiryTopic: 'Wedding Flowers & Bridal Styling',
  },
  {
    id: 'birthdays',
    title: 'Birthdays & Celebrations',
    summary:
      'Vibrant hatboxes, personalised message boxes, chocolate hampers, and radiant hand-tied bouquets.',
    image: '/assets/nonise/home-specialty-1.webp',
    ctaLabel: 'Shop Birthday Blooms',
    targetView: 'shop',
    filterKey: 'all',
  },
  {
    id: 'romance',
    title: 'Anniversaries & Romance',
    summary:
      'Velvety red rose vases, 50-stem rose bouquets with gypsophila, and keepsake “I Love You” floral hatboxes.',
    image: '/assets/nonise/about-feature.webp',
    ctaLabel: 'Explore Rose Collection',
    targetView: 'shop',
    filterKey: 'rose-bouquets',
  },
  {
    id: 'sympathy',
    title: 'Sympathy & Funeral Sprays',
    summary:
      'Peaceful white-and-botanical arrangements and dignified funeral coffin sprays crafted with compassion.',
    image: '/assets/nonise/gallery-5.webp',
    ctaLabel: 'Arrange a Tribute',
    targetView: 'contact',
    inquiryTopic: 'Funeral Coffin Sprays & Sympathy Tributes',
  },
  {
    id: 'baby-showers',
    title: 'Baby Showers & Welcomes',
    summary:
      'Delicate table arrangements, plush keepsake centrepieces, and bespoke celebration styling.',
    image: '/assets/nonise/gallery-11.webp',
    ctaLabel: 'Plan a Celebration',
    targetView: 'contact',
    inquiryTopic: 'Baby Shower & Party Florals',
  },
  {
    id: 'corporate',
    title: 'Corporate & Business Functions',
    summary:
      'Polished floral styling for receptions, conferences, client gifting, and Pietermaritzburg business events.',
    image: '/assets/nonise/gallery-8.webp',
    ctaLabel: 'Request Corporate Quote',
    targetView: 'contact',
    inquiryTopic: 'Corporate & Business Function Florals',
  },
];

const CURATED_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-10',
    src: '/assets/nonise/gallery-10.webp',
    title: 'Cascading Hydrangea & Peach Rose Wedding Tablescape',
    alt: 'Elegant wedding reception with cascading hydrangea and peach roses on round tables',
    collection: 'Weddings & Events',
  },
  {
    id: 'g-1',
    src: '/assets/nonise/gallery-1.webp',
    title: 'Bespoke Crimson Rose Bouquet with Floral Monogram',
    alt: 'Luxury red rose bouquet with custom monogram lettering and satin ribbon',
    collection: 'Rose Bouquets',
  },
  {
    id: 'g-rose-pink',
    src: '/assets/nonise/portfolio-rose-pink-gyp.webp',
    title: 'Blush Pink Rose & Gypsophila Bouquet',
    alt: 'Soft pink roses with gypsophila in a hand-tied bouquet by Nonise Florist',
    collection: 'Rose Bouquets',
  },
  {
    id: 'g-rose-cream',
    src: '/assets/nonise/portfolio-rose-cream-heart.webp',
    title: 'Cream & Red Heart Rose Bouquet',
    alt: 'Cream roses arranged around a red heart of roses with gypsophila',
    collection: 'Rose Bouquets',
  },
  {
    id: 'g-protea',
    src: '/assets/nonise/portfolio-protea-rose-bouquet.webp',
    title: 'Protea & Rose Bouquet in Monochrome Wrap',
    alt: 'Pink proteas with red and blush roses in black and white wrap by Nonise Florist',
    collection: 'Protea Bouquets',
  },
  {
    id: 'g-protea-pincushion',
    src: '/assets/nonise/portfolio-protea-pincushion.webp',
    title: 'Protea & Pincushion Bouquet',
    alt: 'King protea with orange pincushions and greenery in a white wrap',
    collection: 'Protea Bouquets',
  },
  {
    id: 'g-about',
    src: '/assets/nonise/about-feature.webp',
    title: '“I Love You” Blush Rose & Tulip Keepsake Hatbox',
    alt: 'Romantic blush rose and tulip arrangement in keepsake hatbox with greeting card',
    collection: 'Box Arrangements',
  },
  {
    id: 'g-8',
    src: '/assets/nonise/gallery-8.webp',
    title: 'Crimson Scalloped Hatbox with Cream Roses, Lilies & Gerbera',
    alt: 'Red scalloped gift box filled with cream roses, lilies and gerbera for special occasions',
    collection: 'Box Arrangements',
  },
  {
    id: 'g-box-pink',
    src: '/assets/nonise/portfolio-box-pink-mixed.webp',
    title: 'Pink & Yellow Mixed Rose Hatbox',
    alt: 'Pink and silver hatbox filled with pink, red and yellow roses, lilies and statice',
    collection: 'Box Arrangements',
  },
  {
    id: 'g-box-red',
    src: '/assets/nonise/portfolio-box-red-roses-ferrero.webp',
    title: 'Red Rose & Ferrero Rocher Hatbox',
    alt: 'Black hatbox with red roses ringed by Ferrero Rocher chocolates',
    collection: 'Box Arrangements',
  },
  {
    id: 'g-hero',
    src: '/assets/nonise/home-hero-roses.webp',
    title: 'Signature Red Rose Glass Vase with Nonise Satin Ribbon',
    alt: 'Premium red roses arranged in clear glass vase with black satin ribbon and monogram crest',
    collection: 'Vase Arrangements',
  },
  {
    id: 'g-vase-red',
    src: '/assets/nonise/portfolio-vase-red-roses.webp',
    title: 'Red Rose Glass Vase Arrangement',
    alt: 'Red roses arranged in a clear glass vase with a red and black ribbon',
    collection: 'Vase Arrangements',
  },
  {
    id: 'g-vase-pink',
    src: '/assets/nonise/portfolio-vase-pink-gerbera.webp',
    title: 'Pink Rose & Gerbera Vase Arrangement',
    alt: 'Pink roses, orange gerbera, purple stock and eucalyptus in a clear glass vase',
    collection: 'Vase Arrangements',
  },
  {
    id: 'g-6',
    src: '/assets/nonise/gallery-6.webp',
    title: 'Pink Marble Ferrero Rocher Hamper & Rose Pairing',
    alt: 'Elegant gift hamper with pink marble base, white roses, and golden Ferrero Rocher chocolates',
    collection: 'Gift Hampers',
  },
  {
    id: 'g-hamper-pink',
    src: '/assets/nonise/portfolio-hamper-pink-teddy.webp',
    title: 'Pink Teddy, Rosé & Lindt Gift Hamper',
    alt: 'Pink gift box with a white teddy, Protea rosé, Lindt, Ferrero Rocher and treats',
    collection: 'Gift Hampers',
  },
  {
    id: 'g-hamper-orange',
    src: '/assets/nonise/portfolio-hamper-orange-roses-tray.webp',
    title: 'Orange Rose & Ferrero Wooden Tray',
    alt: 'Wooden tray with orange roses, Ferrero Rocher, chocolate whirls and sweets',
    collection: 'Gift Hampers',
  },
  {
    id: 'g-11',
    src: '/assets/nonise/gallery-11.webp',
    title: 'Oh Baby Celebration Centrepiece & Table Florals',
    alt: 'Celebration centerpiece with pastel flowers for baby shower event table',
    collection: 'Weddings & Events',
  },
  {
    id: 'g-3',
    src: '/assets/nonise/gallery-3.webp',
    title: 'Vibrant Sunset Gerbera, Tulip & Lilac Rose Bouquet',
    alt: 'Colorful mixed bouquet of sunset-toned gerberas, tulips and lilac roses',
    collection: 'Rose Bouquets',
  },
  {
    id: 'g-5',
    src: '/assets/nonise/gallery-5.webp',
    title: 'White & Eucalyptus Condolence Bouquet',
    alt: 'Elegant white and eucalyptus condolence bouquet with soft greenery and minimal styling',
    collection: 'Funeral & Sympathy',
  },
  {
    id: 'g-lily-sympathy',
    src: '/assets/nonise/portfolio-white-lily-sympathy.webp',
    title: 'White Lily Sympathy Arrangement',
    alt: 'White lilies in a clear glass vase with raffia, a sympathy arrangement by Nonise Florist',
    collection: 'Funeral & Sympathy',
  },
  {
    id: 'g-spec1',
    src: '/assets/nonise/home-specialty-1.webp',
    title: 'Happy Birthday Floral Hatbox & Chocolate Gift Suite',
    alt: 'Birthday gift set with floral hatbox, chocolate elements and celebratory styling',
    collection: 'Box Arrangements',
  },
  {
    id: 'g-contact',
    src: '/assets/nonise/contact-floral.webp',
    title: 'Blush & Magenta Garden Rose Hatbox Arrangement',
    alt: 'Garden rose arrangement in blush and magenta tones presented in gift hatbox',
    collection: 'Box Arrangements',
  },
  {
    id: 'g-2',
    src: '/assets/nonise/gallery-2.webp',
    title: 'Red Rose, Ferrero Rocher & Champagne Gift Box',
    alt: 'Red roses, Ferrero Rocher chocolates and champagne presented in a white gift box',
    collection: 'Box Arrangements',
  },
  {
    id: 'g-4',
    src: '/assets/nonise/gallery-4.webp',
    title: 'Pink Celebration Bouquet',
    alt: 'Hand-tied pink celebration bouquet with seasonal flowers and greenery',
    collection: 'Rose Bouquets',
  },
  {
    id: 'g-7',
    src: '/assets/nonise/gallery-7.webp',
    title: '“I Love You” Hatbox Floral Detail',
    alt: 'Close-up of the “I Love You” hatbox floral styling with blush roses',
    collection: 'Box Arrangements',
  },
];

const GALLERY_COLLECTION_BY_SPECIALTY: Record<ShopCategory, GalleryPhoto['collection']> = {
  'basket-arrangements': 'Basket Arrangements',
  'box-arrangements': 'Box Arrangements',
  extras: 'Extras',
  'funeral-flowers': 'Funeral & Sympathy',
  'funeral-package-sets': 'Funeral & Sympathy',
  hampers: 'Gift Hampers',
  'mixed-bouquets': 'Mixed Bouquets',
  'protea-bouquets': 'Protea Bouquets',
  'rose-bouquets': 'Rose Bouquets',
  'vase-arrangements': 'Vase Arrangements',
};

// The product catalogue doubles as the portfolio gallery, so new photography
// is listed once in CATALOGUE_ENTRIES rather than duplicated here.
// Catalogue photography is also shown in the gallery. If the florist prefers
// these images to appear only as products, set this flag to false.
const INCLUDE_CATALOGUE_IN_GALLERY = true;

const CATALOGUE_GALLERY_PHOTOS: GalleryPhoto[] = INCLUDE_CATALOGUE_IN_GALLERY
  ? CATALOGUE_PRODUCTS.map((product) => ({
      id: `g-${product.slug}`,
      src: product.images[0],
      title: product.name,
      alt: product.altText,
      collection: GALLERY_COLLECTION_BY_SPECIALTY[product.specialty as ShopCategory],
    }))
  : [];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  ...CURATED_GALLERY_PHOTOS,
  ...CATALOGUE_GALLERY_PHOTOS,
];

// Optional finishing touches offered at checkout. "From" prices use the base amount.
export const CHECKOUT_ADDONS: CheckoutAddon[] = [
  { id: 'champagne', label: 'Champagne', priceZAR: 950, fromPrice: true },
  { id: 'chocolates', label: 'Chocolates', priceZAR: 300, fromPrice: true },
  { id: 'wine', label: 'Wine', priceZAR: 550, fromPrice: true },
  { id: 'balloons', label: 'Balloons', priceZAR: 50, image: '/assets/nonise/foil-balloon-640.webp' },
  { id: 'petals', label: 'Dry flower petals', priceZAR: 35, image: '/assets/nonise/dried-rose-petal-pouch-640.webp' },
];

export function formatZAR(amount: number): string {
  return `R ${amount.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
