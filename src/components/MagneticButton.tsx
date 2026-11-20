import React, { useEffect, useRef } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  labelStrength?: number;
}

/**
 * Tactile magnetic CTA button using native pointer events & direct DOM transforms.
 * Zero React re-renders on pointer move; automatically disabled on touch devices
 * and when prefers-reduced-motion is active.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 7,
  labelStrength = 3.5,
  onClick,
  type = 'button',
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef({ bx: 0, by: 0, lx: 0, ly: 0 });
  const targetRef = useRef({ bx: 0, by: 0, lx: 0, ly: 0 });

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)');

    const canAnimate = () => !reducedMotion.matches && finePointer.matches;

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      const ease = 0.16;

      cur.bx += (tgt.bx - cur.bx) * ease;
      cur.by += (tgt.by - cur.by) * ease;
      cur.lx += (tgt.lx - cur.lx) * ease;
      cur.ly += (tgt.ly - cur.ly) * ease;

      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate3d(${cur.bx.toFixed(2)}px, ${cur.by.toFixed(2)}px, 0)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${cur.lx.toFixed(2)}px, ${cur.ly.toFixed(2)}px, 0)`;
      }

      const settled =
        Math.abs(tgt.bx - cur.bx) < 0.04 &&
        Math.abs(tgt.by - cur.by) < 0.04 &&
        Math.abs(tgt.lx - cur.lx) < 0.04 &&
        Math.abs(tgt.ly - cur.ly) < 0.04;

      if (!settled) {
        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        if (tgt.bx === 0 && tgt.by === 0 && buttonRef.current && contentRef.current) {
          buttonRef.current.style.transform = '';
          contentRef.current.style.transform = '';
        }
        rafRef.current = null;
      }
    };

    const scheduleTick = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!canAnimate() || e.pointerType !== 'mouse') return;
      const rect = btn.getBoundingClientRect();
      const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const clampedX = Math.max(-1, Math.min(1, relX));
      const clampedY = Math.max(-1, Math.min(1, relY));

      targetRef.current = {
        bx: clampedX * strength,
        by: clampedY * (strength * 0.72),
        lx: clampedX * labelStrength,
        ly: clampedY * (labelStrength * 0.72),
      };
      scheduleTick();
    };

    const handlePointerLeave = () => {
      targetRef.current = { bx: 0, by: 0, lx: 0, ly: 0 };
      scheduleTick();
    };

    btn.addEventListener('pointermove', handlePointerMove, { passive: true });
    btn.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      btn.removeEventListener('pointermove', handlePointerMove);
      btn.removeEventListener('pointerleave', handlePointerLeave);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [strength, labelStrength]);

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={`will-change-transform ${className}`}
      {...rest}
    >
      <span
        ref={contentRef}
        className="inline-flex items-center justify-center gap-2.5 will-change-transform"
      >
        {children}
      </span>
    </button>
  );
};
