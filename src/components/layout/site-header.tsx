import Link from 'next/link';

import { StatusLine } from '@/components/content/status-line';
import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { PrimaryNavigation } from '@/components/layout/primary-navigation';
import { siteConfig } from '@/lib/site-config';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container site-header__bar">
        <Link className="site-brand" href="/" aria-label={`${siteConfig.name} home`}>
          <span className="site-brand__mark" aria-hidden="true">
            {siteConfig.monogram}
          </span>
          <span className="site-brand__name">{siteConfig.name}</span>
        </Link>

        <PrimaryNavigation />
        <MobileNavigation />
      </div>
      <StatusLine />
    </header>
  );
}
