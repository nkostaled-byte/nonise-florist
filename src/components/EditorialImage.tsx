import React, { useEffect, useRef, useState } from 'react';

interface EditorialImageProps {
  src: string;
  alt: string;
  /** Container aspect ratio & framing classes (e.g. 'aspect-[4/5] rounded-sm') */
  wrapperClassName?: string;
  /** Classes applied directly to the inner <img> element */
  imgClassName?: string;
  /** Subtle stagger delay in ms for grids */
  delayMs?: number;
  /** Enable gentle 1.035x hover zoom when inside a `.group` container */
  hoverZoom?: boolean;
  /** Reveal immediately on mount for above-the-fold hero / PDP imagery */
  immediate?: boolean;
  /** Pass 'eager' for above-the-fold imagery; defaults to 'lazy' for below-the-fold */
  loading?: 'lazy' | 'eager';
  onError?: () => void;
  children?: React.ReactNode;
}

/**
 * Reusable Nonise Florist Editorial Image Reveal.
 * Pairs a restrained vertical clip-path unveil + 1.032 -> 1.0 scale settle on an
 * outer frame with optional hover zoom on the inner <img> so entrance and hover
 * transforms never conflict. Remains immediately visible under reduced motion.
 */
export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  wrapperClassName = '',
  imgClassName = 'w-full h-full object-cover',
  delayMs = 0,
  hoverZoom = true,
  immediate = false,
  loading = 'lazy',
  onError,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    if (!('IntersectionObserver' in window)) return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (visible) return;

    if (immediate) {
      const raf = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(raf);
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, immediate]);

  return (
    <div ref={containerRef} className={`img-reveal-shell relative ${wrapperClassName}`}>
      <div
        style={{ '--reveal-delay': `${delayMs}ms` } as React.CSSProperties}
        className={`img-reveal-frame ${visible ? 'img-reveal-visible' : 'img-reveal-hidden'}`}
      >
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={onError}
          className={`${imgClassName} ${hoverZoom ? 'img-zoom' : ''}`}
        />
      </div>
      {children}
    </div>
  );
};
