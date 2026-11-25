export interface LandingSection {
  heading: string;
  body: string[];
}

export interface LandingPageConfig {
  slug: string;
  path: string;
  breadcrumbLabel: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  heroImage: string;
  heroImageAlt: string;
  /** Optional 1200x630 JPEG for social shares. Falls back to the site OG image when unset. */
  ogImage?: string;
  highlights: string[];
  sections: LandingSection[];
  /** Optional portfolio grid for event and custom design inspiration. */
  gallery?: { src: string; alt: string; caption: string }[];
  galleryHeading?: string;
  faqs: { question: string; answer: string }[];
  relatedProductSlugs: string[];
  ctaLabel: string;
  inquiryTopic: string;
}

export const LANDING_PAGES: Record<string, LandingPageConfig> = {
  'weddings-events': {
    slug: 'weddings-events',
    path: '/collections/weddings-events',
    breadcrumbLabel: 'Weddings & Events',
    title: 'Wedding & Event Flowers Pietermaritzburg | Nonise Florist',
    description:
      'Bridal bouquets, ceremony arches, reception tables and corporate event florals styled in Pietermaritzburg. Request a bespoke quote.',
    h1: 'Wedding & Event Flowers in Pietermaritzburg',
    intro:
      'From intimate vows to full-scale celebrations, Nonise Florist designs wedding and event flowers that feel personal, considered and unmistakably yours. We work closely with every couple and planner on palette, budget and setting.',
    heroImage: '/assets/nonise/gallery-10.webp',
    heroImageAlt:
      'Wedding reception tablescape with cascading hydrangea and peach roses by Nonise Florist',
    ogImage: '/assets/nonise/seo/og-weddings-events.jpg',
    highlights: [
      'Bridal bouquets, buttonholes and corsages',
      'Ceremony arches, aisles and altar florals',
      'Reception centrepieces and grouped vase arrangements',
      'Delivery, setup and on-the-day support',
    ],
    sections: [
      {
        heading: 'Bridal Party Flowers',
        body: [
          'Your bouquet sets the tone for the whole celebration. We design bridal bouquets, bridesmaid posies, flower girl baskets, buttonholes and corsages in a palette that suits your dress, venue and season.',
          'Every stem is chosen with the photographs in mind, so the flowers hold their shape and colour from the first look to the last dance.',
        ],
      },
      {
        heading: 'Ceremony & Reception Styling',
        body: [
          'We dress ceremony arches, aisles, signing tables and altar spaces, then carry the same language through to reception centrepieces, head tables, cake flowers and lounge arrangements.',
          'For larger installations we handle delivery, setup and breakdown, coordinating with your venue and planner so the day runs smoothly.',
        ],
      },
      {
        heading: 'Corporate & Celebration Events',
        body: [
          'Launches, anniversaries, birthdays, gala dinners and corporate functions all benefit from flowers with a clear point of view. We work to your brand colours and venue constraints, from restrained table florals to statement entrances.',
        ],
      },
      {
        heading: 'Centrepieces & Grouped Vase Arrangements',
        body: [
          'Our event collection includes table centrepieces, grouped vase arrangements and statement floral clusters for receptions, baby showers, corporate tables and celebration dinners. We can repeat one design across every table or mix heights and vase shapes for a layered tablescape.',
          'Share your table count, venue and palette and we will recommend the right arrangement size, quantity and budget per table.',
        ],
      },
      {
        heading: 'How Wedding Planning Works',
        body: [
          'Start with a consultation in our Pietermaritzburg studio or over WhatsApp. Share your date, venue, palette and budget, and we will prepare a proposal with recommended designs and quantities.',
          'We recommend booking two to four weeks ahead for smaller celebrations, and earlier for peak-season weddings and large installations.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How far in advance should we book wedding flowers?',
        answer:
          'We recommend booking two to four weeks ahead for smaller celebrations, and earlier for peak-season weddings and large installations. Share your date, venue, palette and budget and we will prepare a proposal.',
      },
      {
        question: 'Do you deliver and set up ceremony and reception flowers?',
        answer:
          'Yes. For larger installations we handle delivery, setup and breakdown, coordinating with your venue and planner so the day runs smoothly.',
      },
      {
        question: 'Can you work within a specific colour palette or budget?',
        answer:
          'Yes. We design around your palette, venue and budget, from restrained table florals to statement entrances, and recommend designs and quantities in your proposal.',
      },
      {
        question: 'Do you style corporate and celebration events too?',
        answer:
          'Yes. We style launches, anniversaries, birthdays, gala dinners and corporate functions, working to your brand colours and venue constraints.',
      },
    ],
    galleryHeading: 'Event Centrepieces & Tablescapes',
    gallery: [
      {
        src: '/assets/nonise/gallery-10.webp',
        alt: 'Wedding reception tablescape with cascading hydrangea and peach roses',
        caption: 'Cascading hydrangea & peach rose wedding tablescape',
      },
      {
        src: '/assets/nonise/gallery-11.webp',
        alt: 'Pastel baby shower centrepiece and table florals',
        caption: '“Oh Baby” celebration centrepiece & table florals',
      },
      {
        src: '/assets/nonise/luxury-mixed-vase-arrangement.webp',
        alt: 'Generous mixed pink, orange and yellow vase arrangement for event tables',
        caption: 'Luxury mixed vase arrangement for reception tables',
      },
      {
        src: '/assets/nonise/garden-medley-vase-arrangement.webp',
        alt: 'Mixed garden flowers in a glass vase for event centrepieces',
        caption: 'Garden medley grouped vase arrangement',
      },
      {
        src: '/assets/nonise/protea-and-foliage-vase-arrangement.webp',
        alt: 'Proteas and textured greenery in a glass vase for events',
        caption: 'Protea & foliage vase arrangement',
      },
      {
        src: '/assets/nonise/sunflower-grand-vase.webp',
        alt: 'Tall sunflower arrangement with yellow craspedia in a glass vase',
        caption: 'Sunflower grand vase for celebration tables',
      },
    ],
    relatedProductSlugs: [
      'luxury-mixed-vase-arrangement',
      'garden-medley-vase-arrangement',
      'protea-and-foliage-vase-arrangement',
    ],
    ctaLabel: 'Request a Wedding Quote',
    inquiryTopic: 'Wedding & Event Flowers',
  },
  'custom-bouquets': {
    slug: 'custom-bouquets',
    path: '/custom-bouquets',
    breadcrumbLabel: 'Custom Bouquets',
    title: 'Custom Bouquets Pietermaritzburg | Nonise Florist',
    description:
      'Design a custom bouquet with Nonise Florist in Pietermaritzburg. Choose your stems, colours, size and budget, or pair your flowers with a curated hamper.',
    h1: 'Custom Bouquets, Designed Around You',
    intro:
      'Choose the flowers, colours, size and budget — our Pietermaritzburg studio will hand-tie a bouquet made for the moment. Browse recent custom designs below, then send us your inspiration.',
    heroImage: '/assets/nonise/blush-pink-rose-and-gypsophila-bouquet.webp',
    heroImageAlt: 'Custom blush pink rose and gypsophila bouquet by Nonise Florist',
    highlights: [
      'Choose your stems, palette and wrapping',
      'Any size, from a petite posy to a grand statement',
      'Custom hampers and gift pairings available',
      'Hand-delivered across Pietermaritzburg',
    ],
    sections: [
      {
        heading: 'A Bouquet Made for the Moment',
        body: [
          'Whether you have a colour in mind, a favourite flower or only a feeling, we can design around it. Tell us the occasion, the recipient and your budget, and our florists will suggest stems and a shape that works.',
          'Custom bouquets are ideal for birthdays, anniversaries, apologies, congratulations, proposals and just-because gestures.',
        ],
      },
      {
        heading: 'How Custom Orders Work',
        body: [
          'Send an enquiry with your inspiration photos, preferred colours, size and delivery date. We will confirm availability, a quote and the earliest delivery window.',
          'For same-day requests, call or WhatsApp the studio directly so we can check what is fresh in the studio.',
        ],
      },
      {
        heading: 'Sizes, Stems & Budget',
        body: [
          'We work from petite posies to generous statement bouquets. Roses, lilies, proteas, gerberas, tulips and seasonal blooms are all available, subject to freshness and season.',
          'If you are unsure what your budget buys, ask us for options at two or three price points and we will show you the difference.',
        ],
      },
      {
        heading: 'Custom Hampers & Gift Pairings',
        body: [
          'Pair your custom bouquet with chocolates, champagne, wine, a teddy or a curated snack hamper. Browse our ready-made hampers for inspiration, or ask us to build a gift set around your bouquet.',
        ],
      },
    ],
    galleryHeading: 'Recent Custom Bouquet Designs',
    gallery: [
      {
        src: '/assets/nonise/blush-pink-rose-and-gypsophila-bouquet.webp',
        alt: 'Blush pink roses with gypsophila in a kraft wrap',
        caption: 'Blush pink rose & gypsophila bouquet',
      },
      {
        src: '/assets/nonise/jewel-tone-mixed-bouquet.webp',
        alt: 'Roses, lisianthus and purple accents in a jewel-toned custom bouquet',
        caption: 'Jewel tone mixed bouquet',
      },
      {
        src: '/assets/nonise/sunset-rose-and-ranunculus-bouquet.webp',
        alt: 'Red roses, orange ranunculus and yellow tulips in a dark wrap',
        caption: 'Sunset rose & ranunculus bouquet',
      },
      {
        src: '/assets/nonise/protea-and-pincushion-bouquet.webp',
        alt: 'Pink proteas with orange pincushions and lush foliage',
        caption: 'Protea & pincushion bouquet',
      },
      {
        src: '/assets/nonise/ivory-rose-and-gypsophila-bouquet.webp',
        alt: 'Ivory roses with gypsophila in a clear presentation wrap',
        caption: 'Ivory rose & gypsophila bouquet',
      },
      {
        src: '/assets/nonise/gallery-4.webp',
        alt: 'Hand-tied pink celebration bouquet with seasonal flowers and greenery',
        caption: 'Pink celebration bouquet',
      },
    ],
    faqs: [
      {
        question: 'Can I choose specific flowers and colours?',
        answer:
          'Yes. Share your preferred stems, colours and inspiration photos. We will confirm what is fresh and in season, then suggest the closest options.',
      },
      {
        question: 'How much does a custom bouquet cost?',
        answer:
          'Pricing depends on the stems, size and wrapping you choose. Tell us your budget and we will prepare options at two or three price points.',
      },
      {
        question: 'How far in advance should I order?',
        answer:
          'Two to three days is ideal for a custom design. Same-day requests are possible where availability allows — call or WhatsApp the studio to check.',
      },
      {
        question: 'Can I add chocolates, champagne or a hamper?',
        answer:
          'Yes. We can pair your bouquet with chocolates, champagne, wine, a teddy or a curated hamper. Browse our hampers or ask us to build a gift set.',
      },
    ],
    relatedProductSlugs: [
      'blush-pink-rose-and-gypsophila-bouquet',
      'jewel-tone-mixed-bouquet',
      'sunset-rose-and-ranunculus-bouquet',
    ],
    ctaLabel: 'Request a Custom Bouquet',
    inquiryTopic: 'Custom Bouquet or Gift Hamper',
  },
  'funeral-flowers-pietermaritzburg': {
    slug: 'funeral-flowers-pietermaritzburg',
    path: '/funeral-flowers-pietermaritzburg',
    breadcrumbLabel: 'Funeral Flowers',
    title: 'Funeral Flowers & Sympathy Tributes | Nonise Florist',
    description:
      'Order funeral flowers and sympathy tributes in Pietermaritzburg: coffin sprays, wreaths, casket flowers and condolence bouquets, delivered with care.',
    h1: 'Funeral Flowers & Sympathy Tributes in Pietermaritzburg',
    intro:
      'Flowers give shape to grief and comfort to those left behind. Nonise Florist prepares dignified sympathy tributes with quiet attention to colour, scale and meaning, delivered to homes, churches, halls and funeral parlours across Pietermaritzburg.',
    heroImage: '/assets/nonise/white-and-green-coffin-spray.webp',
    heroImageAlt: 'White and green coffin spray funeral tribute by Nonise Florist in Pietermaritzburg',
    ogImage: '/assets/nonise/seo/og-funeral-flowers.jpg',
    highlights: [
      'Coffin sprays and casket tributes',
      'Standing wreaths and easel arrangements',
      'Condolence bouquets and vase arrangements',
      'Careful delivery and family coordination',
    ],
    sections: [
      {
        heading: 'Coffin Sprays & Casket Tributes',
        body: [
          'A coffin spray rests on the casket and carries the family’s message into the service. We design these tributes in white, cream, soft pastels or deeper tones, with a sash for the family or organisation name if required.',
        ],
      },
      {
        heading: 'Wreaths & Standing Arrangements',
        body: [
          'Standing wreaths and easel tributes frame the service and allow friends, colleagues and extended family to send a visible message of support. We can match colours across several tributes so the family display feels unified.',
        ],
      },
      {
        heading: 'Condolence Bouquets',
        body: [
          'For a home visit or a private moment, a hand-tied condolence bouquet or a simple vase arrangement offers warmth without overwhelming the room. Our team can guide you on appropriate flowers and colours when words are difficult.',
        ],
      },
      {
        heading: 'Delivery & Coordination',
        body: [
          'Sympathy flowers are time-sensitive. Share the service date, venue and required delivery window, and we will coordinate with the family, church or funeral parlour. For urgent requests, call or WhatsApp the studio directly so we can confirm availability.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How quickly can you prepare funeral flowers?',
        answer:
          'Sympathy flowers are time-sensitive. Share the service date, venue and required delivery window, and call or WhatsApp the studio for urgent requests so we can confirm availability.',
      },
      {
        question: 'Do you deliver to churches, halls and funeral parlours?',
        answer:
          'Yes. We coordinate delivery with the family, church, hall or funeral parlour across Pietermaritzburg.',
      },
      {
        question: 'Can we order a coffin spray, wreath and bouquet together?',
        answer:
          'Yes. We design coffin sprays, standing wreaths, easel tributes and condolence bouquets, and can match colours across several tributes so the family display feels unified.',
      },
      {
        question: 'Can you include a sash with the family or organisation name?',
        answer:
          'Yes. Coffin sprays can include a sash for the family or organisation name if required.',
      },
    ],
    relatedProductSlugs: ['30-white-roses-with-gyp', 'mixed-lillies', 'mixed-bouquet'],
    ctaLabel: 'Arrange a Sympathy Tribute',
    inquiryTopic: 'Funeral & Sympathy Flowers',
  },
  'flower-delivery-pietermaritzburg': {
    slug: 'flower-delivery-pietermaritzburg',
    path: '/flower-delivery-pietermaritzburg',
    breadcrumbLabel: 'Flower Delivery',
    title: 'Flower Delivery Pietermaritzburg | Nonise Florist',
    description:
      'Same-day and scheduled flower delivery across Pietermaritzburg, Monday to Saturday. Order fresh bouquets, roses and gifts from our local studio.',
    h1: 'Flower Delivery Across Pietermaritzburg',
    intro:
      'Nonise Florist delivers hand-tied bouquets, rose arrangements and floral gifts across Pietermaritzburg from our studio on Peter Kerchhoff Street. Order online, by phone or on WhatsApp, and we will confirm the delivery window with you.',
    heroImage: '/assets/nonise/gallery-11.webp',
    heroImageAlt: 'Fresh flower delivery bouquet from Nonise Florist Pietermaritzburg',
    ogImage: '/assets/nonise/seo/og-flower-delivery.jpg',
    highlights: [
      'Local delivery Monday to Saturday',
      'Same-day delivery where availability allows',
      'Complimentary in-store collection',
      'Handwritten gift message included',
    ],
    sections: [
      {
        heading: 'Where We Deliver',
        body: [
          'We deliver throughout Pietermaritzburg, including the CBD, Scottsville, Pelham, Wembley, Hayfields, Clarendon, Chase Valley and nearby suburbs. If you are unsure whether your address is in our delivery area, send us a message before ordering.',
          'Delivery fees are confirmed with your order. Complimentary collection is available from our studio during trading hours.',
        ],
      },
      {
        heading: 'Delivery Times',
        body: [
          'Deliveries run Monday to Friday from 8:00 AM to 4:30 PM and on Saturday from 8:00 AM to 1:00 PM. We are closed on Sundays.',
          'For same-day delivery, order early in the day so our florists have time to prepare and route your arrangement. Scheduled deliveries can be booked ahead for birthdays, anniversaries and other important dates.',
        ],
      },
      {
        heading: 'Gifts & Personal Messages',
        body: [
          'Every online order can include a handwritten card message. Pair your flowers with Ferrero Rocher chocolates or a curated gift hamper for a complete gesture.',
        ],
      },
      {
        heading: 'Ordering for Someone Else',
        body: [
          'Add the recipient’s name, phone number and full address at checkout. If the recipient may not be home, let us know where the arrangement can be left safely or who will receive it.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you offer same-day flower delivery in Pietermaritzburg?',
        answer:
          'Same-day delivery is available where availability allows, Monday to Saturday. Order early in the day so our florists have time to prepare and route your arrangement.',
      },
      {
        question: 'Which Pietermaritzburg areas do you deliver to?',
        answer:
          'We deliver throughout Pietermaritzburg, including the CBD, Scottsville, Pelham, Wembley, Hayfields, Clarendon, Chase Valley and nearby suburbs.',
      },
      {
        question: 'What are your delivery times?',
        answer:
          'Deliveries run Monday to Friday from 8:00 AM to 4:30 PM and on Saturday from 8:00 AM to 1:00 PM. We are closed on Sundays.',
      },
      {
        question: 'Can I add a handwritten gift message?',
        answer:
          'Yes. Every online order can include a handwritten card message, and you can pair flowers with Ferrero Rocher chocolates or a curated gift hamper.',
      },
    ],
    relatedProductSlugs: ['sunshine-bouquet', 'mixed-bouquet', 'protea-mix'],
    ctaLabel: 'Order Flowers for Delivery',
    inquiryTopic: 'Flower Delivery',
  },
};

export const LANDING_SLUGS = Object.keys(LANDING_PAGES);

export const LANDING_LINKS = [
  { slug: 'custom-bouquets', label: 'Custom Bouquets' },
  { slug: 'weddings-events', label: 'Wedding & Event Flowers' },
  { slug: 'funeral-flowers-pietermaritzburg', label: 'Funeral & Sympathy Flowers' },
  { slug: 'flower-delivery-pietermaritzburg', label: 'Flower Delivery' },
];

export function landingBySlug(slug?: string): LandingPageConfig | undefined {
  if (!slug) return undefined;
  return LANDING_PAGES[slug];
}
