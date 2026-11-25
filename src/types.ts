export type PageView =
  | 'home'
  | 'shop'
  | 'product'
  | 'gallery'
  | 'about'
  | 'contact'
  | 'checkout'
  | 'landing';

export type SpecialtyKey =
  | 'all'
  | 'box-arrangements'
  | 'funeral-flowers'
  | 'funeral-package-sets'
  | 'hampers'
  | 'mixed-bouquets'
  | 'protea-bouquets'
  | 'rose-bouquets'
  | 'vase-arrangements'
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
  altText?: string;
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

export type GalleryCollection =
  | 'Rose Bouquets'
  | 'Mixed Bouquets'
  | 'Protea Bouquets'
  | 'Vase Arrangements'
  | 'Box Arrangements'
  | 'Gift Hampers'
  | 'Funeral & Sympathy'
  | 'Weddings & Events';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  alt?: string;
  collection: GalleryCollection;
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
  addons?: CheckoutAddon[];
  subtotalZAR: number;
  totalZAR: number;
}

export interface CheckoutAddon {
  id: string;
  label: string;
  priceZAR: number;
  /** Studio price list quotes this add-on as "from" this amount. */
  fromPrice?: boolean;
}
