import React, { useMemo, useState } from 'react';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS } from '../data/noniseData';
import { Product, SpecialtyKey } from '../types';
import { ProductCard } from '../components/ProductCard';
import { RevealSection } from '../components/RevealSection';

interface ShopPageProps {
  initialFilter: SpecialtyKey;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onStartInquiry: (topic: string) => void;
}

const FILTER_TABS: { key: SpecialtyKey; label: string }[] = [
  { key: 'all', label: 'All Arrangements' },
  { key: 'roses', label: 'Roses Made for Moments' },
  { key: 'seasonal', label: 'Seasonal & Indigenous' },
  { key: 'gifting', label: 'Roses & Chocolates' },
];

type SortOption = 'featured' | 'price-asc' | 'price-desc';

export const ShopPage: React.FC<ShopPageProps> = ({
  initialFilter,
  onSelectProduct,
  onQuickAdd,
  onStartInquiry,
}) => {
  const [activeFilter, setActiveFilter] = useState<SpecialtyKey>(
    initialFilter === 'events' ? 'all' : initialFilter
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

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
          <p className="eyebrow text-[#3E5B42]">Everyday Bouquets &amp; Flower Gifting</p>
          <h1 className="font-editorial text-[34px] sm:text-[44px] font-semibold text-[#2F1B2E] leading-tight mt-2">
            Shop Floral Arrangements
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#584144] mt-3 max-w-2xl leading-relaxed">
            Browse Nonise Florist’s curated online collection crafted fresh in Pietermaritzburg.
            Select any design to add a complimentary handwritten gift message or preferred delivery
            date.
          </p>
        </RevealSection>
      </section>

      {/* Filter & Search Bar */}
      <section className="border-b border-[#EFE8DC] bg-white">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter arrangements">
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`btn-editorial px-4 py-2 min-h-[40px] rounded-full text-[13px] font-semibold tracking-[0.02em] whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#2F1B2E] text-white'
                      : 'bg-[#F7EFE3] text-[#2F1B2E] hover:bg-[#EFE8DC]'
                  }`}
                >
                  {tab.label}
                </button>
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
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
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
