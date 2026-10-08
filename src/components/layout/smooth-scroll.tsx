'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { installScrollInertia } from '@/lib/scroll-inertia';

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.app-root');
    if (!root) return;

    // Next owns scroll restoration. A fresh instance cannot retain the previous
    // route's wheel target, and cleanup is safe during StrictMode rehearsal.
    return installScrollInertia(root);
  }, [pathname]);

  return null;
}
