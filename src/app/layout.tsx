import type { Metadata } from 'next';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Daffa Azhar',
    template: '%s · Daffa Azhar',
  },
  description:
    'Software engineer building dependable digital products from interface to infrastructure.',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="app-root">
          <SiteHeader />
          <main id="main-content" className="page-shell">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
