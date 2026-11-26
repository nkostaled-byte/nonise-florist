import React, { useEffect, useRef, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { BUSINESS_INFO, formatZAR } from '../data/noniseData';
import { PageView } from '../types';
import { pathFor } from '../lib/routes';

interface NavbarProps {
  currentView: PageView;
  cartCount: number;
  cartSubtotal: number;
  onNavigate: (view: PageView, sectionId?: string) => void;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  cartCount,
  cartSubtotal,
  onNavigate,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [bagPulse, setBagPulse] = useState(false);
  const prevCartCountRef = useRef(cartCount);

  const navItems: { label: string; view: PageView; sectionId?: string }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Gallery', view: 'gallery' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  // Subtle bag feedback pulse when items are added
  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setBagPulse(true);
      const timer = window.setTimeout(() => setBagPulse(false), 360);
      prevCartCountRef.current = cartCount;
      return () => window.clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  // Smooth slide-over open & close lifecycle for mobile drawer
  useEffect(() => {
    if (mobileMenuOpen) {
      setDrawerMounted(true);
      const raf = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setDrawerVisible(true));
      });
      return () => window.cancelAnimationFrame(raf);
    } else if (drawerMounted) {
      setDrawerVisible(false);
      // Outlast the 340ms slide so the panel finishes leaving the screen.
      const timer = window.setTimeout(() => setDrawerMounted(false), 360);
      return () => window.clearTimeout(timer);
    }
  }, [mobileMenuOpen, drawerMounted]);

  // Escape key closes mobile drawer cleanly
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (view: PageView, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <>
      {/* Top Announcement Bar — scrolls naturally so sticky header stays minimal on mobile */}
      <div className="bg-[#2F1B2E] text-[#F7EFE3] border-b border-[#C5A059]/25">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-2 flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-1 text-[12px] leading-4 tracking-[0.02em]">
          <p className="text-center md:text-left font-medium">
            Pietermaritzburg Florist &middot; Mon–Fri 8:00–16:30 &middot; Sat 8:00–13:00
          </p>
          <p className="hidden md:block text-[#E8D5B0] font-normal">
            {BUSINESS_INFO.promise} &middot;{' '}
            <a
              href={BUSINESS_INFO.phoneHref}
              className="underline decoration-[#C5A059]/60 underline-offset-4 hover:text-white transition-colors"
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </p>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EFE8DC]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 h-[72px] flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand Crest + Single-Line Wordmark (logo only on mobile) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3 text-left group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E5B42] rounded-sm cursor-pointer"
            aria-label="Nonise Florist Home"
          >
            <img
              src={BUSINESS_INFO.logo}
              alt="Nonise Florist Crest"
              className="w-10 h-10 rounded-full object-cover border border-[#C5A059]/40 shrink-0 transition-all duration-300 group-hover:scale-[1.045] group-hover:opacity-95 group-hover:border-[#C5A059]"
              referrerPolicy="no-referrer"
            />
            <span className="hidden sm:inline font-editorial text-[20px] md:text-[23px] font-semibold tracking-[-0.01em] text-[#2F1B2E] group-hover:text-[#D84A6A] transition-colors duration-200">
              Nonise Florist
            </span>
          </a>

          {/* Zone 2: Primary Text Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#3D3A39]"
          >
            {navItems.map((item) => {
              const isActive =
                !item.sectionId &&
                (currentView === item.view ||
                  (item.view === 'shop' && currentView === 'product'));
              return (
                <a
                  key={item.label}
                  href={item.sectionId ? `/#${item.sectionId}` : pathFor({ view: item.view })}
                  data-active={isActive ? 'true' : 'false'}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.view, item.sectionId);
                  }}
                  className={`nav-link-underline py-1 whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#2F1B2E] font-semibold'
                      : 'text-[#584144] hover:text-[#2F1B2E]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Shop Now CTA + Shopping Bag + Mobile Menu Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href="/shop"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('shop');
              }}
              className="btn-editorial hidden sm:inline-flex items-center justify-center px-4 py-2.5 min-h-[40px] rounded-sm bg-[#D84A6A] text-white text-[13px] font-semibold tracking-[0.04em] hover:bg-[#C43D5C] hover:shadow-[0_6px_16px_-4px_rgba(216,74,106,0.4)] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Shop Now
            </a>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping bag, ${cartCount} items`}
              className={`btn-editorial group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 min-h-[40px] rounded-sm bg-[#2F1B2E] text-white text-[13px] font-semibold tracking-[0.03em] hover:bg-[#432741] hover:shadow-[0_6px_16px_-4px_rgba(47,27,46,0.35)] whitespace-nowrap shrink-0 cursor-pointer ${
                bagPulse ? 'bag-pop' : ''
              }`}
            >
              <ShoppingBag
                className="w-4 h-4 text-[#E8D5B0] transition-transform duration-200 group-hover:-translate-y-[1px]"
                aria-hidden="true"
              />
              <span className="hidden md:inline tabular-price">
                Bag ({cartCount}) &middot; {formatZAR(cartSubtotal)}
              </span>
              <span className="md:hidden tabular-price">
                {cartCount} &middot; {formatZAR(cartSubtotal)}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="btn-editorial lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-sm border border-[#EFE8DC] bg-white text-[#2F1B2E] hover:border-[#C5A059] cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Smooth Slide-Over Mobile Navigation Drawer */}
      {drawerMounted && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div
            className={`drawer-backdrop fixed inset-0 bg-[#2F1B2E]/50 backdrop-blur-[2px] ${
              drawerVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={`drawer-panel-right relative ml-auto w-full max-w-[320px] h-full bg-[#FDFBF7] shadow-2xl flex flex-col justify-between p-6 overflow-y-auto ${
              drawerVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#EFE8DC]">
                <div className="flex items-center gap-2.5">
                  <img
                    src={BUSINESS_INFO.logo}
                    alt="Nonise Florist"
                    className="w-9 h-9 rounded-full object-cover border border-[#C5A059]/40"
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-editorial text-[19px] font-semibold text-[#2F1B2E]">
                    Nonise Florist
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="btn-editorial w-10 h-10 inline-flex items-center justify-center rounded-sm text-[#2F1B2E] hover:bg-[#F7EFE3] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5">
                <a
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop');
                  }}
                  className="btn-editorial w-full py-3 px-4 rounded-sm bg-[#D84A6A] text-white text-[14px] font-semibold tracking-[0.04em] hover:bg-[#C43D5C] cursor-pointer text-center block"
                >
                  Shop Now
                </a>
              </div>

              <nav className="mt-4 flex flex-col divide-y divide-[#EFE8DC]/70">
                {navItems.map((item) => {
                  const isActive =
                    !item.sectionId &&
                    (currentView === item.view ||
                      (item.view === 'shop' && currentView === 'product'));
                  return (
                    <a
                      key={item.label}
                      href={item.sectionId ? `/#${item.sectionId}` : pathFor({ view: item.view })}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.view, item.sectionId);
                      }}
                      className={`group py-3.5 text-left text-[16px] font-editorial font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        isActive ? 'text-[#D84A6A]' : 'text-[#2F1B2E] hover:text-[#D84A6A]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[#C5A059] text-sm transition-transform duration-200 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EFE8DC] space-y-3 text-[13px] text-[#584144]">
              <p className="eyebrow text-[#3E5B42]">Visit Our Boutique</p>
              <p className="leading-relaxed">{BUSINESS_INFO.fullAddress}</p>
              <p>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="font-semibold text-[#2F1B2E] hover:text-[#D84A6A] transition-colors"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </p>
              <p className="text-[12px] text-[#584144]">
                Mon–Fri 8:00 AM – 4:30 PM &middot; Sat 8:00 AM – 1:00 PM
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
