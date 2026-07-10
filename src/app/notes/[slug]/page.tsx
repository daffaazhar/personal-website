import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MetadataList } from '@/components/content/metadata-list';
import { ProjectToc } from '@/components/content/project-toc';
import { Reveal } from '@/components/motion/reveal';
import { formatDisplayDate } from '@/lib/dates';
import { getNoteBySlug, getNoteStaticParams } from '@/lib/content/notes';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getNoteStaticParams();
}

type NoteDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: NoteDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const noteEntry = await getNoteBySlug(slug);

  if (!noteEntry) {
    return {};
  }

  const note = noteEntry.metadata;

  return {
    title: note.title,
    description: note.description,
    alternates: {
      canonical: `/notes/${note.slug}`,
    },
  };
}

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { slug } = await params;
  const noteEntry = await getNoteBySlug(slug);

  if (!noteEntry) {
    notFound();
  }

  const note = noteEntry.metadata;
  const { Content, toc } = noteEntry;

  return (
    <article className="article-detail note-detail">
      <Reveal mode="load">
        <header className="article-detail__hero site-container">
          <div className="article-detail__hero-copy">
            <span className="eyebrow">Notes / Detail</span>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
          <MetadataList
            columns={4}
            items={[
              { label: 'Published', value: formatDisplayDate(note.publishedAt) },
              { label: 'Updated', value: formatDisplayDate(note.updatedAt) },
              { label: 'Last tested', value: formatDisplayDate(note.lastTestedAt) },
              {
                label: 'Topics',
                value: note.topics.length > 0 ? note.topics.join(' · ') : 'Operational note',
              },
            ]}
          />
          {toc.length > 0 ? (
            <div className="article-detail__inline-toc">
              <ProjectToc items={toc} variant="inline" />
            </div>
          ) : null}
        </header>
      </Reveal>

      <div className="article-detail__layout site-container">
        <div className="article-detail__content">
          <Reveal>
            <div className="article-section article-section--mdx note-detail__content">
              <Content />
            </div>
          </Reveal>
        </div>
        {toc.length > 0 ? (
          <aside className="article-detail__toc-rail" aria-label="Table of contents">
            <ProjectToc items={toc} variant="rail" />
          </aside>
        ) : null}
      </div>
    </article>
  );
}
