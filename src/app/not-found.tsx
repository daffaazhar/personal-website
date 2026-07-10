import type { Metadata } from 'next';
import Link from 'next/link';

import { PageIntro } from '@/components/content/page-intro';
import { SkeletonNote } from '@/components/content/skeleton-note';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The requested page does not exist in this archive.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="404 / Not found"
        title="This page is not in the archive."
        description="The route may be unfinished, moved, or waiting for verified content."
      />
      <SkeletonNote>
        <Link href="/index">Return to the index archive ↗</Link>
      </SkeletonNote>
    </>
  );
}
