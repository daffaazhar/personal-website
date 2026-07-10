import type { MetadataRoute } from 'next';

import { getNotes } from '@/lib/content/notes';
import { getProjects } from '@/lib/content/projects';
import { getArticles } from '@/lib/content/writing';
import { getSiteUrl } from '@/lib/site-url';

const routes = ['', '/work', '/writing', '/notes', '/about', '/index'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = routes.map((route) => ({
    url: getSiteUrl(route || '/'),
    lastModified: new Date('2026-07-07'),
  }));

  const projectRoutes = (await getProjects()).map((project) => ({
    url: getSiteUrl(`/work/${project.slug}`),
    lastModified: new Date(project.updatedAt),
  }));

  const articleRoutes = (await getArticles()).map((article) => ({
    url: getSiteUrl(`/writing/${article.slug}`),
    lastModified: new Date(article.updatedAt),
  }));

  const noteRoutes = (await getNotes()).map((note) => ({
    url: getSiteUrl(`/notes/${note.slug}`),
    lastModified: new Date(note.updatedAt),
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes, ...noteRoutes];
}
