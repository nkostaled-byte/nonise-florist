import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
} from 'lucide-react';
import { BUSINESS_INFO, PRODUCTS, formatZAR } from '../data/noniseData';
import { responsiveImage } from '../lib/imageManifest';
import { Product } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { RevealSection } from '../components/RevealSection';
import { RouteState } from '../lib/routes';

interface ProductDetailPageProps {
  product: Product;
  onBackToShop: () => void;
  onNavigateRoute?: (route: RouteState) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    options?: { giftMessage?: string; deliveryDate?: string; color?: string }
  ) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToShop,
  onNavigateRoute,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [giftMessage, setGiftMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [color, setColor] = useState(product.colorOptions?.[0] ?? '');
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<'delivery' | 'care' | null>('delivery');

  const [todayISO, setTodayISO] = useState('');
  useEffect(() => {
    setTodayISO(new Date().toISOString().split('T')[0]);
  }, []);
  const activeImageSrc = product.images[selectedImageIndex] ?? product.images[0];
  const activeImageAttrs = responsiveImage(activeImageSrc);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    onAddToCart(product, quantity, {
      giftMessage: giftMessage.trim() || undefined,
      deliveryDate: deliveryDate || undefined,
      color: color || undefined,
    });
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <div className="bg-[#FDFBF7]">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#EFE8DC] bg-white">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-4 flex items-center justify-between gap-4 text-[13px]">
          <button
            type="button"
            onClick={onBackToShop}
            className="group inline-flex items-center gap-2 text-[#584144] hover:text-[#2F1B2E] font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span>Back to Shop</span>
          </button>
          <Breadcrumbs
            items={[
              { label: 'Home', route: { view: 'home' } },
              { label: 'Shop', route: { view: 'shop', specialty: 'all' } },
              { label: product.name },
            ]}
            onNavigateRoute={onNavigateRoute}
            className="hidden sm:block"
          />
        </div>
      </div>

      {/* Main Contiguous Purchase Module */}
      <section className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Gallery */}
          <RevealSection immediate className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <div className="aspect-[4/5] w-full rounded-sm overflow-hidden border border-[#EFE8DC] bg-[#F5F3EF]">
              <img
                key={`${product.id}-${selectedImageIndex}`}
                {...activeImageAttrs}
                src={activeImageSrc}
                alt={product.altText || product.name}
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="eager"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover pdp-image-swap"
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((imgSrc, idx) => (
                  <button
                    key={imgSrc}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`View image ${idx + 1} of ${product.name}`}
                    className={`btn-editorial aspect-square rounded-sm overflow-hidden border-2 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#D84A6A] opacity-100'
                        : 'border-[#EFE8DC] opacity-80 hover:opacity-100 hover:border-[#C5A059]'
                    }`}
                  >
                    <img
                      {...responsiveImage(imgSrc)}
                      src={imgSrc}
                      alt={`${product.altText || product.name} angle ${idx + 1}`}
                      sizes="(min-width: 1024px) 12vw, 25vw"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </RevealSection>

          {/* Right Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            <RevealSection immediate delayMs={65} className="space-y-3 pb-6 border-b border-[#EFE8DC]">
              <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#584144]">
                <span>{product.wooCategory}</span>
                <span aria-hidden="true" className="text-[#C5A059]">
                  &middot;
                </span>
                <span className="text-[#3E5B42]">
                  {product.inStock ? 'Fresh to Order' : 'Currently Unavailable'}
                </span>
              </div>

              <h1 className="font-editorial text-[32px] sm:text-[40px] font-semibold leading-tight text-[#2F1B2E]">
                {product.name}
              </h1>

              <p className="text-[24px] font-semibold text-[#1B1C1A] tabular-price">
                {formatZAR(product.priceZAR)}
              </p>

              <p className="text-[15px] leading-[1.7] text-[#3D3A39] pt-1">
                {product.description}
              </p>
            </RevealSection>

            <RevealSection immediate delayMs={130} className="space-y-6">
              {/* Included Details */}
              <div className="space-y-2.5">
                <p className="eyebrow text-[#3E5B42]">Presentation &amp; Highlights</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14px] text-[#3D3A39]">
                  {product.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-[#3E5B42] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optional Delivery Date & Handwritten Card Message */}
              <div className="p-5 bg-white border border-[#EFE8DC] rounded-sm space-y-4">
                <div>
                  <label
                    htmlFor="pdp-delivery-date"
                    className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                  >
                    Preferred Delivery / Collection Date (Optional)
                  </label>
                  <div className="relative">
                    <Calendar
                      className="w-4 h-4 text-[#8B7073] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="pdp-delivery-date"
                      type="date"
                      min={todayISO || undefined}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="input-editorial w-full pl-10 pr-4 py-2.5 text-[14px] bg-[#FDFBF7] border border-[#EFE8DC] rounded-sm text-[#1B1C1A] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <p className="text-[12px] text-[#584144] mt-1">
                    Deliveries run Mon–Fri (8:00–16:30) and Sat (8:00–13:00) in Pietermaritzburg.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="pdp-gift-note"
                    className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                  >
                    Complimentary Gift Card Message (Optional)
                  </label>
                  <textarea
                    id="pdp-gift-note"
                    rows={2}
                    maxLength={220}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Write a personal note to accompany your flowers..."
                    className="input-editorial w-full px-3.5 py-2.5 text-[14px] bg-[#FDFBF7] border border-[#EFE8DC] rounded-sm text-[#1B1C1A] placeholder:text-[#8B7073] focus:bg-white focus:outline-none resize-none"
                  />
                </div>
              </div>

              {product.colorOptions && product.colorOptions.length > 0 && (
                <div className="pt-1">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5">
                    Rose Colour
                  </p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Rose colour">
                    {product.colorOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={color === option}
                        onClick={() => setColor(option)}
                        className={`px-4 py-2 min-h-[40px] rounded-sm border text-[13px] font-medium transition-colors cursor-pointer ${
                          color === option
                            ? 'border-[#3E5B42] bg-[#F3F6F1] text-[#2F1B2E]'
                            : 'border-[#EFE8DC] bg-white text-[#584144] hover:border-[#C5A059]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Primary Add to Bag CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <div className="inline-flex items-center justify-between sm:justify-center border border-[#EFE8DC] bg-white rounded-sm min-h-[50px]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-12 h-full inline-flex items-center justify-center text-[#2F1B2E] hover:bg-[#F7EFE3] active:scale-95 transition-all cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-[15px] font-semibold text-[#1B1C1A] tabular-price">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-12 h-full inline-flex items-center justify-center text-[#2F1B2E] hover:bg-[#F7EFE3] active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`btn-editorial flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[50px] rounded-sm text-white text-[14px] font-semibold tracking-[0.04em] cursor-pointer ${
                    addedFeedback
                      ? 'bg-[#3E5B42]'
                      : 'bg-[#D84A6A] hover:bg-[#C43D5C]'
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                      <span className="tabular-price">
                        Add to Bag &middot; {formatZAR(product.priceZAR * quantity)}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Delivery & Care Accordions */}
              <div className="border-t border-[#EFE8DC] divide-y divide-[#EFE8DC] pt-2">
                <div>
                  <button
                    type="button"
                    aria-expanded={openAccordion === 'delivery'}
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'delivery' ? null : 'delivery')
                    }
                    className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-editorial text-[18px] text-[#2F1B2E]">
                      Pietermaritzburg Delivery &amp; Collection
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#584144] transition-transform duration-300 ease-out ${
                        openAccordion === 'delivery' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      openAccordion === 'delivery'
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-4 text-[14px] leading-relaxed text-[#584144] space-y-2">
                        <p>
                          Hand-delivered across Pietermaritzburg and surrounding areas, or collect
                          directly from our studio at{' '}
                          <strong className="text-[#2F1B2E]">{BUSINESS_INFO.fullAddress}</strong>.
                          Local delivery is a flat R100, free on orders from R2,500.
                        </p>
                        <p className="flex items-center gap-1.5 text-[#3E5B42] font-medium">
                          <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{BUSINESS_INFO.promise}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    aria-expanded={openAccordion === 'care'}
                    onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                    className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-editorial text-[18px] text-[#2F1B2E]">
                      Fresh Stem Care Guide
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#584144] transition-transform duration-300 ease-out ${
                        openAccordion === 'care' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      openAccordion === 'care'
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-4 text-[14px] leading-relaxed text-[#584144]">
                        Trim stems diagonally by 1–2 cm upon arrival, place in a clean vase filled
                        with cool fresh water, remove foliage sitting below the waterline, and
                        refresh water every two days away from direct afternoon heat.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Related Arrangements */}
      <section className="py-14 md:py-18 bg-[#F5F3EF]/60 border-t border-[#EFE8DC]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12">
          <RevealSection className="mb-8">
            <p className="eyebrow text-[#3E5B42]">You May Also Appreciate</p>
            <h2 className="font-editorial text-[28px] sm:text-[34px] font-medium text-[#2F1B2E] mt-1">
              More From Our Boutique
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related, idx) => (
              <ProductCard
                key={related.id}
                product={related}
                onSelectProduct={onSelectProduct}
                onQuickAdd={(p) => onAddToCart(p, 1)}
                revealDelayMs={idx * 70}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
