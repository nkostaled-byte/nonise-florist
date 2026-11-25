import React, { useEffect, useState } from 'react';
import { Clock, Mail, MapPin, Phone, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/noniseData';
import { LANDING_LINKS, LANDING_PAGES } from '../data/landingPages';
import { PageView } from '../types';
import { RouteState, pathFor } from '../lib/routes';
import { RevealSection } from './RevealSection';
import { SocialIconLinks } from './SocialLinks';

interface FooterProps {
  onNavigate: (view: PageView, sectionId?: string) => void;
  onNavigateRoute?: (route: RouteState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onNavigateRoute }) => {
  const [policyModalOpen, setPolicyModalOpen] = useState(false);

  useEffect(() => {
    if (!policyModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPolicyModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [policyModalOpen]);

  return (
    <>
      <footer className="bg-[#2F1B2E] text-[#F7EFE3] border-t border-[#C5A059]/30">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/12">
            {/* Brand Heritage Column */}
            <RevealSection delayMs={0} className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3.5 group">
                <img
                  src={BUSINESS_INFO.logo}
                  alt="Nonise Florist Crest"
                  width={320}
                  height={320}
                  loading="lazy"
                  className="w-14 h-14 rounded-full object-cover border border-[#C5A059]/60 transition-transform duration-300 group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-editorial text-[24px] font-semibold text-white leading-tight">
                    {BUSINESS_INFO.name}
                  </p>
                  <p className="eyebrow text-[#C5A059] mt-0.5">{BUSINESS_INFO.tagline}</p>
                </div>
              </div>
              <p className="text-[14px] leading-relaxed text-[#E4DCE1] max-w-sm">
                Female-owned floral boutique in Pietermaritzburg founded and led by{' '}
                {BUSINESS_INFO.director}. Crafting fresh bouquets, luxury rose arrangements,
                weddings, events, and heartfelt tributes.
              </p>
              <p className="text-[13px] font-medium text-[#E8D5B0]">{BUSINESS_INFO.promise}</p>
            </RevealSection>

            {/* Navigation Column */}
            <RevealSection delayMs={70} className="lg:col-span-2 space-y-4">
              <h3 className="eyebrow text-[#C5A059]">Explore</h3>
              <ul className="space-y-2.5 text-[14px] text-[#E4DCE1]">
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('home');
                    }}
                    className="footer-link hover:text-white cursor-pointer"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('shop');
                    }}
                    className="footer-link hover:text-white cursor-pointer"
                  >
                    Shop Arrangements
                  </a>
                </li>
                <li>
                  <a
                    href="/#occasions"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('home', 'occasions');
                    }}
                    className="footer-link hover:text-white cursor-pointer"
                  >
                    Occasions &amp; Events
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('gallery');
                    }}
                    className="footer-link hover:text-white cursor-pointer"
                  >
                    Recent Work Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('about');
                    }}
                    className="footer-link hover:text-white cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('contact');
                    }}
                    className="footer-link hover:text-white cursor-pointer"
                  >
                    Contact &amp; Enquiries
                  </a>
                </li>
              </ul>

              <h3 className="eyebrow text-[#C5A059] pt-2">Popular Services</h3>
              <ul className="space-y-2.5 text-[14px] text-[#E4DCE1]">
                {LANDING_LINKS.map((link) => {
                  const href = LANDING_PAGES[link.slug].path;
                  return (
                    <li key={link.slug}>
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          if (onNavigateRoute) {
                            onNavigateRoute({ view: 'landing', landingSlug: link.slug });
                          } else {
                            window.location.href = href;
                          }
                        }}
                        className="footer-link hover:text-white cursor-pointer"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </RevealSection>

            {/* Visit & Trading Hours */}
            <RevealSection delayMs={140} className="lg:col-span-3 space-y-4">
              <h3 className="eyebrow text-[#C5A059]">Visit the Boutique</h3>
              <div className="space-y-3 text-[14px] text-[#E4DCE1]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" aria-hidden="true" />
                  <p className="leading-relaxed">
                    {BUSINESS_INFO.addressLine1}
                    <br />
                    {BUSINESS_INFO.city}, {BUSINESS_INFO.postalCode}
                    <br />
                    {BUSINESS_INFO.country}
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" aria-hidden="true" />
                  <div className="space-y-1 text-[13px]">
                    <p>Mon – Fri: 8:00 AM – 4:30 PM</p>
                    <p>Saturday: 8:00 AM – 1:00 PM</p>
                    <p className="text-[#C7B8C3]">Sunday: Closed (Events by arrangement)</p>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Contact & Delivery Column */}
            <RevealSection delayMs={210} className="lg:col-span-3 space-y-4">
              <h3 className="eyebrow text-[#C5A059]">Direct Concierge</h3>
              <div className="space-y-3 text-[14px] text-[#E4DCE1]">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="footer-link gap-2.5 hover:text-white"
                >
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${BUSINESS_INFO.emailPrimary}`}
                  className="footer-link gap-2.5 hover:text-white break-all"
                >
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.emailPrimary}</span>
                </a>
                <a
                  href={`mailto:${BUSINESS_INFO.emailSecondary}`}
                  className="footer-link gap-2.5 text-[13px] text-[#C7B8C3] hover:text-white break-all"
                >
                  <Mail className="w-4 h-4 text-[#C5A059]/70 shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.emailSecondary}</span>
                </a>
                <div className="pt-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C5A059]">
                    Follow Us
                  </p>
                  <SocialIconLinks className="mt-2.5" />
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={BUSINESS_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial inline-flex items-center px-4 py-2 rounded-sm border border-[#C5A059]/60 text-[12px] font-semibold tracking-[0.06em] uppercase text-[#F7EFE3] hover:bg-[#C5A059] hover:text-[#2F1B2E]"
                >
                  WhatsApp Studio
                </a>
                <button
                  type="button"
                  onClick={() => setPolicyModalOpen(true)}
                  className="btn-editorial inline-flex items-center px-4 py-2 rounded-sm border border-white/20 text-[12px] font-semibold tracking-[0.06em] uppercase text-[#E4DCE1] hover:border-white/60 hover:text-white cursor-pointer"
                >
                  Delivery &amp; Policies
                </button>
              </div>
            </RevealSection>
          </div>

          {/* Bottom Legal Row */}
          <RevealSection
            variant="fade"
            delayMs={180}
            className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#C7B8C3]"
          >
            <p>
              &copy; {BUSINESS_INFO.copyrightYear} {BUSINESS_INFO.name} &middot; Pietermaritzburg,
              South Africa.
            </p>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setPolicyModalOpen(true)}
                className="footer-link hover:text-white cursor-pointer"
              >
                Refund &amp; Delivery Policy
              </button>
              <a
                href="/shop"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('shop');
                }}
                className="footer-link hover:text-white cursor-pointer"
              >
                Shop Now
              </a>
              <a
                href="/gallery"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('gallery');
                }}
                className="footer-link hover:text-white cursor-pointer"
              >
                Gallery
              </a>
            </div>
          </RevealSection>
        </div>
      </footer>

      {/* Store Policies & Delivery Modal */}
      {policyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Delivery and Store Policies"
        >
          <div
            className="modal-backdrop-enter fixed inset-0 bg-[#2F1B2E]/55 backdrop-blur-[2px]"
            onClick={() => setPolicyModalOpen(false)}
          />
          <div className="modal-panel-enter relative z-10 w-full max-w-xl bg-[#FDFBF7] border border-[#EFE8DC] rounded-sm shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EFE8DC]">
              <div>
                <p className="eyebrow text-[#3E5B42]">Nonise Florist</p>
                <h2 className="font-editorial text-[26px] text-[#2F1B2E] mt-1">
                  Delivery &amp; Store Policies
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPolicyModalOpen(false)}
                aria-label="Close policy dialog"
                className="btn-editorial w-9 h-9 inline-flex items-center justify-center rounded-sm text-[#2F1B2E] hover:bg-[#F7EFE3] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-5 text-[14px] leading-relaxed text-[#3D3A39]">
              <div>
                <h3 className="font-editorial text-[18px] text-[#2F1B2E] mb-1">
                  Pietermaritzburg Delivery &amp; Collection
                </h3>
                <p>
                  We deliver fresh bouquets and floral arrangements across Pietermaritzburg during
                  trading hours (Monday–Friday, 8:00 AM – 4:30 PM; Saturday, 8:00 AM – 1:00 PM).
                  Complimentary in-store collection is also available at{' '}
                  <strong>{BUSINESS_INFO.fullAddress}</strong>.
                </p>
              </div>

              <div>
                <h3 className="font-editorial text-[18px] text-[#2F1B2E] mb-1">
                  Freshness &amp; Seasonal Stems
                </h3>
                <p>
                  Every bouquet is handcrafted to order using the freshest stems in our studio.
                  Because flowers are natural seasonal products, minor stem or shade substitutions
                  of equal or greater value may occasionally be made while preserving the style and
                  palette of your chosen design.
                </p>
              </div>

              <div className="p-4 bg-[#F7EFE3] border border-[#EFE8DC] rounded-sm">
                <h3 className="font-editorial text-[17px] text-[#2F1B2E] mb-1">
                  Refund &amp; Returns Policy Notice
                </h3>
                <p className="text-[13px] text-[#584144]">
                  The full published Refund Policy document was not live on the legacy website at
                  the time of reconstruction. For any order care, freshness concerns, or refund
                  enquiries, please contact Mrs. Nokwanda Mthembu’s studio directly on{' '}
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="font-semibold text-[#2F1B2E] underline"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>{' '}
                  or{' '}
                  <a
                    href={`mailto:${BUSINESS_INFO.emailPrimary}`}
                    className="font-semibold text-[#2F1B2E] underline"
                  >
                    {BUSINESS_INFO.emailPrimary}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
