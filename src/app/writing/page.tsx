import type { Metadata } from 'next';

import { ArticleRow } from '@/components/content/article-row';
import { PageIntro } from '@/components/content/page-intro';
import { Reveal } from '@/components/motion/reveal';
import { formatDisplayDate } from '@/lib/dates';
import { getArticles, getFeaturedArticles } from '@/lib/content/writing';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Technical explanations, mental models, and reflections from building software.',
  alternates: {
    canonical: '/writing',
  },
};

export default async function WritingPage() {
  const featuredArticles = await getFeaturedArticles();
  const featuredSlugs = new Set(featuredArticles.map((article) => article.slug));
  const archiveArticles = (await getArticles()).filter(
    (article) => !featuredSlugs.has(article.slug),
  );

  return (
    <>
      <PageIntro
        eyebrow="03 / Writing"
        title="Technical explanations, mental models, and reflections."
        description="Long-form writing about architecture, reliability, and the engineering trade-offs behind real product work."
      />
      {featuredArticles.length > 0 ? (
        <Reveal delay="short" mode="load">
          <section className="work-list site-container" aria-labelledby="featured-writing-heading">
            <h2 id="featured-writing-heading" className="work-list__heading">
              Featured writing
            </h2>
            <div className="work-list__rows">
              {featuredArticles.map((article) => (
                <ArticleRow
                  key={article.slug}
                  title={article.title}
                  description={article.description}
                  href={`/writing/${article.slug}`}
                  date={formatDisplayDate(article.publishedAt)}
                  dateTime={article.publishedAt}
                  topics={article.topics}
                  readingTime={article.readingTime}
                />
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}
      {archiveArticles.length > 0 ? (
        <Reveal>
          <section className="work-list site-container" aria-labelledby="archive-writing-heading">
            <h2 id="archive-writing-heading" className="work-list__heading">
              Archive
            </h2>
            <div className="work-list__rows">
              {archiveArticles.map((article) => (
                <ArticleRow
                  key={article.slug}
                  title={article.title}
                  description={article.description}
                  href={`/writing/${article.slug}`}
                  date={formatDisplayDate(article.publishedAt)}
                  dateTime={article.publishedAt}
                  topics={article.topics}
                  readingTime={article.readingTime}
                />
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}
    </>
  );
}
