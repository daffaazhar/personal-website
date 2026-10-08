import type { MetadataRoute } from 'next';

import { getProjects } from '@/lib/content/projects';
import { getArticles } from '@/lib/content/writing';
import { getSiteUrl } from '@/lib/site-url';

const routes = ['', '/work', '/writing', '/about', '/index'];

function latestContentUpdate(items: { updatedAt: string }[]) {
  return items.reduce<string | undefined>(
    (latest, item) => (!latest || item.updatedAt > latest ? item.updatedAt : latest),
    undefined,
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()]);
  // Known content freshness for collection pages; omit unknown template/profile dates.
  const collectionUpdates: Record<string, string | undefined> = {
    '/work': latestContentUpdate(projects),
    '/writing': latestContentUpdate(articles),
    '/index': latestContentUpdate([...projects, ...articles]),
  };
  const staticRoutes = routes.map((route) => ({
    url: getSiteUrl(route || '/'),
    ...(collectionUpdates[route] ? { lastModified: new Date(collectionUpdates[route]) } : {}),
  }));

  const projectRoutes = projects.map((project) => ({
    url: getSiteUrl(`/work/${project.slug}`),
    lastModified: new Date(project.updatedAt),
  }));

  const articleRoutes = articles.map((article) => ({
    url: getSiteUrl(`/writing/${article.slug}`),
    lastModified: new Date(article.updatedAt),
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
