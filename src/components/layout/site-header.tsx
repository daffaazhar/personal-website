import Link from 'next/link';

import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { PrimaryNavigation } from '@/components/layout/primary-navigation';
import { siteConfig } from '@/lib/site-config';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container site-header__bar">
        <Link className="site-brand" href="/" aria-label={`${siteConfig.name} home`}>
          <svg className="site-brand__mark" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" fill="var(--color-accent)" />
          </svg>
          <span className="site-brand__name">{siteConfig.name}</span>
        </Link>

        <PrimaryNavigation />
        <MobileNavigation />
      </div>
    </header>
  );
}
