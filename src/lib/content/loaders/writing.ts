import { loadRegistryEntry, loadRegistryMetadata } from '@/lib/content/loaders/shared';
import { writingRegistry } from '@/lib/content/registries/writing';
import { byPublishedDateDesc, toStaticParams } from '@/lib/content/sorting';
import type { ArticleMetadata, LoadedContentEntry } from '@/lib/content/types';
import { assertArticleMetadata } from '@/lib/content/validators';

const writingEntries = Object.entries(writingRegistry);
let allArticleMetadataPromise: Promise<ArticleMetadata[]> | undefined;

function loadAllArticleMetadata() {
  if (!allArticleMetadataPromise) {
    allArticleMetadataPromise = Promise.all(
      writingEntries.map(([slug, entry]) =>
        loadRegistryMetadata('article', slug, entry, assertArticleMetadata),
      ),
    ).then((items) => {
      const projectSlugs = new Set([
        'calme',
        'eco-in',
        'work-fusion',
        'event-booking-platform',
        'deployment-infrastructure',
        'legacy-retail-management-system',
      ]);

      for (const item of items) {
        for (const relatedSlug of item.relatedProjects) {
          if (!projectSlugs.has(relatedSlug)) {
            throw new Error(
              `[content:article] ${item.slug}: relatedProjects slug "${relatedSlug}" was not found in work registry.`,
            );
          }
        }
      }

      return items;
    });
  }

  return allArticleMetadataPromise;
}

export async function getAllArticlesIncludingDrafts(): Promise<ArticleMetadata[]> {
  const items = await loadAllArticleMetadata();
  return items.sort(byPublishedDateDesc);
}

export async function getArticles(): Promise<ArticleMetadata[]> {
  const items = await getAllArticlesIncludingDrafts();
  return items.filter((item) => item.contentStatus === 'published');
}

export async function getFeaturedArticles(): Promise<ArticleMetadata[]> {
  const items = await getArticles();
  return items.filter((item) => item.featured);
}

export async function getArticleBySlug(
  slug: string,
): Promise<LoadedContentEntry<ArticleMetadata> | null> {
  const metadata = (await getArticles()).find((item) => item.slug === slug);

  if (!metadata) {
    return null;
  }

  const registryEntry = writingRegistry[slug as keyof typeof writingRegistry];
  return loadRegistryEntry('article', slug, registryEntry, assertArticleMetadata);
}

export async function getArticleStaticParams() {
  return toStaticParams(await getArticles());
}

export async function getAdjacentArticles(slug: string) {
  const ordered = await getArticles();
  const index = ordered.findIndex((item) => item.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: ordered[index - 1] ?? null,
    next: ordered[index + 1] ?? null,
  };
}
