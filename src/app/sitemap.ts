import type { MetadataRoute } from 'next';

import { getNotes } from '@/lib/content/notes';
import { getProjects } from '@/lib/content/projects';
import { getArticles } from '@/lib/content/writing';

const routes = ['', '/work', '/writing', '/notes', '/about', '/index'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-07-07'),
  }));

  const projectRoutes = getProjects().map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(project.updatedAt),
  }));

  const articleRoutes = getArticles().map((article) => ({
    url: `${baseUrl}/writing/${article.slug}`,
    lastModified: new Date(article.updatedAt),
  }));

  const noteRoutes = getNotes().map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: new Date(note.updatedAt),
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes, ...noteRoutes];
}
