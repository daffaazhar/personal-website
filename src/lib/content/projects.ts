import { projects } from '@/content/projects';
import { type Project, validateProjects } from '@/lib/content/schemas';
import { byFeaturedOrder, byPublishedDateDesc, toStaticParams } from '@/lib/content/shared';

validateProjects(projects);

export function getProjects(): Project[] {
  return [...projects].sort(byPublishedDateDesc);
}

export function getFeaturedProjects(): Project[] {
  return getProjects()
    .filter((project) => project.featured)
    .sort(byFeaturedOrder);
}

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getProjectStaticParams() {
  return toStaticParams(projects);
}
