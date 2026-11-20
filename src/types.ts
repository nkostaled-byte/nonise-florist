export type PageView =
  | 'home'
  | 'shop'
  | 'product'
  | 'gallery'
  | 'about'
  | 'contact'
  | 'checkout';

export type SpecialtyKey =
  | 'all'
  | 'roses'
  | 'seasonal'
  | 'gifting'
  | 'events';

export interface Product {
  id: number;
  slug: string;
  name: string;
  priceZAR: number;
  wooCategory: string;
  specialty: Exclude<SpecialtyKey, 'all'>;
  occasions: string[];
  shortDescription: string;
  description: string;
  images: string[];
  includes: string[];
  presentation: string;
  inStock: boolean;
  featured?: boolean;
  badgeText?: string;
}

export interface CartItem {
  cartKey: string;
  product: Product;
  quantity: number;
  giftMessage?: string;
  deliveryDate?: string;
}

export interface CategoryShowcase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  filterKey: SpecialtyKey;
  actionType: 'shop' | 'contact';
}

export interface OccasionItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  ctaLabel: string;
  targetView: 'shop' | 'contact';
  filterKey?: SpecialtyKey;
  inquiryTopic?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  collection: 'Roses & Bouquets' | 'Hatboxes & Hampers' | 'Weddings & Events';
  aspectClass?: string;
}

export interface ConfirmedOrder {
  reference: string;
  createdAt: string;
  fulfillment: 'delivery' | 'collection';
  deliveryDate: string;
  timeWindow: string;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  recipientName?: string;
  recipientPhone?: string;
  deliveryAddress?: string;
  suburb?: string;
  cardMessage?: string;
  specialInstructions?: string;
  items: CartItem[];
  subtotalZAR: number;
}
