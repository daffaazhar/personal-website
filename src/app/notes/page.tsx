import Link from 'next/link';

import { PageIntro } from '@/components/content/page-intro';
import { SkeletonNote } from '@/components/content/skeleton-note';
import { formatDisplayDate } from '@/lib/dates';
import { getNotes } from '@/lib/content/notes';

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <>
      <PageIntro
        eyebrow="04 / Notes"
        title="Notes and fragments."
        description="Short, practical records of commands, debugging details, and small lessons worth keeping."
      />
      {notes.length === 0 ? (
        <SkeletonNote>
          Published notes will appear here after each operational fix has been verified for release.
        </SkeletonNote>
      ) : (
        <section className="work-list site-container" aria-labelledby="notes-list-heading">
          <h2 id="notes-list-heading" className="work-list__heading">
            Notes
          </h2>
          <div className="work-list__rows">
            {notes.map((note) => (
              <article className="article-row" key={note.slug}>
                <time dateTime={note.lastTestedAt}>{formatDisplayDate(note.lastTestedAt)}</time>
                <div>
                  <h3 className="article-row__title">
                    <Link href={`/notes/${note.slug}`}>{note.title}</Link>
                  </h3>
                  <p>{note.description}</p>
                  <span>{note.topics.slice(0, 2).join(' · ') || 'Operational note'}</span>
                </div>
                <Link
                  className="article-row__arrow"
                  href={`/notes/${note.slug}`}
                  aria-label={`Read ${note.title}`}
                >
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
