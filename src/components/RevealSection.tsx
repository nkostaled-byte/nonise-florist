import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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
  // Keep the first render identical to the prerendered HTML, then hide
  // below-the-fold sections before paint so they can reveal on scroll.
  const [visible, setVisible] = useState(true);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined' || immediate) return;
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setVisible(false);
  }, [immediate]);

  useEffect(() => {
    if (visible) return;

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
