import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { formatZAR } from '../data/noniseData';
import { Product } from '../types';
import { RevealSection } from './RevealSection';
import { EditorialImage } from './EditorialImage';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  revealDelayMs?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickAdd,
  revealDelayMs = 0,
}) => {
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <RevealSection delayMs={revealDelayMs} className="h-full">
      <article
        className="card-floral group rounded-sm overflow-hidden flex flex-col h-full cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        {/* 4:5 Portrait Floral Photography Frame */}
        {!imgError ? (
          <EditorialImage
            src={product.images[0]}
            alt={product.name}
            wrapperClassName="aspect-[4/5] w-full bg-[#F5F3EF]"
            delayMs={revealDelayMs}
            hoverZoom
            onError={() => setImgError(true)}
          >
            {/* Subtle Quick-View Hover Veil (desktop) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#2F1B2E]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </EditorialImage>
        ) : (
          <div className="relative aspect-[4/5] w-full bg-[#F7EFE3] overflow-hidden flex flex-col items-center justify-center p-6 text-center text-[#2F1B2E]">
            <span className="font-editorial text-lg">{product.name}</span>
            <span className="text-xs text-[#584144] mt-1">Nonise Florist Studio</span>
          </div>
        )}

        {/* Content Hierarchy — Uniform Baselines, Zero-Pill Discipline */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-[#584144]">
              <span className="truncate">{product.wooCategory}</span>
              {product.badgeText && (
                <>
                  <span aria-hidden="true" className="text-[#C5A059]">
                    &middot;
                  </span>
                  <span className="text-[#3E5B42] whitespace-nowrap shrink-0">
                    {product.badgeText}
                  </span>
                </>
              )}
            </div>

            <h3 className="font-editorial text-[19px] sm:text-[21px] font-medium leading-snug text-[#2F1B2E] group-hover:text-[#D84A6A] transition-colors">
              {product.name}
            </h3>

            <p className="text-[13px] leading-relaxed text-[#584144] line-clamp-2">
              {product.shortDescription}
            </p>
          </div>

          <div className="pt-3 border-t border-[#EFE8DC] flex items-center justify-between gap-3">
            <span className="text-[16px] font-semibold text-[#1B1C1A] tabular-price whitespace-nowrap">
              {formatZAR(product.priceZAR)}
            </span>

            <button
              type="button"
              onClick={handleAdd}
              aria-label={`Quick add ${product.name} to bag`}
              className={`btn-editorial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-sm text-[12px] font-semibold tracking-[0.04em] whitespace-nowrap shrink-0 cursor-pointer ${
                justAdded
                  ? 'bg-[#3E5B42] text-white'
                  : 'bg-[#D84A6A] text-white hover:bg-[#C43D5C]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </article>
    </RevealSection>
  );
};
