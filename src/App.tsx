import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from './data/noniseData';
import { CartItem, ConfirmedOrder, PageView, Product, SpecialtyKey } from './types';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';

const CART_STORAGE_KEY = 'nonise_florist_bag_v1';

interface RouteHistoryState {
  view: PageView;
  shopFilter?: SpecialtyKey;
  productId?: number;
  inquiryTopic?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [shopFilter, setShopFilter] = useState<SpecialtyKey>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(undefined);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors in private contexts
    }
  }, [cartItems]);

  // Seed initial history entry & support browser Back / Forward cleanly
  useEffect(() => {
    try {
      if (!window.history.state?.view) {
        window.history.replaceState({ view: 'home' } satisfies RouteHistoryState, '');
      }
    } catch {
      // Ignore restricted iframe history API errors
    }

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state as RouteHistoryState | null;
      if (!state?.view) {
        setCurrentView('home');
        return;
      }
      setCurrentView(state.view);
      if (state.shopFilter) setShopFilter(state.shopFilter);
      if (state.productId !== undefined) {
        const match = PRODUCTS.find((p) => p.id === state.productId);
        if (match) setSelectedProduct(match);
      }
      if (state.inquiryTopic !== undefined) {
        setInquiryTopic(state.inquiryTopic);
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.priceZAR * item.quantity, 0),
    [cartItems]
  );

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
      toastTimerRef.current = null;
    }, 2600);
  }, []);

  const pushHistory = (nextState: RouteHistoryState) => {
    try {
      window.history.pushState(nextState, '');
    } catch {
      // Ignore restricted iframe history API errors
    }
  };

  const navigateTo = (view: PageView, sectionId?: string) => {
    setCurrentView(view);
    pushHistory({
      view,
      shopFilter,
      productId: selectedProduct.id,
      inquiryTopic,
    });

    if (sectionId) {
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (filter: SpecialtyKey) => {
    setShopFilter(filter);
    setCurrentView('shop');
    pushHistory({ view: 'shop', shopFilter: filter });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    pushHistory({ view: 'product', productId: product.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartInquiry = (topic: string) => {
    setInquiryTopic(topic);
    setCurrentView('contact');
    pushHistory({ view: 'contact', inquiryTopic: topic });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    options?: { giftMessage?: string; deliveryDate?: string }
  ) => {
    const giftMsg = options?.giftMessage?.trim() || '';
    const delDate = options?.deliveryDate || '';
    const cartKey = `${product.id}__${delDate}__${giftMsg}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartKey === cartKey);
      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartKey,
          product,
          quantity,
          giftMessage: giftMsg || undefined,
          deliveryDate: delDate || undefined,
        },
      ];
    });

    showToast(`Added ${product.name} to your bag`);
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartKey: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleOrderConfirmed = (_order: ConfirmedOrder) => {
    setCartItems([]);
  };

  // Keyed solely by route + active product so cart updates never re-trigger page transitions
  const pageTransitionKey =
    currentView === 'product' ? `product-${selectedProduct.id}` : currentView;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1B1C1A]">
      <Navbar
        currentView={currentView}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onNavigate={navigateTo}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        <div key={pageTransitionKey} className="page-enter">
          {currentView === 'home' && (
            <HomePage
              onNavigate={navigateTo}
              onSelectCategory={handleSelectCategory}
              onStartInquiry={handleStartInquiry}
            />
          )}

          {currentView === 'shop' && (
            <ShopPage
              key={shopFilter}
              initialFilter={shopFilter}
              onSelectProduct={handleSelectProduct}
              onQuickAdd={(product) => handleAddToCart(product, 1)}
              onStartInquiry={handleStartInquiry}
            />
          )}

          {currentView === 'product' && (
            <ProductDetailPage
              key={selectedProduct.id}
              product={selectedProduct}
              onBackToShop={() => navigateTo('shop')}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
            />
          )}

          {currentView === 'gallery' && <GalleryPage onStartInquiry={handleStartInquiry} />}

          {currentView === 'about' && (
            <AboutPage onNavigate={navigateTo} onStartInquiry={handleStartInquiry} />
          )}

          {currentView === 'contact' && (
            <ContactPage key={inquiryTopic ?? 'general'} initialTopic={inquiryTopic} />
          )}

          {currentView === 'checkout' && (
            <CheckoutPage
              items={cartItems}
              subtotal={cartSubtotal}
              onBackToShop={() => navigateTo('shop')}
              onOrderConfirmed={handleOrderConfirmed}
            />
          )}
        </div>
      </main>

      <Footer onNavigate={navigateTo} />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        subtotal={cartSubtotal}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          navigateTo('checkout');
        }}
        onBrowseShop={() => navigateTo('shop')}
      />

      {/* Subtle Floating Cart Confirmation Toast */}
      {toastMessage && (
        <div
          key={toastMessage}
          role="status"
          aria-live="polite"
          className="toast-enter fixed bottom-5 right-5 z-50 bg-[#2F1B2E] text-white border border-[#C5A059]/45 rounded-sm shadow-xl px-4 py-3 flex items-center gap-3 max-w-sm"
        >
          <span className="w-6 h-6 rounded-full bg-[#3E5B42] inline-flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          </span>
          <span className="text-[13px] font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setCartOpen(true);
            }}
            className="btn-editorial ml-1 inline-flex items-center gap-1 text-[12px] font-semibold text-[#E8D5B0] hover:text-white whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            <span>View Bag</span>
          </button>
        </div>
      )}
    </div>
  );
}
