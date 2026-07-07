'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { primaryNavigation } from '@/lib/site-config';

export function PrimaryNavigation() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      {primaryNavigation.map((item) => (
        <Link
          className="site-nav__link"
          key={item.href}
          href={item.href}
          aria-current={pathname === item.href ? 'page' : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
