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
  const [state, setState] = useState<'visible' | 'pending'>(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return 'visible';
    }

    return mode === 'load' ? 'pending' : 'visible';
  });

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (mode === 'load') {
      const frame = window.requestAnimationFrame(() => setState('visible'));
      return () => window.cancelAnimationFrame(frame);
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
        threshold: 0.16,
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
