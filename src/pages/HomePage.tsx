import React from 'react';
import { ArrowRight, MapPin, Phone, Star } from 'lucide-react';
import {
  BRAND_STORY,
  BUSINESS_INFO,
  OCCASIONS,
  SPECIALTY_CATEGORIES,
} from '../data/noniseData';
import { LANDING_LINKS, LANDING_PAGES } from '../data/landingPages';
import { PageView, SpecialtyKey } from '../types';
import { RouteState, pathFor } from '../lib/routes';
import { LivingBloomHero } from '../components/LivingBloomHero';
import { SocialsSection } from '../components/SocialsSection';
import { RevealSection } from '../components/RevealSection';
import { EditorialImage } from '../components/EditorialImage';

interface HomePageProps {
  onNavigate: (view: PageView, sectionId?: string) => void;
  onNavigateRoute?: (route: RouteState) => void;
  onSelectCategory: (filter: SpecialtyKey) => void;
  onStartInquiry: (topic: string) => void;
}

/* Delicate botanical fine-line illustrations for the three editorial service columns */
const WeddingBouquetEmblem: React.FC = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    aria-hidden="true"
    className="mx-auto text-[#48654C]"
  >
    <path
      d="M28 47V22M28 33C23 31 19 26.5 18 21.5M28 36C33.5 34 37.5 29.5 38.5 24.5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M28 11C24.5 14 24.5 19.5 28 22.5C31.5 19.5 31.5 14 28 11Z"
      stroke="#C5A059"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M21 15.5C19.5 19.5 21.8 23.5 25.8 24.2C26.5 20.2 24.5 16.5 21 15.5Z"
      stroke="#AB274A"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M35 15.5C36.5 19.5 34.2 23.5 30.2 24.2C29.5 20.2 31.5 16.5 35 15.5Z"
      stroke="#AB274A"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M23.5 41.5C26.5 40.2 29.5 40.2 32.5 41.5"
      stroke="#C5A059"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

const CelebrationBloomEmblem: React.FC = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    aria-hidden="true"
    className="mx-auto text-[#48654C]"
  >
    <path d="M28 47V25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    <path
      d="M28 38C22.5 37.5 19 34 18.5 30C22.5 30.2 26 32.8 28 38Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M28 34.5C33.5 34 37 30.5 37.5 26.5C33.5 26.8 30 29.2 28 34.5Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <circle cx="28" cy="18.5" r="3" stroke="#C5A059" strokeWidth="1.25" />
    <path
      d="M28 11.5C29.8 13.4 29.8 15.2 28 15.5C26.2 15.2 26.2 13.4 28 11.5Z"
      stroke="#AB274A"
      strokeWidth="1.25"
    />
    <path
      d="M21 18.5C22.9 16.7 24.7 16.7 25 18.5C24.7 20.3 22.9 20.3 21 18.5Z"
      stroke="#AB274A"
      strokeWidth="1.25"
    />
    <path
      d="M35 18.5C33.1 16.7 31.3 16.7 31 18.5C31.3 20.3 33.1 20.3 35 18.5Z"
      stroke="#AB274A"
      strokeWidth="1.25"
    />
    <path
      d="M23 13.5C25.2 14 26 15.2 25.8 16.3M33 13.5C30.8 14 30 15.2 30.2 16.3"
      stroke="#C5A059"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const CorporateFloralEmblem: React.FC = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    aria-hidden="true"
    className="mx-auto text-[#48654C]"
  >
    <path
      d="M21 31H35L33 45.5H23L21 31Z"
      stroke="#2F1B2E"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path d="M19.5 31H36.5" stroke="#C5A059" strokeWidth="1.25" strokeLinecap="round" />
    <path
      d="M28 31V14M28 24C24.2 22.2 22 19.2 21.5 16M28 26C31.8 24.2 34 21.2 34.5 18"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M28 10.5C25.5 13 25.5 16.5 28 18.5C30.5 16.5 30.5 13 28 10.5Z"
      stroke="#AB274A"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <circle cx="21.5" cy="14.5" r="2" stroke="#C5A059" strokeWidth="1.2" />
    <circle cx="34.5" cy="16.5" r="2" stroke="#C5A059" strokeWidth="1.2" />
  </svg>
);

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onNavigateRoute,
  onSelectCategory,
  onStartInquiry,
}) => {
  const serviceHighlights = [
    {
      id: 'weddings',
      title: 'Weddings',
      description: 'Wedding flowers designed to make your special day bloom.',
      icon: <WeddingBouquetEmblem />,
      linkLabel: 'Explore Weddings',
      onClick: () => onStartInquiry('Wedding Flowers & Bridal Styling'),
    },
    {
      id: 'events',
      title: 'Events & Celebrations',
      description: 'Beautiful floral arrangements for birthdays, parties and celebrations.',
      icon: <CelebrationBloomEmblem />,
      linkLabel: 'Explore Celebrations',
      onClick: () => onNavigate('home', 'occasions'),
    },
    {
      id: 'corporate',
      title: 'Corporate Flowers',
      description:
        'Thoughtful floral arrangements for corporate functions and business occasions.',
      icon: <CorporateFloralEmblem />,
      linkLabel: 'Enquire for Business',
      onClick: () => onStartInquiry('Corporate & Business Function Florals'),
    },
  ];

  return (
    <div className="bg-[#FBF9F5]">
      {/* 1. PREMIUM INTERACTIVE HERO — THE LIVING BLOOM */}
      <LivingBloomHero
        onShopNow={() => onNavigate('shop')}
        onDiscoverStory={() => onNavigate('about')}
      />

      {/* 2. REFINED SPECIALTIES SECTION */}
      <section id="categories" className="py-16 md:py-20 lg:py-24 border-b border-[#EFE8DC]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
            <div>
              <p className="eyebrow text-[#48654C]">Our Specialties</p>
              <h2 className="font-editorial text-[28px] sm:text-[36px] lg:text-[40px] font-medium leading-tight tracking-[-0.01em] text-[#2F1B2E] mt-2">
                Elegant &amp; Premium, Where Beauty Blooms
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="link-gold text-[#2F1B2E] hover:text-[#AB274A] self-start md:self-auto cursor-pointer"
            >
              <span>Explore the Shop</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALTY_CATEGORIES.map((category, idx) => (
              <RevealSection key={category.id} delayMs={idx * 75}>
                <a
                  href={
                    category.actionType === 'contact'
                      ? '/contact'
                      : pathFor({ view: 'shop', specialty: category.filterKey ?? 'all' })
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    if (category.actionType === 'contact') {
                      onStartInquiry('Weddings & Events Floral Styling');
                    } else {
                      onSelectCategory(category.filterKey ?? 'all');
                    }
                  }}
                  className="group relative w-full text-left rounded-sm overflow-hidden border border-[#EFE8DC] bg-[#2F1B2E] aspect-[4/5] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-8px_rgba(47,27,46,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48654C] cursor-pointer block"
                >
                  <EditorialImage
                    src={category.image}
                    alt={category.title}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    wrapperClassName="w-full h-full"
                    imgClassName="w-full h-full object-cover opacity-95"
                    delayMs={idx * 75}
                    hoverZoom
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2F1B2E]/90 via-[#2F1B2E]/35 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                      <p className="eyebrow text-[#E8D5B0]">{category.subtitle}</p>
                      <h3 className="font-editorial text-[22px] font-medium leading-snug mt-1">
                        {category.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-[#F2ECEF] mt-2 line-clamp-2">
                        {category.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#E8D5B0] group-hover:translate-x-1 transition-transform duration-300">
                        {category.actionType === 'contact' ? 'Enquire Now' : 'Explore'}
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </EditorialImage>
                </a>
              </RevealSection>
            ))}
          </div>

          <RevealSection delayMs={120} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <span className="eyebrow text-[#48654C]">Popular services</span>
            {LANDING_LINKS.map((link) => {
              const href = LANDING_PAGES[link.slug].path;
              return (
                <a
                  key={link.slug}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateRoute) {
                      onNavigateRoute({ view: 'landing', landingSlug: link.slug });
                    } else {
                      window.location.href = href;
                    }
                  }}
                  className="link-gold text-[#2F1B2E] hover:text-[#AB274A] cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              );
            })}
          </RevealSection>
        </div>
      </section>

      {/* 3. SHORT ABOUT NONISE INTRODUCTION + THREE EDITORIAL SERVICE HIGHLIGHTS */}
      <section className="py-20 md:py-24 lg:py-28 bg-[#F7EFE3]/70 border-b border-[#EFE8DC]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
          <RevealSection className="max-w-[680px] mx-auto text-center">
            <p className="eyebrow text-[#48654C]">More Than Flowers</p>
            <div className="w-10 h-[1px] bg-[#C5A059] mx-auto mt-3 mb-5" aria-hidden="true" />

            <h2 className="font-editorial text-[32px] sm:text-[40px] lg:text-[46px] font-medium leading-[1.16] tracking-[-0.015em] text-[#2F1B2E]">
              Beautiful Flowers. Meaningful Moments.
            </h2>

            <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.75] text-[#584144] max-w-[54ch] mx-auto">
              Rooted in family legacy, Nonise Florist brings beauty, love and thoughtful floral
              craftsmanship to life&apos;s special occasions.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="btn-editorial inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[46px] rounded-sm bg-[#AB274A] text-white text-[14px] font-semibold tracking-[0.04em] hover:bg-[#931E3E] cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="link-gold text-[#2F1B2E] hover:text-[#AB274A] cursor-pointer"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </RevealSection>

          <div className="my-14 md:my-16 border-t border-[#EFE8DC]" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {serviceHighlights.map((service, idx) => (
              <RevealSection key={service.id} delayMs={idx * 85} className="h-full">
                <div className="group h-full text-center flex flex-col items-center justify-between px-2 sm:px-4">
                  <div className="flex flex-col items-center">
                    <div className="mb-4 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                      {service.icon}
                    </div>
                    <h3 className="font-editorial italic text-[24px] sm:text-[26px] font-medium text-[#2F1B2E] leading-snug">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.7] text-[#584144] max-w-[30ch]">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={service.onClick}
                      className="link-gold text-[#2F1B2E] hover:text-[#AB274A] cursor-pointer"
                    >
                      <span>{service.linkLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AUTHENTIC FLORAL & OCCASIONS SHOWCASE */}
      <section
        id="occasions"
        className="py-16 md:py-20 lg:py-24 bg-[#F5F3EF]/60 border-b border-[#EFE8DC]"
      >
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#48654C]">For Every Life Moment</p>
              <h2 className="font-editorial text-[28px] sm:text-[36px] lg:text-[40px] font-medium leading-tight tracking-[-0.01em] text-[#2F1B2E] mt-2">
                Thoughtful Floristry Across Every Occasion
              </h2>
              <p className="text-[15px] text-[#584144] mt-2.5 leading-relaxed">
                {BRAND_STORY.eventPromise}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className="link-gold text-[#2F1B2E] hover:text-[#AB274A] self-start md:self-auto cursor-pointer"
            >
              <span>View Floral Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OCCASIONS.map((item, idx) => (
              <RevealSection key={item.id} delayMs={(idx % 3) * 75} className="h-full">
                <article className="group card-floral rounded-sm overflow-hidden flex flex-col h-full">
                  <EditorialImage
                    src={item.image}
                    alt={item.title}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    wrapperClassName="aspect-[16/10] w-full bg-[#F5F3EF]"
                    delayMs={(idx % 3) * 75}
                    hoverZoom
                  />
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="font-editorial text-[22px] font-medium text-[#2F1B2E]">
                        {item.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-[#584144] mt-2">
                        {item.summary}
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          if (item.targetView === 'shop') {
                            onSelectCategory(item.filterKey ?? 'all');
                          } else {
                            onStartInquiry(item.inquiryTopic ?? item.title);
                          }
                        }}
                        className="link-gold text-[#2F1B2E] hover:text-[#AB274A] cursor-pointer"
                      >
                        <span>{item.ctaLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CUSTOM BOUQUETS & HAMPERS */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#FBF9F5] border-b border-[#EFE8DC]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <RevealSection className="lg:col-span-6">
            <EditorialImage
              src="/assets/nonise/gallery-4.webp"
              alt="Hand-tied custom pink celebration bouquet by Nonise Florist"
              sizes="(min-width: 1024px) 48vw, 100vw"
              wrapperClassName="aspect-[4/5] rounded-sm border border-[#EFE8DC] bg-white shadow-[0_12px_32px_-4px_rgba(47,27,46,0.08)]"
            />
          </RevealSection>

          <RevealSection delayMs={80} className="lg:col-span-6 space-y-5">
            <p className="eyebrow text-[#48654C]">Custom Bouquets &amp; Hampers</p>
            <h2 className="font-editorial text-[30px] sm:text-[38px] lg:text-[42px] font-medium leading-tight tracking-[-0.01em] text-[#2F1B2E]">
              Your Flowers, Your Way
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#584144] max-w-xl">
              Choose the stems, colours, size and budget. Our florists hand-tie every custom bouquet
              in the Pietermaritzburg studio, and can pair it with chocolates, champagne or a curated
              gift hamper.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (onNavigateRoute) {
                    onNavigateRoute({ view: 'landing', landingSlug: 'custom-bouquets' });
                  } else {
                    window.location.href = '/custom-bouquets';
                  }
                }}
                className="btn-editorial inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-sm bg-[#AB274A] text-white text-[13px] font-semibold tracking-[0.04em] hover:bg-[#931E3E] cursor-pointer"
              >
                <span>Explore Custom Bouquets</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onSelectCategory('hampers')}
                className="link-gold text-[#2F1B2E] hover:text-[#AB274A] cursor-pointer"
              >
                <span>Shop Hampers</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 6. SOCIALS SHOWCASE */}
      <SocialsSection />

      {/* 7. REFINED STUDIO CONTACT & CONCIERGE INVITATION */}
      <section className="py-16 md:py-20 bg-[#FBF9F5] border-t border-[#EFE8DC]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="bg-white border border-[#EFE8DC] rounded-sm p-8 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <RevealSection className="lg:col-span-7 space-y-4">
              <div
                className="flex items-center gap-1 text-[#C5A059]"
                aria-label="Five-star rated florist"
              >
                {[0, 1, 2, 3, 4].map((idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 fill-[#C5A059] text-[#C5A059]"
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-2 eyebrow text-[#48654C]">Pietermaritzburg Studio</span>
              </div>

              <h2 className="font-editorial text-[26px] sm:text-[34px] font-medium leading-tight text-[#2F1B2E]">
                Visit Our Boutique or Speak With Our Florists
              </h2>

              <p className="text-[15px] leading-relaxed text-[#584144]">
                {BRAND_STORY.reputation} Every bespoke order is personally overseen from our
                studio on Peter Kerchhoff Street.
              </p>

              <div className="pt-1 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[#3D3A39]">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#48654C] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.addressLine1}, Pietermaritzburg</span>
                </span>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 font-medium text-[#2F1B2E] hover:text-[#AB274A] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#48654C] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </RevealSection>

            <RevealSection
              delayMs={100}
              className="lg:col-span-5 lg:border-l lg:border-[#EFE8DC] lg:pl-10 space-y-5"
            >
              <div>
                <p className="eyebrow text-[#AB274A]">Bespoke Floristry</p>
                <p className="font-editorial text-[22px] text-[#2F1B2E] mt-1">
                  Planning a Wedding, Tribute, or Custom Gift?
                </p>
                <p className="text-[14px] text-[#584144] mt-1.5 leading-relaxed">
                  Custom monogram bouquets, curated gift hampers, funeral coffin sprays, and
                  event installations crafted to your palette.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onStartInquiry('Custom Bouquet or Event Consultation')}
                  className="btn-editorial px-5 py-3 rounded-sm bg-[#AB274A] text-white text-[13px] font-semibold tracking-[0.04em] hover:bg-[#931E3E] cursor-pointer"
                >
                  Request Custom Quote
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="btn-editorial px-5 py-3 rounded-sm border border-[#2F1B2E] text-[#2F1B2E] text-[13px] font-semibold tracking-[0.04em] hover:bg-[#2F1B2E] hover:text-white cursor-pointer"
                >
                  Contact Boutique
                </button>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>
    </div>
  );
};
