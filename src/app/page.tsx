import type { Metadata } from 'next';

import { PersonalHomepage } from '@/components/home/personal-homepage';
import { StructuredData } from '@/components/seo/structured-data';
import {
  buildPageMetadata,
  buildPersonStructuredData,
  buildWebsiteStructuredData,
} from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <StructuredData data={buildPersonStructuredData()} />
      <StructuredData data={buildWebsiteStructuredData()} />
      <PersonalHomepage />
    </>
  );
}
