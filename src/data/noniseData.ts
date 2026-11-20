import { CategoryShowcase, GalleryPhoto, OccasionItem, Product } from '../types';

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
  emailPrimary: 'info@noniseflorist.com',
  emailSecondary: 'noniseflorist@gmail.com',
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 4:30 PM' },
    { days: 'Saturday', time: '8:00 AM – 1:00 PM' },
    { days: 'Sunday', time: 'Closed (Pre-booked events by arrangement)' },
  ],
  promise: 'Our Promise: We Deliver, Whatever It Takes!',
  logo: '/assets/nonise/logo.png',
  copyrightYear: 2026,
};

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
export const PRODUCTS: Product[] = [
  {
    id: 248,
    slug: '50-roses-with-gyp',
    name: '50 Roses with GYP',
    priceZAR: 1500,
    wooCategory: 'Everyday Bouquets & Flower Gifting',
    specialty: 'roses',
    occasions: ['Anniversaries & Romance', 'Birthdays & Parties'],
    shortDescription: '50 fresh roses styled with delicate gypsophila in signature boutique wrapping.',
    description:
      'An unforgettable luxury bouquet of fifty fresh-cut roses nestled in clouds of delicate white gypsophila (baby’s breath), hand-tied and finished with Nonise Florist’s signature wrapping and satin ribbon.',
    images: ['/assets/nonise/prod-50-roses-gyp.jpg'],
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
    wooCategory: 'Everyday Bouquets & Flower Gifting',
    specialty: 'roses',
    occasions: ['Anniversaries & Romance', 'Corporate & Events'],
    shortDescription: 'Abundant velvety red roses arranged in a clear glass vase with signature satin ribbon.',
    description:
      'A classic statement of timeless devotion. Abundant crimson roses arranged lushly in a clear rounded glass vase, finished with Nonise Florist’s black satin monogram ribbon and crest seal.',
    images: ['/assets/nonise/prod-red-rose-vase.jpg', '/assets/nonise/home-hero-roses.jpg'],
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
    name: 'Roses with Ferrero',
    priceZAR: 1200,
    wooCategory: 'Everyday Bouquets & Flower Gifting',
    specialty: 'gifting',
    occasions: ['Anniversaries & Romance', 'Birthdays & Parties'],
    shortDescription: 'Fresh white roses paired with golden Ferrero Rocher chocolates in marble-trimmed wrap.',
    description:
      'Elegance meets indulgence. A lush ring of crisp white roses framing a bouquet centre of golden Ferrero Rocher chocolates, presented in gold-edged marble wrap for heartfelt gifting.',
    images: ['/assets/nonise/prod-roses-ferrero.jpg'],
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
    wooCategory: 'Everyday Bouquets & Flower Gifting',
    specialty: 'roses',
    occasions: ['Anniversaries & Romance', 'Weddings & Bridal', 'Sympathy & Remembrance'],
    shortDescription: '30 luminous white roses haloed with baby’s breath and Nonise Florist white satin ribbon.',
    description:
      'Pure, serene, and refined. Thirty fresh white roses surrounded by an airy halo of gypsophila, styled in monochrome ivory-and-black edged wrap with a white Nonise Florist satin bow.',
    images: ['/assets/nonise/prod-30-white-roses-gyp.jpg'],
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
    name: 'Mixed Lillies',
    priceZAR: 750,
    wooCategory: 'Everyday Bouquets & Flower Gifting',
    specialty: 'seasonal',
    occasions: ['Birthdays & Parties', 'Sympathy & Remembrance', 'Corporate & Events'],
    shortDescription: 'Fragrant fresh mixed lilies styled with seasonal foliage for lasting beauty.',
    description:
      'Graceful, fragrant mixed lilies selected in bud and bloom so your recipient enjoys days of unfolding colour and scent, paired with fresh botanical greenery in boutique wrapping.',
    images: ['/assets/nonise/prod-mixed-lillies.jpg'],
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
    name: 'Sunshine bouquet',
    priceZAR: 500,
    wooCategory: 'Everyday Bouquets & Flower Gifting',
    specialty: 'seasonal',
    occasions: ['Birthdays & Parties', 'Baby Showers & Celebrations'],
    shortDescription: 'Radiant sunlit blooms arranged to bring warmth, cheer, and joy to any room.',
    description:
      'A bright, uplifting seasonal arrangement composed to capture warmth and celebration. Ideal for birthdays, congratulations, thank-you gestures, or simply brightening someone’s day.',
    images: ['/assets/nonise/prod-sunshine-bouquet.jpg'],
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
    name: 'Mixed bouquet',
    priceZAR: 450,
    wooCategory: 'Everyday Bouquets & Flower Gifting',
    specialty: 'seasonal',
    occasions: ['Birthdays & Parties', 'Everyday Gifting'],
    shortDescription: 'Mixed bouquet for special occasions — thoughtfully composed with fresh seasonal stems.',
    description:
      'Our versatile everyday floral gesture, crafted with the freshest seasonal stems available in our Pietermaritzburg studio each morning. Balanced in texture, colour, and fragrance.',
    images: ['/assets/nonise/prod-mixed-bouquet.jpg'],
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
    name: 'Protea Mix',
    priceZAR: 350,
    wooCategory: 'Everyday Bouquets & Flower Gifting',
    specialty: 'seasonal',
    occasions: ['Birthdays & Parties', 'Corporate & Events', 'Everyday Gifting'],
    shortDescription: 'South African proteas paired with soft blush roses, tulips, and delicate seasonal stems.',
    description:
      'Celebrating South African botanical beauty. Textured native proteas nestled among soft pink roses, lavender tulips, and crisp snapdragons in vibrant rose wrap sealed with our Nonise Florist crest.',
    images: ['/assets/nonise/prod-protea-mix.jpg'],
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

export const SPECIALTY_CATEGORIES: CategoryShowcase[] = [
  {
    id: 'everyday-bouquets',
    title: 'Everyday Bouquets & Gifting',
    subtitle: 'Fresh Daily Stems',
    description: 'Hand-tied seasonal bouquets, fragrant lilies, and South African protea arrangements.',
    image: '/assets/nonise/prod-protea-mix.jpg',
    filterKey: 'seasonal',
    actionType: 'shop',
  },
  {
    id: 'roses-moments',
    title: 'Roses Made for Moments',
    subtitle: 'Signature Floristry',
    description: 'From 30 luminous white roses to 50 velvety crimson stems and glass vase statements.',
    image: '/assets/nonise/home-hero-roses.jpg',
    filterKey: 'roses',
    actionType: 'shop',
  },
  {
    id: 'custom-hampers',
    title: 'Custom Bouquets & Hampers',
    subtitle: 'Thoughtful Pairings',
    description: 'Ferrero Rocher rose creations, bespoke monogram bouquets, and curated gift boxes.',
    image: '/assets/nonise/gallery-6.jpg',
    filterKey: 'gifting',
    actionType: 'shop',
  },
  {
    id: 'weddings-events',
    title: 'Weddings & Events',
    subtitle: 'Bespoke Floral Styling',
    description: 'Bridal bouquets, cascading tablescapes, corporate functions, and dignified tributes.',
    image: '/assets/nonise/gallery-10.jpg',
    filterKey: 'events',
    actionType: 'contact',
  },
];

export const OCCASIONS: OccasionItem[] = [
  {
    id: 'weddings',
    title: 'Weddings & Bridal',
    summary:
      'Romantic bridal bouquets, ceremony florals, and lush cascading reception tablescapes tailored to your palette.',
    image: '/assets/nonise/gallery-10.jpg',
    ctaLabel: 'Enquire for Weddings',
    targetView: 'contact',
    inquiryTopic: 'Wedding Flowers & Bridal Styling',
  },
  {
    id: 'birthdays',
    title: 'Birthdays & Celebrations',
    summary:
      'Vibrant hatboxes, personalised message boxes, chocolate hampers, and radiant hand-tied bouquets.',
    image: '/assets/nonise/home-specialty-1.jpg',
    ctaLabel: 'Shop Birthday Blooms',
    targetView: 'shop',
    filterKey: 'all',
  },
  {
    id: 'romance',
    title: 'Anniversaries & Romance',
    summary:
      'Velvety red rose vases, 50-stem rose bouquets with gypsophila, and keepsake “I Love You” floral hatboxes.',
    image: '/assets/nonise/about-feature.jpg',
    ctaLabel: 'Explore Rose Collection',
    targetView: 'shop',
    filterKey: 'roses',
  },
  {
    id: 'sympathy',
    title: 'Sympathy & Funeral Sprays',
    summary:
      'Peaceful white-and-botanical arrangements and dignified funeral coffin sprays crafted with compassion.',
    image: '/assets/nonise/gallery-5.jpg',
    ctaLabel: 'Arrange a Tribute',
    targetView: 'contact',
    inquiryTopic: 'Funeral Coffin Sprays & Sympathy Tributes',
  },
  {
    id: 'baby-showers',
    title: 'Baby Showers & Welcomes',
    summary:
      'Delicate table arrangements, plush keepsake centrepieces, and bespoke celebration styling.',
    image: '/assets/nonise/gallery-11.jpg',
    ctaLabel: 'Plan a Celebration',
    targetView: 'contact',
    inquiryTopic: 'Baby Shower & Party Florals',
  },
  {
    id: 'corporate',
    title: 'Corporate & Business Functions',
    summary:
      'Polished floral styling for receptions, conferences, client gifting, and Pietermaritzburg business events.',
    image: '/assets/nonise/gallery-8.jpg',
    ctaLabel: 'Request Corporate Quote',
    targetView: 'contact',
    inquiryTopic: 'Corporate & Business Function Florals',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-10',
    src: '/assets/nonise/gallery-10.jpg',
    title: 'Cascading Hydrangea & Peach Rose Wedding Tablescape',
    collection: 'Weddings & Events',
  },
  {
    id: 'g-1',
    src: '/assets/nonise/gallery-1.jpg',
    title: 'Bespoke Crimson Rose Bouquet with Floral Monogram',
    collection: 'Roses & Bouquets',
  },
  {
    id: 'g-about',
    src: '/assets/nonise/about-feature.jpg',
    title: '“I Love You” Blush Rose & Tulip Keepsake Hatbox',
    collection: 'Hatboxes & Hampers',
  },
  {
    id: 'g-8',
    src: '/assets/nonise/gallery-8.jpg',
    title: 'Crimson Scalloped Hatbox with Buttercream Roses & Dahlias',
    collection: 'Hatboxes & Hampers',
  },
  {
    id: 'g-hero',
    src: '/assets/nonise/home-hero-roses.jpg',
    title: 'Signature Red Rose Glass Vase with Nonise Satin Ribbon',
    collection: 'Roses & Bouquets',
  },
  {
    id: 'g-6',
    src: '/assets/nonise/gallery-6.jpg',
    title: 'Pink Marble Ferrero Rocher Hamper & Rose Pairing',
    collection: 'Hatboxes & Hampers',
  },
  {
    id: 'g-11',
    src: '/assets/nonise/gallery-11.jpg',
    title: 'Oh Baby Celebration Centrepiece & Table Florals',
    collection: 'Weddings & Events',
  },
  {
    id: 'g-3',
    src: '/assets/nonise/gallery-3.jpg',
    title: 'Vibrant Sunset Gerbera, Tulip & Lilac Rose Bouquet',
    collection: 'Roses & Bouquets',
  },
  {
    id: 'g-5',
    src: '/assets/nonise/gallery-5.jpg',
    title: 'Botanical White & Eucalyptus Serenity Arrangement',
    collection: 'Roses & Bouquets',
  },
  {
    id: 'g-spec1',
    src: '/assets/nonise/home-specialty-1.jpg',
    title: 'Happy Birthday Floral Hatbox & Chocolate Gift Suite',
    collection: 'Hatboxes & Hampers',
  },
  {
    id: 'g-contact',
    src: '/assets/nonise/contact-floral.jpg',
    title: 'Blush & Magenta Garden Rose Hatbox Arrangement',
    collection: 'Hatboxes & Hampers',
  },
  {
    id: 'g-2',
    src: '/assets/nonise/gallery-2.jpg',
    title: 'Studio Signature Arrangement',
    collection: 'Roses & Bouquets',
  },
  {
    id: 'g-4',
    src: '/assets/nonise/gallery-4.jpg',
    title: 'Hand-Tied Celebration Blooms',
    collection: 'Roses & Bouquets',
  },
  {
    id: 'g-7',
    src: '/assets/nonise/gallery-7.jpg',
    title: 'Bespoke Floral Styling Detail',
    collection: 'Weddings & Events',
  },
];

export function formatZAR(amount: number): string {
  return `R ${amount.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
