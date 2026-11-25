import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { responsiveImage } from '../lib/imageManifest';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface EditorialImageProps {
  src: string;
  alt: string;
  /** Layout width hint for responsive srcSet selection, e.g. '(min-width: 1024px) 25vw, 50vw' */
  sizes?: string;
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
  sizes,
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
  // Render visible on the server and on the first client pass so hydration
  // matches, then hide below-the-fold frames before paint to animate them in.
  const [visible, setVisible] = useState(true);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined' || immediate) return;
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setVisible(false);
  }, [immediate]);

  useEffect(() => {
    if (visible) return;

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

  const imageAttrs = responsiveImage(src);

  return (
    <div ref={containerRef} className={`img-reveal-shell relative ${wrapperClassName}`}>
      <div
        style={{ '--reveal-delay': `${delayMs}ms` } as React.CSSProperties}
        className={`img-reveal-frame ${visible ? 'img-reveal-visible' : 'img-reveal-hidden'}`}
      >
        <img
          src={src}
          srcSet={sizes ? imageAttrs.srcSet : undefined}
          sizes={sizes}
          width={imageAttrs.width}
          height={imageAttrs.height}
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
