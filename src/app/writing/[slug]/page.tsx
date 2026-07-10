import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MetadataList } from '@/components/content/metadata-list';
import { ProjectToc } from '@/components/content/project-toc';
import { Reveal } from '@/components/motion/reveal';
import { formatDisplayDate } from '@/lib/dates';
import { getProjectBySlug } from '@/lib/content/projects';
import {
  getAdjacentArticles,
  getArticleBySlug,
  getArticleStaticParams,
} from '@/lib/content/writing';
import { siteConfig } from '@/lib/site-config';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getArticleStaticParams();
}

type ArticleDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const articleEntry = await getArticleBySlug(slug);

  if (!articleEntry) {
    return {};
  }

  const article = articleEntry.metadata;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/writing/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} · ${siteConfig.name}`,
      description: article.description,
      url: `/writing/${article.slug}`,
      siteName: siteConfig.name,
      type: 'article',
      images: getPrimaryArticleImage(article),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} · ${siteConfig.name}`,
      description: article.description,
      images: getPrimaryArticleImage(article)?.map((image) => image.url),
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const articleEntry = await getArticleBySlug(slug);

  if (!articleEntry) {
    notFound();
  }

  const article = articleEntry.metadata;
  const { Content, toc } = articleEntry;
  const relatedProjects = await Promise.all(
    article.relatedProjects.map((projectSlug) => getProjectBySlug(projectSlug)),
  );
  const relatedProject = relatedProjects.find(Boolean);
  const adjacentArticles = await getAdjacentArticles(article.slug);

  return (
    <article className="article-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createArticleStructuredData(article)) }}
      />
      <Reveal mode="load">
        <header className="article-detail__hero site-container">
          <div className="article-detail__hero-copy">
            <span className="eyebrow">Writing / Article</span>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
          </div>
          <MetadataList
            columns={4}
            items={[
              { label: 'Published', value: formatDisplayDate(article.publishedAt) },
              { label: 'Updated', value: formatDisplayDate(article.updatedAt) },
              { label: 'Reading time', value: `${article.readingTime} min` },
              { label: 'Topics', value: article.topics.join(' · ') },
            ]}
          />
          <div className="article-detail__inline-toc">
            <ProjectToc items={toc} variant="inline" />
          </div>
        </header>
      </Reveal>

      <div className="article-detail__layout site-container">
        <div className="article-detail__content">
          <Reveal>
            <div className="article-section article-section--mdx">
              <Content />
            </div>
          </Reveal>

          {relatedProject ? (
            <Reveal>
              <section
                className="article-section article-related"
                aria-labelledby="related-content"
              >
                <h2 id="related-content">Related content</h2>
                <p>
                  <Link className="text-link" href={`/work/${relatedProject.metadata.slug}`}>
                    <span>Read the {relatedProject.metadata.title} case study</span>
                    <span className="text-link__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                </p>
              </section>
            </Reveal>
          ) : null}

          {adjacentArticles.previous || adjacentArticles.next ? (
            <Reveal>
              <nav className="article-pagination" aria-label="Article navigation">
                {adjacentArticles.previous ? (
                  <Link
                    className="article-pagination__item"
                    href={`/writing/${adjacentArticles.previous.slug}`}
                  >
                    <span className="article-pagination__label">Previous</span>
                    <span className="article-pagination__title">
                      {adjacentArticles.previous.title}
                    </span>
                  </Link>
                ) : (
                  <span className="article-pagination__item article-pagination__item--empty" />
                )}
                {adjacentArticles.next ? (
                  <Link
                    className="article-pagination__item"
                    href={`/writing/${adjacentArticles.next.slug}`}
                  >
                    <span className="article-pagination__label">Next</span>
                    <span className="article-pagination__title">{adjacentArticles.next.title}</span>
                  </Link>
                ) : (
                  <span className="article-pagination__item article-pagination__item--empty" />
                )}
              </nav>
            </Reveal>
          ) : null}
        </div>
        <aside className="article-detail__toc-rail" aria-label="Table of contents">
          <ProjectToc items={toc} variant="rail" />
        </aside>
      </div>
    </article>
  );
}

function createArticleStructuredData(
  article: NonNullable<Awaited<ReturnType<typeof getArticleBySlug>>>['metadata'],
) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/writing/${article.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
  };
}

function getPrimaryArticleImage(
  article: NonNullable<Awaited<ReturnType<typeof getArticleBySlug>>>['metadata'],
) {
  if (!article.cover) {
    return undefined;
  }

  return [
    {
      url: article.cover.src,
      width: article.cover.width,
      height: article.cover.height,
      alt: article.cover.alt,
    },
  ];
}
