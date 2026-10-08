'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 'none' | 'short';
  mode?: 'scroll' | 'load';
};

export function Reveal({ children, className, delay = 'none', mode = 'scroll' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Hydration must start with the same markup regardless of browser preferences.
  // Reduced-motion CSS exposes pending content immediately without movement.
  const [state, setState] = useState<'visible' | 'pending'>(
    mode === 'load' ? 'pending' : 'visible',
  );

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (mode === 'load') {
      // Settle even under reduced motion so a later preference change cannot
      // expose a permanently pending reveal. CSS prevents reduced movement.
      const frame = window.requestAnimationFrame(() => setState('visible'));
      return () => window.cancelAnimationFrame(frame);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const initialBounds = element.getBoundingClientRect();
    const revealThreshold = window.innerHeight * 0.72;

    if (initialBounds.top < revealThreshold) {
      return;
    }

    setState('pending');

    const observer = new IntersectionObserver(
      ([entry], currentObserver) => {
        if (entry?.isIntersecting) {
          setState('visible');
          currentObserver.disconnect();
        }
      },
      {
        rootMargin: '0px 0px -5% 0px',
        // Long reading surfaces can exceed the viewport many times over.
        // Reveal on entry, not a fraction of the entire element's height.
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [mode]);

  return (
    <div
      ref={ref}
      className={['motion-reveal', className].filter(Boolean).join(' ')}
      data-reveal-state={state}
      data-reveal-delay={delay}
    >
      {children}
    </div>
  );
}
