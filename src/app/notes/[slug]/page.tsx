import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/content/breadcrumbs';
import { MetadataList } from '@/components/content/metadata-list';
import { ProjectToc } from '@/components/content/project-toc';
import { Reveal } from '@/components/motion/reveal';
import { StructuredData } from '@/components/seo/structured-data';
import { getArticleBySlug } from '@/lib/content/writing';
import { formatDisplayDate } from '@/lib/dates';
import { getNoteBySlug, getNoteStaticParams } from '@/lib/content/notes';
import {
  buildBreadcrumbStructuredData,
  buildNoteMetadata,
  buildNoteStructuredData,
} from '@/lib/seo';

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

  return buildNoteMetadata(noteEntry.metadata);
}

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { slug } = await params;
  const noteEntry = await getNoteBySlug(slug);

  if (!noteEntry) {
    notFound();
  }

  const note = noteEntry.metadata;
  const { Content, toc } = noteEntry;
  const relatedArticle = note.relatedArticle ? await getArticleBySlug(note.relatedArticle) : null;

  return (
    <article className="article-detail note-detail">
      <StructuredData data={buildNoteStructuredData(note)} />
      <StructuredData
        data={buildBreadcrumbStructuredData([
          { label: 'Notes', path: '/notes' },
          { label: note.title, path: `/notes/${note.slug}` },
        ])}
      />
      <Reveal mode="load">
        <header className="article-detail__hero site-container">
          <div className="article-detail__hero-copy">
            <Breadcrumbs items={[{ label: 'Notes', href: '/notes' }, { label: note.title }]} />
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
          {relatedArticle ? (
            <Reveal>
              <section
                className="article-section article-related"
                aria-labelledby="related-article"
              >
                <h2 id="related-article">Related writing</h2>
                <p>
                  <Link className="text-link" href={`/writing/${relatedArticle.metadata.slug}`}>
                    <span>Read {relatedArticle.metadata.title}</span>
                    <span className="text-link__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                </p>
              </section>
            </Reveal>
          ) : null}
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
