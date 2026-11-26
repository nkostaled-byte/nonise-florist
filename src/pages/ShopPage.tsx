import React, { useMemo, useState } from 'react';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  PRODUCTS,
  ROSE_COLOR_OPTIONS,
  ROSE_COLOR_SWATCHES,
  ROSE_SIZE_GUIDE,
  ROSE_SIZE_PRODUCTS,
} from '../data/noniseData';
import { LANDING_LINKS, LANDING_PAGES } from '../data/landingPages';
import { RouteState, pathFor } from '../lib/routes';
import { Product, SpecialtyKey } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { RevealSection } from '../components/RevealSection';

interface ShopPageProps {
  initialFilter: SpecialtyKey;
  onNavigateRoute?: (route: RouteState) => void;
  onSelectCategory: (filter: SpecialtyKey) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, options?: { color?: string }) => void;
  onStartInquiry: (topic: string) => void;
}

const FILTER_TABS: { key: SpecialtyKey; label: string }[] = [
  { key: 'all', label: 'All Arrangements' },
  { key: 'basket-arrangements', label: 'Baskets' },
  { key: 'box-arrangements', label: 'Box Arrangements' },
  { key: 'rose-bouquets', label: 'Rose Bouquets' },
  { key: 'mixed-bouquets', label: 'Mixed Bouquets' },
  { key: 'protea-bouquets', label: 'Protea Bouquets' },
  { key: 'vase-arrangements', label: 'Vase Arrangements' },
  { key: 'hampers', label: 'Hamper' },
  { key: 'extras', label: 'Extras' },
  { key: 'funeral-flowers', label: 'Funeral Flowers' },
  { key: 'funeral-package-sets', label: 'Funeral Packages' },
];

const SHOP_HEADINGS: Record<
  Exclude<SpecialtyKey, 'events'>,
  { eyebrow: string; h1: string; intro: string }
> = {
  all: {
    eyebrow: 'Fresh Flowers & Bouquets',
    h1: 'Flower Bouquets & Roses in Pietermaritzburg',
    intro:
      'Browse Nonise Florist’s curated collection of hand-tied bouquets, roses and floral gifts, crafted fresh in our Pietermaritzburg studio. Add a handwritten gift message or choose a delivery date at checkout.',
  },
  'box-arrangements': {
    eyebrow: 'Box Arrangements',
    h1: 'Flower Box Arrangements in Pietermaritzburg',
    intro:
      'Hand-arranged hatboxes and flower boxes for birthdays, anniversaries and thoughtful gifting, delivered fresh across Pietermaritzburg.',
  },
  'basket-arrangements': {
    eyebrow: 'Basket Arrangements',
    h1: 'Flower Baskets in Pietermaritzburg',
    intro:
      'Hand-arranged flower baskets for birthdays, anniversaries and thoughtful gifting, delivered fresh across Pietermaritzburg.',
  },
  extras: {
    eyebrow: 'Extras',
    h1: 'Flower Gift Extras in Pietermaritzburg',
    intro:
      'Dried rose petals and foil balloons to finish your flower gift, ready for local delivery or studio collection.',
  },
  'funeral-flowers': {
    eyebrow: 'Funeral Flowers',
    h1: 'Funeral Flowers & Tributes in Pietermaritzburg',
    intro:
      'Coffin sprays, crosses, posies and upright tributes crafted with compassion and delivered to services across Pietermaritzburg.',
  },
  'funeral-package-sets': {
    eyebrow: 'Funeral Package Sets',
    h1: 'Funeral Flower Packages in Pietermaritzburg',
    intro:
      'Coordinated funeral flower packages with sprays, posies and standing tributes, arranged together with your funeral parlour.',
  },
  hampers: {
    eyebrow: 'Hamper',
    h1: 'Gift Hampers in Pietermaritzburg',
    intro:
      'Curated hampers of chocolates, treats and beverages for birthdays, celebrations, corporate gifting and thank-yous.',
  },
  'mixed-bouquets': {
    eyebrow: 'Mixed Bouquets',
    h1: 'Mixed Flower Bouquets in Pietermaritzburg',
    intro:
      'Fresh mixed bouquets hand-tied daily with seasonal stems, ready for local delivery across Pietermaritzburg.',
  },
  'protea-bouquets': {
    eyebrow: 'Protea Bouquets',
    h1: 'Protea Bouquets in Pietermaritzburg',
    intro:
      'Indigenous protea bouquets with pincushions and textured foliage, hand-tied in our Pietermaritzburg studio.',
  },
  'rose-bouquets': {
    eyebrow: 'Rose Bouquets',
    h1: 'Rose Bouquets in Pietermaritzburg',
    intro:
      'Fresh rose bouquets from classic reds to ivory and blush, hand-tied for anniversaries, birthdays and romance.',
  },
  'vase-arrangements': {
    eyebrow: 'Vase Arrangements',
    h1: 'Flower Vase Arrangements in Pietermaritzburg',
    intro:
      'Ready-to-display flower arrangements in clear glass vases, delivered fresh across Pietermaritzburg.',
  },
};

const RoseSizeGuide: React.FC<{
  onQuickAdd: (product: Product, options?: { color?: string }) => void;
}> = ({ onQuickAdd }) => {
  const [selectedColor, setSelectedColor] = useState('');

  return (
  <RevealSection className="mb-10">
    <div className="bg-white border border-[#EFE8DC] rounded-sm p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <p className="eyebrow text-[#AB274A]">Compare Rose Options</p>
          <h2 className="font-editorial text-[24px] sm:text-[28px] text-[#2F1B2E] mt-1">
            Rose Sizes &amp; Prices
          </h2>
        </div>
        <p className="text-[12px] text-[#8B7073]">
          One price per size &middot; same price for every colour
        </p>
      </div>

      <div className="mb-5 rounded-sm border border-[#EFE8DC] bg-[#FDFBF7] p-3.5 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8B7073]">
            1. Choose your rose colour
          </span>
          {ROSE_COLOR_OPTIONS.map((option) => {
            const active = selectedColor === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedColor(option)}
                className={`btn-editorial inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'border-[#AB274A] bg-[#AB274A] text-white'
                    : 'border-[#EFE8DC] bg-white text-[#2F1B2E] hover:border-[#AB274A]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full border border-black/10"
                  style={{ background: ROSE_COLOR_SWATCHES[option] }}
                />
                {option}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[12px] text-[#584144]" aria-live="polite">
          {selectedColor
            ? `Selected: ${selectedColor}. Now choose a size below.`
            : 'Pick a colour, then choose a size below to add it to your bag.'}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left border-collapse">
          <thead>
            <tr className="border-b border-[#EFE8DC]">
              <th
                scope="col"
                className="py-2.5 pr-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8B7073]"
              >
                Arrangement
              </th>
              {ROSE_SIZE_GUIDE.sizes.map((size) => (
                <th
                  key={size}
                  scope="col"
                  className="py-2.5 px-2 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8B7073]"
                >
                  {size} Roses
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROSE_SIZE_GUIDE.rows.map((row) => (
              <tr key={row.arrangement} className="border-b border-[#EFE8DC]/70 last:border-0">
                <th
                  scope="row"
                  className="py-3 pr-4 text-[14px] font-medium text-[#2F1B2E] whitespace-nowrap"
                >
                  {row.arrangement}
                </th>
                {row.prices.map((price, index) => (
                  <td key={ROSE_SIZE_GUIDE.sizes[index]} className="py-2 px-1.5 text-center">
                    <button
                      type="button"
                      disabled={!selectedColor}
                      title={selectedColor ? undefined : 'Choose a rose colour first'}
                      aria-label={`Add ${ROSE_SIZE_GUIDE.sizes[index]} ${row.arrangement}${selectedColor ? ` in ${selectedColor}` : ''} to bag`}
                      onClick={() => {
                        const product = ROSE_SIZE_PRODUCTS.find(
                          (item) =>
                            item.slug === `${row.slugBase}-${ROSE_SIZE_GUIDE.sizes[index]}`
                        );
                        if (product && selectedColor) {
                          onQuickAdd(product, { color: selectedColor });
                        }
                      }}
                      className="btn-editorial w-full px-2 py-2 rounded-sm border border-[#EFE8DC] text-[13px] font-semibold tabular-price text-[#2F1B2E] hover:border-[#AB274A] hover:bg-[#F7EFE3] transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#EFE8DC] disabled:hover:bg-white"
                    >
                      R{price.toLocaleString('en-ZA')}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-[#584144]">
        <span className="font-semibold text-[#2F1B2E]">Also available:</span>
        {ROSE_SIZE_GUIDE.extras.map((extra) => (
          <span key={extra.label}>
            {extra.label}{' '}
            <span className="font-semibold text-[#2F1B2E]">{extra.price}</span>
          </span>
        ))}
      </div>
    </div>
  </RevealSection>
  );
};

type SortOption = 'featured' | 'price-asc' | 'price-desc';

export const ShopPage: React.FC<ShopPageProps> = ({
  initialFilter,
  onNavigateRoute,
  onSelectCategory,
  onSelectProduct,
  onQuickAdd,
  onStartInquiry,
}) => {
  const [activeFilter, setActiveFilter] = useState<SpecialtyKey>(
    initialFilter === 'events' ? 'all' : initialFilter
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const headings = SHOP_HEADINGS[activeFilter === 'events' ? 'all' : activeFilter];

  const breadcrumbItems =
    activeFilter === 'all'
      ? [
          { label: 'Home', route: { view: 'home' } as RouteState },
          { label: 'Shop' },
        ]
      : [
          { label: 'Home', route: { view: 'home' } as RouteState },
          { label: 'Shop', route: { view: 'shop', specialty: 'all' } as RouteState },
          { label: headings.eyebrow },
        ];

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      const matchesCategory =
        activeFilter === 'all' || product.specialty === activeFilter;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.occasions.some((o) => o.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.priceZAR - b.priceZAR);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.priceZAR - a.priceZAR);
    }
    return list;
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <div className="bg-[#FDFBF7] min-h-[75vh]">
      {/* Page Header */}
      <section className="bg-[#F7EFE3]/70 border-b border-[#EFE8DC]">
        <RevealSection immediate className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
          <Breadcrumbs
            items={breadcrumbItems}
            onNavigateRoute={onNavigateRoute}
            className="mb-5"
          />
          <p className="eyebrow text-[#3E5B42]">{headings.eyebrow}</p>
          <h1 className="font-editorial text-[34px] sm:text-[44px] font-semibold text-[#2F1B2E] leading-tight mt-2">
            {headings.h1}
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#584144] mt-3 max-w-2xl leading-relaxed">
            {headings.intro}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
            <span className="text-[#8B7073]">Looking for:</span>
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
          </div>
        </RevealSection>
      </section>

      {/* Filter & Search Bar */}
      <section className="border-b border-[#EFE8DC] bg-white">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter arrangements">
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab.key;
              return (
                <a
                  key={tab.key}
                  href={pathFor({ view: 'shop', specialty: tab.key })}
                  aria-current={active ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveFilter(tab.key);
                    onSelectCategory(tab.key);
                  }}
                  className={`btn-editorial px-4 py-2 min-h-[40px] rounded-full text-[13px] font-semibold tracking-[0.02em] whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#2F1B2E] text-white'
                      : 'bg-[#F7EFE3] text-[#2F1B2E] hover:bg-[#EFE8DC]'
                  }`}
                >
                  {tab.label}
                </a>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-4 h-4 text-[#8B7073] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roses, proteas, lilies..."
                aria-label="Search floral arrangements"
                className="input-editorial w-full pl-10 pr-9 py-2.5 min-h-[42px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm text-[#1B1C1A] placeholder:text-[#8B7073] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8B7073] hover:text-[#2F1B2E] transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="relative inline-flex items-center">
              <SlidersHorizontal
                className="w-4 h-4 text-[#584144] absolute left-3.5 pointer-events-none"
                aria-hidden="true"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="input-editorial pl-10 pr-8 py-2.5 min-h-[42px] text-[13px] font-medium bg-white border border-[#EFE8DC] rounded-sm text-[#2F1B2E] focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
        {activeFilter === 'rose-bouquets' && <RoseSizeGuide onQuickAdd={onQuickAdd} />}

        <div className="flex items-center justify-between mb-6 text-[13px] text-[#584144]">
          <p className="tabular-price">
            Showing <strong className="text-[#2F1B2E]">{filteredProducts.length}</strong> of{' '}
            {PRODUCTS.length} verified arrangements
          </p>
          {(activeFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
                if (activeFilter !== 'all') onSelectCategory('all');
              }}
              className="text-[#AB274A] font-semibold hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="toast-enter bg-white border border-[#EFE8DC] rounded-sm p-12 text-center">
            <h2 className="font-editorial text-[24px] text-[#2F1B2E]">
              No matching arrangements found
            </h2>
            <p className="text-[14px] text-[#584144] mt-2 max-w-md mx-auto">
              Try clearing your search or contact our florists directly for a custom arrangement
              crafted to your exact preference.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onSelectCategory('all')}
                className="btn-editorial px-5 py-2.5 rounded-sm bg-[#2F1B2E] text-white text-[13px] font-semibold cursor-pointer"
              >
                View All Arrangements
              </button>
              <button
                type="button"
                onClick={() => onStartInquiry(`Custom Floral Request: ${searchQuery}`)}
                className="btn-editorial px-5 py-2.5 rounded-sm border border-[#2F1B2E] text-[#2F1B2E] text-[13px] font-semibold hover:bg-[#2F1B2E] hover:text-white cursor-pointer"
              >
                Request Bespoke Design
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
                revealDelayMs={(idx % 4) * 65}
              />
            ))}
          </div>
        )}

        {/* Bespoke / Custom Florist's Choice Callout */}
        <RevealSection className="mt-16">
          <div className="bg-[#2F1B2E] text-[#F7EFE3] rounded-sm p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <p className="eyebrow text-[#C5A059]">Bespoke Floral Concierge</p>
              <h2 className="font-editorial text-[26px] sm:text-[32px] font-medium text-white leading-tight">
                Looking for a Custom Hatbox, Hamper, Wedding Suite, or Funeral Spray?
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#E4DCE1] leading-relaxed max-w-2xl">
                Beyond our ready-to-order online collection, Nonise Florist designs bespoke monogram
                bouquets, luxury gift boxes, corporate installations, and dignified funeral coffin
                sprays tailored to your budget and colour palette.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                type="button"
                onClick={() => onStartInquiry('Custom Arrangement / Florist’s Choice Quote')}
                className="btn-editorial inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#D84A6A] text-white text-[14px] font-semibold tracking-[0.04em] hover:bg-[#C43D5C] whitespace-nowrap cursor-pointer"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </RevealSection>
      </section>
    </div>
  );
};
