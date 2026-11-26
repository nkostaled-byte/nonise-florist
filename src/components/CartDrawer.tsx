import React, { useEffect, useState } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { BUSINESS_INFO, formatZAR } from '../data/noniseData';
import { CartItem } from '../types';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onCheckout: () => void;
  onBrowseShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  items,
  subtotal,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onBrowseShop,
}) => {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setVisible(true));
      });
      return () => window.cancelAnimationFrame(raf);
    } else if (mounted) {
      setVisible(false);
      // Outlast the 340ms slide so the panel finishes leaving the screen.
      const timer = window.setTimeout(() => setMounted(false), 360);
      return () => window.clearTimeout(timer);
    }
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      {/* Backdrop */}
      <div
        className={`drawer-backdrop fixed inset-0 bg-[#2F1B2E]/45 backdrop-blur-[2px] ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside
        className={`drawer-panel-right relative z-10 w-full max-w-[440px] h-full bg-[#FDFBF7] shadow-[-12px_0_40px_rgba(47,27,46,0.16)] flex flex-col ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EFE8DC] flex items-center justify-between bg-white">
          <div>
            <p className="eyebrow text-[#3E5B42]">Your Selection</p>
            <h2 className="font-editorial text-[24px] font-medium text-[#2F1B2E] leading-tight mt-0.5">
              Shopping Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="btn-editorial w-10 h-10 inline-flex items-center justify-center rounded-sm text-[#2F1B2E] hover:bg-[#F7EFE3] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-14 h-14 rounded-full bg-[#F7EFE3] border border-[#EFE8DC] flex items-center justify-center text-[#2F1B2E] mb-4">
                <ShoppingBag className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-[22px] text-[#2F1B2E]">
                Your floral bag is empty
              </h3>
              <p className="text-[14px] text-[#584144] mt-2 max-w-[280px] leading-relaxed">
                Explore our fresh-cut roses, South African proteas, and hand-tied bouquets crafted
                daily in Pietermaritzburg.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseShop();
                }}
                className="btn-editorial mt-6 px-6 py-3 rounded-sm bg-[#D84A6A] text-white text-[14px] font-semibold tracking-[0.04em] hover:bg-[#C43D5C] cursor-pointer"
              >
                Explore Arrangements
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#EFE8DC]">
              {items.map((item) => (
                <li key={item.cartKey} className="py-5 first:pt-1 flex gap-4">
                  <div className="w-20 h-24 rounded-sm overflow-hidden bg-[#F5F3EF] border border-[#EFE8DC] shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-editorial text-[17px] font-medium text-[#2F1B2E] leading-snug">
                          {item.product.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartKey)}
                          aria-label={`Remove ${item.product.name}${item.color ? ` in ${item.color}` : ''}`}
                          className="btn-editorial p-1 text-[#8B7073] hover:text-[#AB274A] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[14px] font-semibold text-[#1B1C1A] tabular-price mt-0.5">
                        {formatZAR(item.product.priceZAR)}
                      </p>
                      {item.color && (
                        <p className="text-[12px] text-[#3E5B42] mt-1">Colour: {item.color}</p>
                      )}
                      {item.deliveryDate && (
                        <p className="text-[12px] text-[#3E5B42] mt-1">
                          Preferred date: {item.deliveryDate}
                        </p>
                      )}
                      {item.giftMessage && (
                        <p className="text-[12px] italic text-[#584144] mt-1 line-clamp-2">
                          Card: &ldquo;{item.giftMessage}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[#EFE8DC] bg-white rounded-sm">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartKey, -1)}
                          aria-label={`Decrease quantity of ${item.product.name}${item.color ? ` in ${item.color}` : ''}`}
                          className="w-8 h-8 inline-flex items-center justify-center text-[#2F1B2E] hover:bg-[#F7EFE3] active:scale-95 transition-all cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-[13px] font-semibold text-[#1B1C1A] tabular-price">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartKey, 1)}
                          aria-label={`Increase quantity of ${item.product.name}${item.color ? ` in ${item.color}` : ''}`}
                          className="w-8 h-8 inline-flex items-center justify-center text-[#2F1B2E] hover:bg-[#F7EFE3] active:scale-95 transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[14px] font-semibold text-[#2F1B2E] tabular-price">
                        {formatZAR(item.product.priceZAR * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#EFE8DC] bg-white space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[15px]">
                <span className="text-[#584144]">Subtotal</span>
                <span className="text-[18px] font-semibold text-[#2F1B2E] tabular-price">
                  {formatZAR(subtotal)}
                </span>
              </div>
              <p className="text-[12px] text-[#584144] leading-relaxed">
                Local Pietermaritzburg delivery details or complimentary studio collection at{' '}
                {BUSINESS_INFO.addressLine1} are selected at checkout.
              </p>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="btn-editorial w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-[#D84A6A] text-white text-[14px] font-semibold tracking-[0.04em] hover:bg-[#C43D5C] hover:shadow-[0_8px_20px_-6px_rgba(216,74,106,0.45)] cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
