import { articles } from '@/content/writing';
import { type Article, validateArticles } from '@/lib/content/schemas';
import { byPublishedDateDesc, toStaticParams } from '@/lib/content/shared';

validateArticles(articles);

export function getArticles(): Article[] {
  return [...articles].sort(byPublishedDateDesc);
}

export function getFeaturedArticles(): Article[] {
  return getArticles().filter((article) => article.featured);
}

export function getArticleBySlug(slug: string): Article | null {
  return articles.find((article) => article.slug === slug) ?? null;
}

export function getArticleStaticParams() {
  return toStaticParams(articles);
}
