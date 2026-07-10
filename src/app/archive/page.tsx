import Link from 'next/link';

import { PageIntro } from '@/components/content/page-intro';
import { Reveal } from '@/components/motion/reveal';
import { getArchiveGroups } from '@/lib/content/archive';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Index',
  description:
    'A text-first archive of published work, writing, notes, experience, and retrospectives.',
  path: '/index',
});

export default async function ArchivePage() {
  const groups = (await getArchiveGroups()).filter((group) => group.count > 0);

  return (
    <>
      <PageIntro
        eyebrow="06 / Index"
        title="The full archive."
        description="Published work, writing, notes, and archive references collected in one text-first index."
      />
      <Reveal delay="short" mode="load">
        <section className="archive site-container" aria-labelledby="archive-groups-title">
          <h2 id="archive-groups-title" className="sr-only">
            Archive groups
          </h2>
          <div className="archive__groups">
            {groups.map((group) => {
              const headingId = `archive-${group.title.toLowerCase().replace(/\s+/g, '-')}`;

              return (
                <section className="archive-group" key={group.title} aria-labelledby={headingId}>
                  <div className="archive-group__header">
                    <h2 id={headingId}>{group.title}</h2>
                    <span>{String(group.count).padStart(2, '0')}</span>
                  </div>
                  <ol className="archive-group__list">
                    {group.entries.map((entry, index) => (
                      <li className="archive-entry" key={`${group.title}-${entry.title}`}>
                        <span className="archive-entry__index">
                          {`${index + 1}`.padStart(2, '0')}
                        </span>
                        <div className="archive-entry__copy">
                          {entry.href ? (
                            <Link className="archive-entry__title" href={entry.href}>
                              {entry.title}
                            </Link>
                          ) : (
                            <span className="archive-entry__title">{entry.title}</span>
                          )}
                          <span className="archive-entry__meta">{entry.meta}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}
          </div>
        </section>
      </Reveal>
    </>
  );
}
