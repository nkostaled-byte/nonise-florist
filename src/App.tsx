import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { PRODUCTS, SELLABLE_PRODUCTS } from './data/noniseData';
import { LANDING_PAGES } from './data/landingPages';
import { CartItem, ConfirmedOrder, PageView, Product, SpecialtyKey } from './types';
import {
  type RouteState,
  pathFor,
  productBySlug,
  readRouteFromLocation,
} from './lib/routes';
import { applySeoToDocument, seoFor } from './lib/seo';
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
import { LandingPage } from './pages/LandingPage';

const CART_STORAGE_KEY = 'nonise_florist_bag_v1';

interface AppProps {
  /** Fixed route used by the prerenderer; the browser falls back to window.location. */
  initialRoute?: RouteState;
}

export default function App({ initialRoute: providedRoute }: AppProps = {}) {
  const [initialRoute] = useState<RouteState>(
    () => providedRoute ?? readRouteFromLocation()
  );

  const [currentView, setCurrentView] = useState<PageView>(initialRoute.view);
  const [shopFilter, setShopFilter] = useState<SpecialtyKey>(initialRoute.specialty ?? 'all');
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    () => productBySlug(initialRoute.productSlug) ?? PRODUCTS[0]
  );
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(initialRoute.inquiryTopic);
  const [landingSlug, setLandingSlug] = useState<string | undefined>(initialRoute.landingSlug);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  // Start empty so the first client render matches the prerendered HTML, then
  // restore the saved bag after hydration.
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartHydrated, setCartHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        if (Array.isArray(parsed)) {
          // Re-price saved bags from the current catalogue so stale prices
          // never disagree with what checkout charges.
          setCartItems(
            parsed.flatMap((item) => {
              const product = SELLABLE_PRODUCTS.find((p) => p.id === item.product?.id);
              // Rose bouquets now require a colour at checkout. Drop lines saved
              // before colour selection existed so the shopper re-adds them
              // instead of hitting a checkout error they cannot resolve.
              if (!product || (product.colorOptions?.length && !item.color)) return [];
              return [
                {
                  ...item,
                  product,
                  cartKey: `${product.id}__${item.deliveryDate || ''}__${
                    item.color || ''
                  }__${item.giftMessage || ''}`,
                },
              ];
            })
          );
        }
      }
    } catch {
      // Ignore storage errors in private contexts
    }
    setCartHydrated(true);
  }, []);

  useEffect(() => {
    if (!cartHydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors in private contexts
    }
  }, [cartItems, cartHydrated]);

  const currentRoute = useMemo<RouteState>(
    () => ({
      view: currentView,
      productSlug: currentView === 'product' ? selectedProduct.slug : undefined,
      specialty: currentView === 'shop' ? shopFilter : undefined,
      inquiryTopic: currentView === 'contact' ? inquiryTopic : undefined,
      landingSlug: currentView === 'landing' ? landingSlug : undefined,
    }),
    [currentView, selectedProduct.slug, shopFilter, inquiryTopic, landingSlug]
  );

  // Keep the document head (title, description, canonical, OG, JSON-LD) in sync with the route.
  useEffect(() => {
    applySeoToDocument(seoFor(currentRoute));
  }, [currentRoute]);

  // Seed the canonical URL & support browser Back / Forward against real URLs
  useEffect(() => {
    const initial = readRouteFromLocation();
    try {
      window.history.replaceState(initial, '', pathFor(initial));
    } catch {
      // Ignore restricted iframe history API errors
    }

    const handlePopState = () => {
      const next = readRouteFromLocation();
      setCurrentView(next.view);
      setShopFilter(next.specialty ?? 'all');
      if (next.productSlug) {
        const match = productBySlug(next.productSlug);
        if (match) setSelectedProduct(match);
      }
      setInquiryTopic(next.inquiryTopic);
      setLandingSlug(next.landingSlug);
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

  const pushRoute = (route: RouteState, url?: string) => {
    try {
      window.history.pushState(route, '', url ?? pathFor(route));
    } catch {
      // Ignore restricted iframe history API errors
    }
  };

  const navigateTo = (view: PageView, sectionId?: string) => {
    setCurrentView(view);
    const route: RouteState =
      view === 'shop'
        ? { view, specialty: shopFilter }
        : view === 'product'
        ? { view, productSlug: selectedProduct.slug }
        : view === 'contact'
        ? { view, inquiryTopic }
        : { view };
    pushRoute(route, `${pathFor(route)}${sectionId ? `#${sectionId}` : ''}`);

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

  const handleNavigateRoute = (route: RouteState) => {
    setCurrentView(route.view);
    if (route.view === 'shop') setShopFilter(route.specialty ?? 'all');
    if (route.view === 'landing') setLandingSlug(route.landingSlug);
    if (route.view === 'contact') setInquiryTopic(route.inquiryTopic);
    if (route.view === 'product' && route.productSlug) {
      const match = productBySlug(route.productSlug);
      if (match) setSelectedProduct(match);
    }
    pushRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (filter: SpecialtyKey) => {
    setShopFilter(filter);
    setCurrentView('shop');
    pushRoute({ view: 'shop', specialty: filter });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    pushRoute({ view: 'product', productSlug: product.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartInquiry = (topic: string) => {
    setInquiryTopic(topic);
    setCurrentView('contact');
    pushRoute({ view: 'contact', inquiryTopic: topic });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    options?: { giftMessage?: string; deliveryDate?: string; color?: string }
  ) => {
    const giftMsg = options?.giftMessage?.trim() || '';
    const delDate = options?.deliveryDate || '';
    const color = options?.color || '';
    const cartKey = `${product.id}__${delDate}__${color}__${giftMsg}`;

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
          color: color || undefined,
          giftMessage: giftMsg || undefined,
          deliveryDate: delDate || undefined,
        },
      ];
    });

    showToast(`Added ${product.name}${color ? ` (${color})` : ''} to your bag`);
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
    try {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // Ignore storage errors in private contexts
    }
  };

  // Keyed solely by route + active product so cart updates never re-trigger page transitions
  const pageTransitionKey =
    currentView === 'product'
      ? `product-${selectedProduct.id}`
      : currentView === 'landing'
      ? `landing-${landingSlug ?? ''}`
      : currentView;

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
              onNavigateRoute={handleNavigateRoute}
              onSelectCategory={handleSelectCategory}
              onStartInquiry={handleStartInquiry}
            />
          )}

          {currentView === 'shop' && (
            <ShopPage
              key={shopFilter}
              initialFilter={shopFilter}
              onNavigateRoute={handleNavigateRoute}
              onSelectCategory={handleSelectCategory}
              onSelectProduct={handleSelectProduct}
              onQuickAdd={(product, options) => handleAddToCart(product, 1, options)}
              onStartInquiry={handleStartInquiry}
            />
          )}

          {currentView === 'product' && (
            <ProductDetailPage
              key={selectedProduct.id}
              product={selectedProduct}
              onBackToShop={() => navigateTo('shop')}
              onNavigateRoute={handleNavigateRoute}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
            />
          )}

          {currentView === 'gallery' && <GalleryPage onStartInquiry={handleStartInquiry} />}

          {currentView === 'about' && (
            <AboutPage onNavigate={navigateTo} onStartInquiry={handleStartInquiry} />
          )}

          {currentView === 'landing' && landingSlug && LANDING_PAGES[landingSlug] && (
            <LandingPage
              config={LANDING_PAGES[landingSlug]}
              onNavigateRoute={handleNavigateRoute}
              onSelectProduct={handleSelectProduct}
              onQuickAdd={(product) => handleAddToCart(product, 1)}
              onStartInquiry={handleStartInquiry}
            />
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

      <Footer onNavigate={navigateTo} onNavigateRoute={handleNavigateRoute} />

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
