import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { BUSINESS_INFO } from '../data/noniseData';
import { MagneticButton } from './MagneticButton';

interface LivingBloomHeroProps {
  onShopNow: () => void;
  onDiscoverStory: () => void;
}

interface PetalSpec {
  id: string;
  src: string;
  leftPct: number;
  topPct: number;
  widthPx: number;
  baseRotate: number;
  opacity: number;
  floatX: number;
  floatY: number;
  floatRot: number;
  floatDurationSec: number;
  floatDelaySec: number;
  repelScale: number;
  depthBlurPx?: number;
  visibilityClass: string;
}

const DAY_GARDEN_SRC = '/assets/floral/Garden%20Path%20day.png';
const NIGHT_GARDEN_SRC = '/assets/floral/Garden%20Path%20night.png';

/**
 * Identical responsive framing applied to both Day and Night layers so the
 * lawn, curved stone pathway, rose arbor, bench, lanterns, flower beds, and
 * distant hills stay pixel-aligned at every viewport width.
 */
const GARDEN_IMG_CLASS =
  'absolute inset-0 w-full h-full object-cover object-[66%_54%] sm:object-[58%_52%] lg:object-center select-none';

/**
 * Nine authentic transparent rose-petal PNG assets framing the centred logo,
 * headline, and CTAs at varied sizes, rotations, and optical depths while
 * maintaining a clean exclusion zone directly over the lettering and buttons.
 */
const HERO_PETALS: PetalSpec[] = [
  // Inner editorial framing ring (closer to content outer edges, clear of text)
  {
    id: 'petal-03-champagne',
    src: '/assets/floral/rose-petal-03_e3c5dac0.png',
    leftPct: 24,
    topPct: 16,
    widthPx: 42,
    baseRotate: -26,
    opacity: 0.92,
    floatX: 8,
    floatY: -10,
    floatRot: 8,
    floatDurationSec: 12.6,
    floatDelaySec: -2.1,
    repelScale: 1.08,
    visibilityClass: 'hidden md:block',
  },
  {
    id: 'petal-07-folded-crimson',
    src: '/assets/floral/rose-petal-07_6c10f9ac.png',
    leftPct: 19.5,
    topPct: 44,
    widthPx: 44,
    baseRotate: 18,
    opacity: 0.9,
    floatX: -7,
    floatY: 9,
    floatRot: -7,
    floatDurationSec: 10.9,
    floatDelaySec: -5.4,
    repelScale: 1.15,
    visibilityClass: 'hidden lg:block',
  },
  {
    id: 'petal-06-cream-blush',
    src: '/assets/floral/rose-petal-06_310da143.png',
    leftPct: 72.5,
    topPct: 17,
    widthPx: 40,
    baseRotate: -32,
    opacity: 0.9,
    floatX: 7,
    floatY: -11,
    floatRot: 10,
    floatDurationSec: 14.2,
    floatDelaySec: -7.0,
    repelScale: 1.18,
    visibilityClass: 'hidden md:block',
  },
  {
    id: 'petal-02-rose-pink',
    src: '/assets/floral/rose-petal-02_40ce3f70.png',
    leftPct: 75.5,
    topPct: 45,
    widthPx: 47,
    baseRotate: 22,
    opacity: 0.93,
    floatX: -8,
    floatY: 10,
    floatRot: 7,
    floatDurationSec: 10.3,
    floatDelaySec: -3.5,
    repelScale: 1.06,
    visibilityClass: 'hidden lg:block',
  },
  {
    id: 'petal-05-velvet-red',
    src: '/assets/floral/rose-petal-05_da2ed567.png',
    leftPct: 29.5,
    topPct: 71,
    widthPx: 44,
    baseRotate: 52,
    opacity: 0.92,
    floatX: 9,
    floatY: -8,
    floatRot: -8,
    floatDurationSec: 13.1,
    floatDelaySec: -6.1,
    repelScale: 1.1,
    visibilityClass: 'block',
  },
  {
    id: 'petal-09-ruby',
    src: '/assets/floral/rose-petal-09_c8dc575a.png',
    leftPct: 66.5,
    topPct: 72,
    widthPx: 45,
    baseRotate: -42,
    opacity: 0.93,
    floatX: 7,
    floatY: -10,
    floatRot: -7,
    floatDurationSec: 14.6,
    floatDelaySec: -8.3,
    repelScale: 1.05,
    visibilityClass: 'block',
  },
  // Outer depth accents (subtle foreground/background scale & depth variation)
  {
    id: 'petal-08-blush',
    src: '/assets/floral/rose-petal-08_9ce1785e.png',
    leftPct: 8,
    topPct: 14,
    widthPx: 52,
    baseRotate: 34,
    opacity: 0.88,
    floatX: 11,
    floatY: 9,
    floatRot: 9,
    floatDurationSec: 13.5,
    floatDelaySec: -1.3,
    repelScale: 1.02,
    depthBlurPx: 0.6,
    visibilityClass: 'block',
  },
  {
    id: 'petal-01-crimson',
    src: '/assets/floral/rose-petal-01_ad2a55ac.png',
    leftPct: 87.5,
    topPct: 23,
    widthPx: 54,
    baseRotate: 40,
    opacity: 0.92,
    floatX: -10,
    floatY: -9,
    floatRot: -6,
    floatDurationSec: 11.4,
    floatDelaySec: -4.2,
    repelScale: 0.96,
    depthBlurPx: 0.5,
    visibilityClass: 'block',
  },
  {
    id: 'petal-04-vibrant-blush',
    src: '/assets/floral/rose-petal-04_f4358a0f.png',
    leftPct: 86,
    topPct: 66,
    widthPx: 37,
    baseRotate: -19,
    opacity: 0.86,
    floatX: -9,
    floatY: -10,
    floatRot: 9,
    floatDurationSec: 11.8,
    floatDelaySec: -2.8,
    repelScale: 1.14,
    visibilityClass: 'hidden md:block',
  },
];

const FEATHERED_REVEAL_MASK =
  'radial-gradient(circle var(--reveal-r, 0px) at var(--reveal-x, 50%) var(--reveal-y, 50%), rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.98) 46%, rgba(0, 0, 0, 0.68) 70%, rgba(0, 0, 0, 0.18) 88%, rgba(0, 0, 0, 0) 100%)';

const OPTICAL_BLUR_MASK_DESKTOP =
  'radial-gradient(ellipse 50% 46% at 50% 40%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.88) 36%, rgba(0, 0, 0, 0.36) 66%, rgba(0, 0, 0, 0) 92%)';

const OPTICAL_BLUR_MASK_MOBILE =
  'radial-gradient(ellipse 96% 56% at 50% 30%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.84) 40%, rgba(0, 0, 0, 0.28) 72%, rgba(0, 0, 0, 0) 96%)';

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/**
 * The Living Bloom Hero — Pixel-aligned Day-to-Night circular cursor reveal
 * with layered cinematic scroll parallax powered by native CSS transforms,
 * opacity, and on-demand requestAnimationFrame loops (zero React re-renders).
 */
export const LivingBloomHero: React.FC<LivingBloomHeroProps> = ({
  onShopNow,
  onDiscoverStory,
}) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const bgStageRef = useRef<HTMLDivElement | null>(null);
  const nightLayerRef = useRef<HTMLDivElement | null>(null);
  const opticalVeilRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const petalParallaxRef = useRef<HTMLDivElement | null>(null);
  const petalRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentGroupRef = useRef<HTMLDivElement | null>(null);

  // Touch/coarse-pointer optional tap-to-toggle state (never active on mouse desktop)
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mobileNightMode, setMobileNightMode] = useState(false);

  useEffect(() => {
    const finePointerMQ = window.matchMedia('(pointer: fine) and (hover: hover)');
    const syncPointerKind = () => {
      const coarse = !finePointerMQ.matches;
      setIsTouchDevice(coarse);
      if (!coarse) {
        setMobileNightMode(false);
      }
    };
    syncPointerKind();
    finePointerMQ.addEventListener('change', syncPointerKind);
    return () => finePointerMQ.removeEventListener('change', syncPointerKind);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerMQ = window.matchMedia('(pointer: fine) and (hover: hover)');

    const isPointerInteractive = () => !reducedMotionMQ.matches && finePointerMQ.matches;

    let pointerRafId: number | null = null;
    let scrollRafId: number | null = null;
    let isPointerInside = false;
    let currentPetalShiftY = 0;

    const lastClient = { x: 0, y: 0, valid: false };
    const heroPointer = { x: 0, y: 0 };
    const nightPointer = { x: 0, y: 0 };
    const smoothReveal = { x: 0, y: 0, r: 0, opacity: 0 };
    const smoothGlow = { x: 0, y: 0, opacity: 0 };

    const petalStates = HERO_PETALS.map(() => ({
      x: 0,
      y: 0,
      rot: 0,
    }));

    const syncPointerCoordsFromClient = () => {
      if (!lastClient.valid) return;
      const heroRect = hero.getBoundingClientRect();
      heroPointer.x = lastClient.x - heroRect.left;
      heroPointer.y = lastClient.y - heroRect.top;

      if (nightLayerRef.current) {
        const nightRect = nightLayerRef.current.getBoundingClientRect();
        nightPointer.x = lastClient.x - nightRect.left;
        nightPointer.y = lastClient.y - nightRect.top;
      } else {
        nightPointer.x = heroPointer.x;
        nightPointer.y = heroPointer.y;
      }
    };

    const resetScrollTransforms = () => {
      currentPetalShiftY = 0;
      if (bgStageRef.current) bgStageRef.current.style.transform = '';
      if (petalParallaxRef.current) {
        petalParallaxRef.current.style.transform = '';
        petalParallaxRef.current.style.opacity = '';
      }
      if (contentGroupRef.current) {
        contentGroupRef.current.style.transform = '';
        contentGroupRef.current.style.opacity = '';
        contentGroupRef.current.style.pointerEvents = '';
      }
      if (opticalVeilRef.current) {
        opticalVeilRef.current.style.transform = '';
        opticalVeilRef.current.style.opacity = '';
      }
    };

    const applyScrollParallax = () => {
      scrollRafId = null;

      if (reducedMotionMQ.matches) {
        resetScrollTransforms();
        return;
      }

      const heroHeight = hero.offsetHeight || 700;
      const scrollY = Math.max(0, window.scrollY);
      const clampedScroll = Math.min(scrollY, heroHeight * 1.15);
      const progress = Math.max(0, Math.min(1, clampedScroll / (heroHeight * 0.85)));
      const isDesktop = window.innerWidth >= 768;

      // 1. Slow garden background parallax (Day + Night move locked inside bgStageRef)
      const bgShiftY = clampedScroll * (isDesktop ? 0.34 : 0.16);
      if (bgStageRef.current) {
        bgStageRef.current.style.transform = `translate3d(0px, ${bgShiftY.toFixed(2)}px, 0)`;
      }

      // 2. Gentle intermediate petal drift (decoupled from individual cursor repulsion)
      const petalShiftY = -clampedScroll * (isDesktop ? 0.1 : 0.05);
      const petalOpacity = 1 - smoothstep(0.42, 0.92, progress) * 0.72;
      currentPetalShiftY = petalShiftY;
      if (petalParallaxRef.current) {
        petalParallaxRef.current.style.transform = `translate3d(0px, ${petalShiftY.toFixed(2)}px, 0)`;
        petalParallaxRef.current.style.opacity = petalOpacity.toFixed(3);
      }

      // 3. Central logo, headline & CTAs rise smoothly upwards and dissolve cleanly
      const contentShiftY = -clampedScroll * (isDesktop ? 0.24 : 0.13);
      const contentOpacity = 1 - smoothstep(0.05, 0.68, progress);

      if (contentGroupRef.current) {
        contentGroupRef.current.style.transform = `translate3d(0px, ${contentShiftY.toFixed(2)}px, 0)`;
        contentGroupRef.current.style.opacity = contentOpacity.toFixed(3);
        contentGroupRef.current.style.pointerEvents = contentOpacity < 0.08 ? 'none' : '';
      }

      if (opticalVeilRef.current) {
        opticalVeilRef.current.style.transform = `translate3d(0px, ${(contentShiftY * 0.65).toFixed(2)}px, 0)`;
        opticalVeilRef.current.style.opacity = contentOpacity.toFixed(3);
      }

      // Keep Day/Night circular mask locked to cursor while scrolling over hero
      if (isPointerInside && lastClient.valid && isPointerInteractive()) {
        syncPointerCoordsFromClient();
        startPointerLoop();
      }
    };

    const scheduleScrollUpdate = () => {
      if (scrollRafId === null) {
        scrollRafId = window.requestAnimationFrame(applyScrollParallax);
      }
    };

    const resetPointerTransforms = () => {
      if (nightLayerRef.current && finePointerMQ.matches) {
        nightLayerRef.current.style.setProperty('--reveal-r', '0px');
        nightLayerRef.current.style.opacity = '0';
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
      petalRefs.current.forEach((el) => {
        if (!el) return;
        el.style.transform = 'translate3d(0px, 0px, 0) rotate(0deg)';
      });
    };

    const tickPointer = () => {
      if (!isPointerInteractive()) {
        resetPointerTransforms();
        pointerRafId = null;
        return;
      }

      const rect = hero.getBoundingClientRect();
      const intensity = window.innerWidth >= 1024 ? 1 : 0.7;

      // 1. Soft feathered circular Day-to-Night cursor reveal (tracked in nightLayer space)
      const baseRadius = Math.min(285, Math.max(205, rect.width * 0.2));
      const targetRadius = isPointerInside ? baseRadius : 0;
      const targetRevealOpacity = isPointerInside ? 1 : 0;

      smoothReveal.x += (nightPointer.x - smoothReveal.x) * 0.22;
      smoothReveal.y += (nightPointer.y - smoothReveal.y) * 0.22;
      smoothReveal.r += (targetRadius - smoothReveal.r) * (isPointerInside ? 0.14 : 0.1);
      smoothReveal.opacity +=
        (targetRevealOpacity - smoothReveal.opacity) * (isPointerInside ? 0.16 : 0.1);

      if (nightLayerRef.current) {
        nightLayerRef.current.style.setProperty('--reveal-x', `${smoothReveal.x.toFixed(1)}px`);
        nightLayerRef.current.style.setProperty('--reveal-y', `${smoothReveal.y.toFixed(1)}px`);
        nightLayerRef.current.style.setProperty('--reveal-r', `${smoothReveal.r.toFixed(1)}px`);
        nightLayerRef.current.style.opacity = smoothReveal.opacity.toFixed(3);
      }

      // 2. Subtle ambient moonlight/lantern rim glow following cursor
      const targetGlowOpacity = isPointerInside ? 1 : 0;
      smoothGlow.x += (heroPointer.x - smoothGlow.x) * 0.16;
      smoothGlow.y += (heroPointer.y - smoothGlow.y) * 0.16;
      smoothGlow.opacity += (targetGlowOpacity - smoothGlow.opacity) * 0.1;

      if (glowRef.current) {
        glowRef.current.style.setProperty('--bloom-x', `${smoothGlow.x.toFixed(1)}px`);
        glowRef.current.style.setProperty('--bloom-y', `${smoothGlow.y.toFixed(1)}px`);
        glowRef.current.style.opacity = smoothGlow.opacity.toFixed(3);
      }

      // 3. Independent real rose-petal repulsion & smooth return to floating path
      let maxPetalDelta = 0;
      const influenceRadius = 230 * intensity;

      for (let i = 0; i < HERO_PETALS.length; i++) {
        const spec = HERO_PETALS[i];
        const el = petalRefs.current[i];
        if (!el) continue;

        const restX = (spec.leftPct / 100) * rect.width + spec.widthPx * 0.5;
        const restY = (spec.topPct / 100) * rect.height + spec.widthPx * 0.5 + currentPetalShiftY;

        let targetX = 0;
        let targetY = 0;
        let targetRot = 0;

        if (isPointerInside) {
          const dx = restX - heroPointer.x;
          const dy = restY - heroPointer.y;
          const dist = Math.hypot(dx, dy);

          if (dist < influenceRadius && dist > 0.1) {
            const falloff = 1 - dist / influenceRadius;
            const eased = falloff * falloff;
            const push = eased * 38 * spec.repelScale * intensity;
            targetX = (dx / dist) * push;
            targetY = (dy / dist) * push;
            targetRot = (dx >= 0 ? 1 : -1) * eased * 20 * spec.repelScale * intensity;
          }
        }

        const st = petalStates[i];
        const prevX = st.x;
        const prevY = st.y;
        const smoothing = 0.068;
        st.x += (targetX - st.x) * smoothing;
        st.y += (targetY - st.y) * smoothing;
        st.rot += (targetRot - st.rot) * smoothing;

        maxPetalDelta = Math.max(
          maxPetalDelta,
          Math.abs(targetX - st.x),
          Math.abs(targetY - st.y),
          Math.abs(st.x - prevX),
          Math.abs(st.y - prevY)
        );

        el.style.transform = `translate3d(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px, 0) rotate(${st.rot.toFixed(2)}deg)`;
      }

      const settled =
        !isPointerInside &&
        smoothReveal.r < 0.5 &&
        smoothReveal.opacity < 0.008 &&
        smoothGlow.opacity < 0.008 &&
        maxPetalDelta < 0.05;

      if (!settled) {
        pointerRafId = window.requestAnimationFrame(tickPointer);
      } else {
        resetPointerTransforms();
        pointerRafId = null;
      }
    };

    const startPointerLoop = () => {
      if (pointerRafId === null && isPointerInteractive()) {
        pointerRafId = window.requestAnimationFrame(tickPointer);
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (!isPointerInteractive() || e.pointerType !== 'mouse') return;
      lastClient.x = e.clientX;
      lastClient.y = e.clientY;
      lastClient.valid = true;
      syncPointerCoordsFromClient();

      // Anchor reveal & glow immediately at entry coordinates so no stray sweep occurs
      if (smoothReveal.r < 1) {
        smoothReveal.x = nightPointer.x;
        smoothReveal.y = nightPointer.y;
        smoothGlow.x = heroPointer.x;
        smoothGlow.y = heroPointer.y;
      }
      isPointerInside = true;
      startPointerLoop();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerInteractive() || e.pointerType !== 'mouse') return;
      lastClient.x = e.clientX;
      lastClient.y = e.clientY;
      lastClient.valid = true;
      syncPointerCoordsFromClient();

      if (!isPointerInside && smoothReveal.r < 1) {
        smoothReveal.x = nightPointer.x;
        smoothReveal.y = nightPointer.y;
        smoothGlow.x = heroPointer.x;
        smoothGlow.y = heroPointer.y;
      }
      isPointerInside = true;
      startPointerLoop();
    };

    const handlePointerLeave = () => {
      isPointerInside = false;
      startPointerLoop();
    };

    const handlePrefChange = () => {
      if (reducedMotionMQ.matches) {
        resetScrollTransforms();
      } else {
        scheduleScrollUpdate();
      }
      if (!isPointerInteractive()) {
        isPointerInside = false;
        if (pointerRafId !== null) {
          window.cancelAnimationFrame(pointerRafId);
          pointerRafId = null;
        }
        resetPointerTransforms();
      }
    };

    // Initial scroll alignment on mount
    applyScrollParallax();

    hero.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    hero.addEventListener('pointermove', handlePointerMove, { passive: true });
    hero.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
    window.addEventListener('resize', scheduleScrollUpdate, { passive: true });
    reducedMotionMQ.addEventListener('change', handlePrefChange);

    return () => {
      hero.removeEventListener('pointerenter', handlePointerEnter);
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', scheduleScrollUpdate);
      window.removeEventListener('resize', scheduleScrollUpdate);
      reducedMotionMQ.removeEventListener('change', handlePrefChange);
      if (pointerRafId !== null) {
        window.cancelAnimationFrame(pointerRafId);
      }
      if (scrollRafId !== null) {
        window.cancelAnimationFrame(scrollRafId);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[600px] sm:min-h-[640px] lg:min-h-[min(86vh,780px)] flex items-start md:items-center bg-[#FBF9F5] border-b border-[#EFE8DC] overflow-hidden"
    >
      {/* Layer 1 & Layer 2: Perfectly Aligned Day (Base) + Night (Masked Reveal) Garden Stage
          Symmetric vertical bleed (-inset-y-12) ensures zero top/bottom gap during gentle background scroll parallax */}
      <div
        ref={bgStageRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-12 inset-x-0 z-0 will-change-transform"
      >
        {/* Layer 1 — Daytime Garden Path (Always Visible Default Background) */}
        <img
          src={DAY_GARDEN_SRC}
          alt="Sunlit daytime Nonise Florist garden pathway leading to a rose-covered arbor and bench"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          draggable={false}
          referrerPolicy="no-referrer"
          className={`${GARDEN_IMG_CLASS} hero-enter-bg`}
        />

        {/* Layer 2 — Nighttime Garden Path (Revealed Through Feathered Circular Cursor Mask) */}
        <div
          ref={nightLayerRef}
          className={`absolute inset-0 z-[1] ${
            isTouchDevice
              ? 'transition-opacity duration-700 motion-reduce:transition-none'
              : 'will-change-[opacity]'
          }`}
          style={
            isTouchDevice
              ? { opacity: mobileNightMode ? 1 : 0 }
              : ({
                  opacity: 0,
                  WebkitMaskImage: FEATHERED_REVEAL_MASK,
                  maskImage: FEATHERED_REVEAL_MASK,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                } as React.CSSProperties)
          }
        >
          <img
            src={NIGHT_GARDEN_SRC}
            alt="Moonlit nighttime Nonise Florist garden pathway with softly illuminated lanterns under a twilight sky"
            loading="eager"
            decoding="async"
            draggable={false}
            referrerPolicy="no-referrer"
            className={GARDEN_IMG_CLASS}
          />
        </div>
      </div>

      {/* Layer 3: Optical Soft-Focus Backdrop Blur & Feathered Warm Luminance Behind Central Content
          Fades smoothly with the hero text as the visitor scrolls into the next section */}
      <div
        ref={opticalVeilRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] will-change-[transform,opacity]"
      >
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backdropFilter: 'blur(7px)',
            WebkitBackdropFilter: 'blur(7px)',
            WebkitMaskImage: OPTICAL_BLUR_MASK_MOBILE,
            maskImage: OPTICAL_BLUR_MASK_MOBILE,
            background:
              'radial-gradient(ellipse 96% 56% at 50% 30%, rgba(251, 249, 245, 0.68) 0%, rgba(251, 249, 245, 0.4) 46%, rgba(251, 249, 245, 0) 86%)',
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backdropFilter: 'blur(7px)',
            WebkitBackdropFilter: 'blur(7px)',
            WebkitMaskImage: OPTICAL_BLUR_MASK_DESKTOP,
            maskImage: OPTICAL_BLUR_MASK_DESKTOP,
            background:
              'radial-gradient(ellipse 50% 46% at 50% 40%, rgba(251, 249, 245, 0.58) 0%, rgba(251, 249, 245, 0.3) 48%, rgba(251, 249, 245, 0) 86%)',
          }}
        />
      </div>

      {/* Layer 4: Subtle Cursor-Following Ambient Shimmer Around the Reveal Window */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(360px circle at var(--bloom-x, 50%) var(--bloom-y, 50%), rgba(247, 239, 227, 0.14) 0%, rgba(197, 160, 89, 0.08) 54%, transparent 76%)',
        }}
      />

      {/* Layer 5: Independent Floating Real Rose Petals (Nine Transparent PNGs)
          Outer wrapper handles gentle scroll parallax while individual petals keep cursor repulsion + CSS float */}
      <div
        ref={petalParallaxRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden will-change-[transform,opacity]"
      >
        {HERO_PETALS.map((petal, idx) => (
          <div
            key={petal.id}
            ref={(el) => {
              petalRefs.current[idx] = el;
            }}
            className={`absolute will-change-transform select-none ${petal.visibilityClass}`}
            style={{
              left: `${petal.leftPct}%`,
              top: `${petal.topPct}%`,
              width: `${petal.widthPx}px`,
            }}
          >
            <img
              src={petal.src}
              alt=""
              draggable={false}
              decoding="async"
              referrerPolicy="no-referrer"
              className="petal-float block w-full h-auto"
              style={
                {
                  opacity: petal.opacity,
                  filter: petal.depthBlurPx
                    ? `blur(${petal.depthBlurPx}px) drop-shadow(0 10px 16px rgba(47, 27, 46, 0.18))`
                    : 'drop-shadow(0 8px 14px rgba(47, 27, 46, 0.18))',
                  '--base-rot': `${petal.baseRotate}deg`,
                  '--float-x': `${petal.floatX}px`,
                  '--float-y': `${petal.floatY}px`,
                  '--float-rot': `${petal.floatRot}deg`,
                  '--float-dur': `${petal.floatDurationSec}s`,
                  '--float-delay': `${petal.floatDelaySec}s`,
                } as React.CSSProperties
              }
            />
          </div>
        ))}
      </div>

      {/* Layer 6: Minimal Centred Editorial Campaign — Official Logo, Headline & CTAs
          Rises gracefully and dissolves as the next homepage section enters */}
      <div className="relative z-20 w-full max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 pt-14 pb-44 sm:pt-16 sm:pb-48 md:pt-20 md:pb-36 lg:pt-20 lg:pb-44">
        <div
          ref={contentGroupRef}
          className="mx-auto max-w-[640px] text-center will-change-[transform,opacity]"
        >
          {/* Official Nonise Florist Emblem */}
          <div className="hero-enter-logo mb-6 sm:mb-7 flex justify-center">
            <img
              src={BUSINESS_INFO.logo}
              alt="Nonise Florist — Let Beauty Bloom"
              loading="eager"
              decoding="sync"
              draggable={false}
              referrerPolicy="no-referrer"
              className="w-[112px] h-[112px] sm:w-[132px] sm:h-[132px] lg:w-[146px] lg:h-[146px] rounded-full object-contain select-none drop-shadow-[0_12px_28px_rgba(47,27,46,0.22)]"
            />
          </div>

          <h1
            className="font-editorial text-[30px] sm:text-[38px] lg:text-[44px] font-semibold leading-[1.16] tracking-[-0.015em] text-[#2F1B2E] text-balance"
            style={{ textShadow: '0 1px 20px rgba(251, 249, 245, 0.85)' }}
          >
            <span className="block hero-enter-line-1">
              Some moments deserve more than words.
            </span>
            <span className="block hero-enter-line-2 italic font-normal text-[#AB274A] mt-1.5">
              They deserve flowers.
            </span>
          </h1>

          {/* Primary Magnetic CTA + High-Contrast Secondary Action */}
          <div className="hero-enter-cta mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
            <MagneticButton
              onClick={onShopNow}
              className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] rounded-sm border-0 bg-[#AB274A] text-white text-[13px] font-semibold tracking-[0.05em] hover:bg-[#931E3E] transition-colors duration-200 shadow-[0_10px_24px_-6px_rgba(47,27,46,0.34)] cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </MagneticButton>

            <button
              type="button"
              onClick={onDiscoverStory}
              className="btn-editorial inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-sm bg-[#FBF9F5]/78 hover:bg-[#FBF9F5]/95 border border-[#2F1B2E]/20 hover:border-[#AB274A]/45 text-[13px] font-semibold tracking-[0.04em] text-[#2F1B2E] hover:text-[#AB274A] shadow-[0_8px_20px_-6px_rgba(47,27,46,0.2)] backdrop-blur-[4px] cursor-pointer"
            >
              <span>Discover Our Story</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Optional Accessible Tap-to-Toggle Day/Night Control on Touch/Mobile Devices Only */}
      {isTouchDevice && (
        <button
          type="button"
          onClick={() => setMobileNightMode((prev) => !prev)}
          aria-pressed={mobileNightMode}
          aria-label={mobileNightMode ? 'Switch garden view to daytime' : 'Switch garden view to nighttime'}
          className="absolute bottom-4 right-4 z-30 inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-sm bg-[#FDFBF7]/88 backdrop-blur-sm border border-[#C5A059]/45 text-[#2F1B2E] text-[12px] font-medium tracking-[0.03em] shadow-[0_6px_18px_-6px_rgba(47,27,46,0.22)] active:scale-[0.98] transition-colors cursor-pointer"
        >
          {mobileNightMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
              <span>Day Garden</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-[#2F1B2E]" aria-hidden="true" />
              <span>Night Garden</span>
            </>
          )}
        </button>
      )}
    </section>
  );
};
