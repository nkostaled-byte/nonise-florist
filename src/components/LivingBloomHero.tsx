import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/noniseData';
import { responsiveImage } from '../lib/imageManifest';

interface LivingBloomHeroProps {
  onShopNow: () => void;
  onDiscoverStory: () => void;
}

const HERO_SRC = '/assets/nonise/hero.webp';
const HERO_IMAGE = responsiveImage(HERO_SRC);

/**
 * Homepage hero: the client-supplied studio photograph fills the section behind
 * the logo, tagline and primary actions. Static by design — no night layer,
 * cursor tracking, parallax or floating petals.
 */
export const LivingBloomHero: React.FC<LivingBloomHeroProps> = ({
  onShopNow,
  onDiscoverStory,
}) => (
  <section className="relative min-h-[600px] sm:min-h-[640px] lg:min-h-[min(86vh,780px)] flex items-center bg-[#FBF9F5] border-b border-[#EFE8DC] overflow-hidden">
    <img
      src={HERO_SRC}
      srcSet={HERO_IMAGE.srcSet}
      sizes="100vw"
      width={HERO_IMAGE.width}
      height={HERO_IMAGE.height}
      alt="Nonise Florist birthday flower box with pink roses, wine and Ferrero Rocher chocolates"
      loading="eager"
      decoding="async"
      fetchPriority="high"
      draggable={false}
      referrerPolicy="no-referrer"
      className="absolute inset-0 w-full h-full object-cover object-center hero-enter-bg"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 62% 58% at 50% 46%, rgba(251, 249, 245, 0.94) 0%, rgba(251, 249, 245, 0.82) 52%, rgba(251, 249, 245, 0.42) 82%, rgba(251, 249, 245, 0.18) 100%)',
      }}
    />

    <div className="relative z-10 w-full max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-16 sm:py-20">
      <div className="mx-auto max-w-[640px] text-center">
        <div className="hero-enter-logo mb-6 flex flex-col items-center gap-3">
          <p className="font-editorial italic text-[24px] sm:text-[30px] lg:text-[34px] leading-tight text-[#AB274A]">
            Let Beauty Bloom
          </p>
          <img
            src={BUSINESS_INFO.logo}
            alt="Nonise Florist — Let Beauty Bloom"
            width={320}
            height={320}
            loading="eager"
            decoding="sync"
            draggable={false}
            referrerPolicy="no-referrer"
            className="w-[104px] h-[104px] sm:w-[124px] sm:h-[124px] rounded-full object-contain select-none drop-shadow-[0_12px_28px_rgba(47,27,46,0.22)]"
          />
        </div>

        <h1 className="font-editorial text-[30px] sm:text-[38px] lg:text-[42px] font-semibold leading-[1.16] tracking-[-0.015em] text-[#2F1B2E] text-balance">
          <span className="block hero-enter-line-1">
            Pietermaritzburg flowers for moments
          </span>
          <span className="block hero-enter-line-2 italic font-normal text-[#AB274A] mt-1.5">
            that deserve more than words.
          </span>
        </h1>

        <div className="hero-enter-cta mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
          <button
            type="button"
            onClick={onShopNow}
            className="btn-editorial inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-sm bg-[#AB274A] text-white text-[13px] font-semibold tracking-[0.05em] hover:bg-[#931E3E] transition-colors duration-200 shadow-[0_10px_24px_-6px_rgba(47,27,46,0.34)] cursor-pointer"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onDiscoverStory}
            className="btn-editorial inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-sm bg-white/70 hover:bg-white border border-[#2F1B2E]/20 hover:border-[#AB274A]/45 text-[13px] font-semibold tracking-[0.04em] text-[#2F1B2E] hover:text-[#AB274A] shadow-[0_8px_20px_-6px_rgba(47,27,46,0.2)] cursor-pointer"
          >
            <span>Discover Our Story</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </section>
);
