import { notFound } from 'next/navigation';

import { PageIntro } from '@/components/content/page-intro';
import { SkeletonNote } from '@/components/content/skeleton-note';
import { getArticleBySlug, getArticleStaticParams } from '@/lib/content/writing';

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleStaticParams();
}

type ArticleDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageIntro
        eyebrow="Writing / Article"
        title={article.title}
        description={article.description}
      />
      <SkeletonNote>
        TODO: Add typed article body, figures, code blocks, and related content. Current content
        status: {article.contentStatus}.
      </SkeletonNote>
    </>
  );
}
