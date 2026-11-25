import React from 'react';
import { ArrowRight, Check, MapPin, Star } from 'lucide-react';
import { BRAND_STORY, BUSINESS_INFO } from '../data/noniseData';
import { PageView } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RevealSection } from '../components/RevealSection';
import { EditorialImage } from '../components/EditorialImage';

interface AboutPageProps {
  onNavigate: (view: PageView) => void;
  onStartInquiry: (topic: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onStartInquiry }) => {
  return (
    <div className="bg-[#FDFBF7]">
      {/* Editorial Intro */}
      <section className="bg-[#F7EFE3]/75 border-b border-[#EFE8DC]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <RevealSection immediate className="lg:col-span-7 space-y-5">
              <Breadcrumbs
                items={[
                  { label: 'Home', route: { view: 'home' } },
                  { label: 'About Us' },
                ]}
                className="mb-1"
              />
              <p className="eyebrow text-[#3E5B42]">About Nonise Florist</p>
              <h1 className="font-editorial text-[36px] sm:text-[46px] font-semibold leading-[1.15] text-[#2F1B2E]">
                A Legacy of Love, Crafted Fresh in Pietermaritzburg
              </h1>
              <p className="text-[16px] leading-[1.75] text-[#3D3A39]">{BRAND_STORY.whoWeAre}</p>
              <div className="pt-2 flex items-center gap-2 text-[14px] font-medium text-[#2F1B2E]">
                <Star className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" aria-hidden="true" />
                <span>Five-star customer rating for fresh flowers &amp; on-time delivery</span>
              </div>
            </RevealSection>

            <div className="lg:col-span-5">
              <EditorialImage
                src="/assets/nonise/about-feature.webp"
                alt="Romantic pink rose and tulip floral hatbox crafted by Nonise Florist"
                sizes="(min-width: 1024px) 42vw, 100vw"
                immediate
                loading="eager"
                hoverZoom={false}
                delayMs={90}
                wrapperClassName="aspect-[4/5] rounded-sm border border-[#EFE8DC] bg-white shadow-[0_12px_32px_-4px_rgba(47,27,46,0.08)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Director & Vision / Mission */}
      <section className="py-16 md:py-20 border-b border-[#EFE8DC]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <RevealSection className="lg:col-span-5 space-y-4">
            <EditorialImage
              src="/assets/nonise/nokwanda-mthembu.webp"
              alt="Mrs. Nokwanda Mthembu, founder and lead florist at Nonise Florist"
              sizes="(min-width: 1024px) 42vw, 100vw"
              wrapperClassName="aspect-[4/3] rounded-sm border border-[#EFE8DC] bg-white shadow-[0_12px_32px_-4px_rgba(47,27,46,0.08)]"
              hoverZoom={false}
            />
            <p className="text-[12px] text-[#8B7073]">
              Mrs. Nokwanda Mthembu, founder &amp; lead florist.
            </p>
            <p className="eyebrow text-[#AB274A]">Leadership &amp; Founder</p>
            <h2 className="font-editorial text-[30px] sm:text-[34px] font-medium text-[#2F1B2E] leading-tight">
              {BUSINESS_INFO.director}
            </h2>
            <p className="text-[15px] leading-[1.75] text-[#3D3A39]">{BRAND_STORY.directorBio}</p>
            <div className="pt-4 border-t border-[#EFE8DC]">
              <p className="font-editorial italic text-[20px] text-[#2F1B2E]">
                &ldquo;{BUSINESS_INFO.promise}&rdquo;
              </p>
            </div>
          </RevealSection>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <RevealSection delayMs={0} className="h-full">
              <div className="h-full bg-white border border-[#EFE8DC] rounded-sm p-7 space-y-3">
                <p className="eyebrow text-[#AB274A]">Our Mission</p>
                <h3 className="font-editorial text-[24px] text-[#2F1B2E]">
                  Love, Passion &amp; Kindness
                </h3>
                <p className="text-[14px] leading-[1.7] text-[#584144]">{BRAND_STORY.mission}</p>
              </div>
            </RevealSection>

            <RevealSection delayMs={80} className="h-full">
              <div className="h-full bg-white border border-[#EFE8DC] rounded-sm p-7 space-y-3">
                <p className="eyebrow text-[#3E5B42]">Our Vision</p>
                <h3 className="font-editorial text-[24px] text-[#2F1B2E]">
                  Pietermaritzburg’s Most Trusted Florist
                </h3>
                <p className="text-[14px] leading-[1.7] text-[#584144]">{BRAND_STORY.vision}</p>
              </div>
            </RevealSection>

            <RevealSection delayMs={140} className="sm:col-span-2">
              <div className="bg-[#2F1B2E] text-[#F7EFE3] rounded-sm p-7 space-y-3">
                <p className="eyebrow text-[#C5A059]">Looking Ahead</p>
                <h3 className="font-editorial text-[24px] text-white">
                  Expanding Into a Full-Service Event Showhouse
                </h3>
                <p className="text-[14px] leading-[1.7] text-[#E4DCE1]">
                  {BRAND_STORY.futureHorizon} {BRAND_STORY.eventPromise}
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Complete Floristry Services */}
      <section className="py-16 md:py-20 bg-[#F5F3EF]/60 border-b border-[#EFE8DC]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <RevealSection className="lg:col-span-6 space-y-5">
            <p className="eyebrow text-[#3E5B42]">What We Craft</p>
            <h2 className="font-editorial text-[30px] sm:text-[36px] font-medium text-[#2F1B2E]">
              Full-Spectrum Floristry &amp; Gifting
            </h2>
            <p className="text-[15px] text-[#584144] leading-relaxed">
              From intimate everyday gestures to grand celebrations and compassionate remembrance
              tributes, every stem is arranged with care in our Pietermaritzburg studio.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {BRAND_STORY.services.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-2.5 text-[14px] font-medium text-[#2F1B2E]"
                >
                  <Check
                    className="w-4 h-4 text-[#3E5B42] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="btn-editorial inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#D84A6A] text-white text-[14px] font-semibold hover:bg-[#C43D5C] cursor-pointer"
              >
                <span>Shop Online</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onStartInquiry('Event or Bespoke Consultation')}
                className="btn-editorial inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-[#2F1B2E] text-[#2F1B2E] text-[14px] font-semibold hover:bg-[#2F1B2E] hover:text-white cursor-pointer"
              >
                <span>Book a Consultation</span>
              </button>
            </div>
          </RevealSection>

          <div className="lg:col-span-6">
            <EditorialImage
              src="/assets/nonise/gallery-10.webp"
              alt="Wedding reception floral runner created by Nonise Florist"
              sizes="(min-width: 1024px) 50vw, 100vw"
              hoverZoom={false}
              delayMs={90}
              wrapperClassName="aspect-[16/11] rounded-sm border border-[#EFE8DC] bg-white"
            />
            <RevealSection delayMs={140}>
              <p className="mt-3 text-[13px] text-[#584144] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3E5B42]" aria-hidden="true" />
                <span>Visit us at {BUSINESS_INFO.fullAddress}</span>
              </p>
            </RevealSection>
          </div>
        </div>
      </section>
    </div>
  );
};
