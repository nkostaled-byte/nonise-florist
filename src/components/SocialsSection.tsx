import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/noniseData';
import { SOCIAL_LINKS } from './SocialLinks';
import { RevealSection } from './RevealSection';

export const SocialsSection: React.FC = () => (
  <section id="socials" className="py-16 md:py-20 bg-[#FBF9F5] border-y border-[#EFE8DC]">
    <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12">
      <RevealSection className="max-w-2xl mb-9 lg:mb-11">
        <p className="eyebrow text-[#3E5B42]">Follow Our Blooms</p>
        <h2 className="font-editorial text-[28px] sm:text-[36px] lg:text-[40px] font-medium leading-tight tracking-[-0.01em] text-[#2F1B2E] mt-2">
          Fresh from the Studio
        </h2>
        <p className="text-[15px] leading-relaxed text-[#584144] mt-3">
          New bouquets, behind-the-scenes studio moments and event florals — follow{' '}
          {BUSINESS_INFO.name} and tag us in your blooms.
        </p>
      </RevealSection>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {SOCIAL_LINKS.map(({ label, handle, href, Icon }, index) => (
          <RevealSection key={label} delayMs={index * 70} className="h-full">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between bg-white border border-[#EFE8DC] rounded-sm p-6 sm:p-7 hover:border-[#C5A059] hover:shadow-[0_14px_30px_-18px_rgba(47,27,46,0.35)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F7EFE3] text-[#2F1B2E] group-hover:bg-[#2F1B2E] group-hover:text-[#C5A059] transition-colors">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="h-5 w-5 text-[#C5A059] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-8">
                <p className="eyebrow text-[#AB274A]">{label}</p>
                <p className="font-editorial text-[22px] text-[#2F1B2E] mt-1">{handle}</p>
                <p className="text-[13px] text-[#8B7073] mt-1">Follow along</p>
              </div>
            </a>
          </RevealSection>
        ))}
      </div>
    </div>
  </section>
);
