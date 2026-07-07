import { notFound } from 'next/navigation';

import { PageIntro } from '@/components/content/page-intro';
import { SkeletonNote } from '@/components/content/skeleton-note';
import { getNoteBySlug, getNoteStaticParams } from '@/lib/content/notes';

export const dynamicParams = false;

export function generateStaticParams() {
  return getNoteStaticParams();
}

type NoteDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <>
      <PageIntro eyebrow="Notes / Detail" title={note.title} description={note.description} />
      <SkeletonNote>
        TODO: Add concise note body, command blocks, expected output, and caveats. Current content
        status: {note.contentStatus}.
      </SkeletonNote>
    </>
  );
}
