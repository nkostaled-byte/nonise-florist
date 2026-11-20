import React, { useEffect, useRef, useState } from 'react';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Optional stagger delay in milliseconds (scaled down automatically on tablet/mobile) */
  delayMs?: number;
  /** 'up' = subtle vertical rise + opacity fade; 'fade' = opacity-only */
  variant?: 'up' | 'fade';
  /** Set true for above-the-fold page headers that should reveal immediately on mount */
  immediate?: boolean;
}

/**
 * Restrained one-shot viewport reveal via IntersectionObserver.
 * Animates only opacity & GPU translate3d; immediately visible when
 * prefers-reduced-motion is enabled or IntersectionObserver is unavailable.
 */
export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  id,
  delayMs = 0,
  variant = 'up',
  immediate = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
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

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -28px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, immediate]);

  const hiddenClass = variant === 'fade' ? 'reveal-hidden-fade' : 'reveal-hidden';

  return (
    <div
      id={id}
      ref={ref}
      style={{ '--reveal-delay': `${delayMs}ms` } as React.CSSProperties}
      className={`reveal-block ${visible ? 'reveal-visible' : hiddenClass} ${className}`}
    >
      {children}
    </div>
  );
};
