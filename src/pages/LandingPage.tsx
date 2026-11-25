import React from 'react';
import { ArrowRight, Check, MapPin, Phone } from 'lucide-react';
import { BUSINESS_INFO, PRODUCTS } from '../data/noniseData';
import { LANDING_PAGES, LandingPageConfig } from '../data/landingPages';
import { RouteState, pathFor } from '../lib/routes';
import { Product } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EditorialImage } from '../components/EditorialImage';
import { ProductCard } from '../components/ProductCard';
import { RevealSection } from '../components/RevealSection';

interface LandingPageProps {
  config: LandingPageConfig;
  onNavigateRoute: (route: RouteState) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onStartInquiry: (topic: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  config,
  onNavigateRoute,
  onSelectProduct,
  onQuickAdd,
  onStartInquiry,
}) => {
  const relatedProducts = PRODUCTS.filter((product) =>
    config.relatedProductSlugs.includes(product.slug)
  );
  const otherLandings = Object.values(LANDING_PAGES).filter(
    (page) => page.slug !== config.slug
  );

  return (
    <div className="bg-[#FDFBF7]">
      <section className="bg-[#F7EFE3]/70 border-b border-[#EFE8DC]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: 'Home', route: { view: 'home' } },
              { label: 'Shop', route: { view: 'shop', specialty: 'all' } },
              { label: config.breadcrumbLabel },
            ]}
            onNavigateRoute={onNavigateRoute}
            className="mb-6"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <RevealSection immediate className="lg:col-span-6 space-y-4">
              <p className="eyebrow text-[#3E5B42]">Pietermaritzburg Florist</p>
              <h1 className="font-editorial text-[34px] sm:text-[44px] font-semibold text-[#2F1B2E] leading-tight">
                {config.h1}
              </h1>
              <p className="text-[15px] sm:text-[16px] text-[#584144] leading-relaxed max-w-xl">
                {config.intro}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onStartInquiry(config.inquiryTopic)}
                  className="btn-editorial inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[#AB274A] text-white text-[13px] font-semibold tracking-[0.04em] hover:bg-[#931E3E] cursor-pointer"
                >
                  <span>{config.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <a
                  href={pathFor({ view: 'shop', specialty: 'all' })}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigateRoute({ view: 'shop', specialty: 'all' });
                  }}
                  className="btn-editorial inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-[#2F1B2E] text-[#2F1B2E] text-[13px] font-semibold tracking-[0.04em] hover:bg-[#2F1B2E] hover:text-white cursor-pointer"
                >
                  Browse the Collection
                </a>
              </div>
            </RevealSection>

            <RevealSection immediate delayMs={80} className="lg:col-span-6">
              <EditorialImage
                src={config.heroImage}
                alt={config.heroImageAlt}
                sizes="(min-width: 1024px) 50vw, 100vw"
                wrapperClassName="aspect-[4/3] rounded-sm border border-[#EFE8DC]"
                loading="eager"
                immediate
              />
            </RevealSection>
          </div>
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-8 space-y-8">
            {config.sections.map((section) => (
              <RevealSection key={section.heading} className="space-y-2">
                <h2 className="font-editorial text-[24px] sm:text-[28px] text-[#2F1B2E] leading-snug">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-[15px] leading-relaxed text-[#584144]"
                  >
                    {paragraph}
                  </p>
                ))}
              </RevealSection>
            ))}

            {config.faqs.length > 0 && (
              <RevealSection className="space-y-3 pt-2">
                <h2 className="font-editorial text-[24px] sm:text-[28px] text-[#2F1B2E] leading-snug">
                  Frequently Asked Questions
                </h2>
                <div className="divide-y divide-[#EFE8DC] border-t border-[#EFE8DC]">
                  {config.faqs.map((faq) => (
                    <div key={faq.question} className="py-4">
                      <h3 className="font-editorial text-[18px] sm:text-[20px] text-[#2F1B2E] leading-snug">
                        {faq.question}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-[#584144]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </RevealSection>
            )}
          </div>

          <aside className="lg:col-span-4">
            <RevealSection className="bg-white border border-[#EFE8DC] rounded-sm p-6 sm:p-7 space-y-5 lg:sticky lg:top-24">
              <div>
                <p className="eyebrow text-[#AB274A]">What We Offer</p>
                <ul className="mt-3 space-y-2.5">
                  {config.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-[14px] text-[#3D3A39]">
                      <Check className="w-4 h-4 text-[#3E5B42] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-[#EFE8DC] space-y-2 text-[13px] text-[#584144]">
                <p className="inline-flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#48654C] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    {BUSINESS_INFO.addressLine1}, {BUSINESS_INFO.city}
                  </span>
                </p>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 font-medium text-[#2F1B2E] hover:text-[#AB274A] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#48654C] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
              <button
                type="button"
                onClick={() => onStartInquiry(config.inquiryTopic)}
                className="btn-editorial w-full px-5 py-3 rounded-sm bg-[#2F1B2E] text-white text-[13px] font-semibold tracking-[0.04em] hover:bg-[#1F1020] cursor-pointer"
              >
                {config.ctaLabel}
              </button>
            </RevealSection>
          </aside>
        </div>
      </section>

      {config.gallery && config.gallery.length > 0 && (
        <section className="bg-[#FBF9F5] border-y border-[#EFE8DC]">
          <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
            <RevealSection className="max-w-2xl mb-8">
              <p className="eyebrow text-[#3E5B42]">Portfolio</p>
              <h2 className="font-editorial text-[28px] sm:text-[34px] text-[#2F1B2E] mt-1">
                {config.galleryHeading ?? 'Design Inspiration'}
              </h2>
            </RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.gallery.map((item, index) => (
                <RevealSection key={item.src} delayMs={(index % 3) * 75} className="h-full">
                  <figure className="card-floral h-full bg-white border border-[#EFE8DC] rounded-sm overflow-hidden flex flex-col">
                    <EditorialImage
                      src={item.src}
                      alt={item.alt}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      wrapperClassName="aspect-[4/3] w-full bg-[#F5F3EF]"
                      delayMs={(index % 3) * 75}
                    />
                    <figcaption className="p-4 sm:p-5 font-editorial text-[18px] text-[#2F1B2E] leading-snug">
                      {item.caption}
                    </figcaption>
                  </figure>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="bg-[#FBF9F5] border-y border-[#EFE8DC]">
          <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="eyebrow text-[#3E5B42]">Ready to Order</p>
                <h2 className="font-editorial text-[28px] sm:text-[34px] text-[#2F1B2E] mt-1">
                  Signature Arrangements
                </h2>
              </div>
              <a
                href={pathFor({ view: 'shop', specialty: 'all' })}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigateRoute({ view: 'shop', specialty: 'all' });
                }}
                className="link-gold inline-flex items-center gap-1.5 text-[#2F1B2E] hover:text-[#AB274A]"
              >
                <span>View all arrangements</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onQuickAdd={onQuickAdd}
                  revealDelayMs={index * 65}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
        <RevealSection className="bg-[#2F1B2E] text-[#F7EFE3] rounded-sm p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-2">
            <p className="eyebrow text-[#C5A059]">Explore More</p>
            <h2 className="font-editorial text-[26px] sm:text-[32px] text-white leading-tight">
              Flowers for Every Occasion in Pietermaritzburg
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#E4DCE1] leading-relaxed max-w-2xl">
              Browse our related services or speak with the studio about a bespoke design.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {otherLandings.map((page) => (
              <a
                key={page.slug}
                href={page.path}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigateRoute({ view: 'landing', landingSlug: page.slug });
                }}
                className="inline-flex items-center justify-between gap-3 border border-[#C5A059]/40 rounded-sm px-4 py-2.5 text-[13px] font-semibold text-[#F7EFE3] hover:bg-white/5 transition-colors"
              >
                <span>{page.breadcrumbLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </RevealSection>
      </section>
    </div>
  );
};
