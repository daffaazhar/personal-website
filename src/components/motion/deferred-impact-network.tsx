'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const ImpactNetworkCanvas = dynamic(
  () =>
    import('@/components/motion/impact-network-canvas').then(
      (module) => module.ImpactNetworkCanvas,
    ),
  {
    ssr: false,
  },
);

type DeferredImpactNetworkProps = {
  describedBy: string;
};

export function DeferredImpactNetwork({ describedBy }: DeferredImpactNetworkProps) {
  const [isActive, setIsActive] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = hostRef.current;

    if (!node || isActive) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '240px 0px',
        threshold: 0.01,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isActive]);

  return (
    <div ref={hostRef} className="impact-network-shell">
      {isActive ? (
        <ImpactNetworkCanvas describedBy={describedBy} />
      ) : (
        <div className="impact-network" aria-describedby={describedBy} aria-hidden="true" />
      )}
    </div>
  );
}
