import { loadRegistryEntry, loadRegistryMetadata } from '@/lib/content/loaders/shared';
import { workRegistry } from '@/lib/content/registries/work';
import { byFeaturedOrder, byPublishedDateDesc, toStaticParams } from '@/lib/content/sorting';
import type { LoadedContentEntry, ProjectMetadata } from '@/lib/content/types';
import { assertProjectMetadata } from '@/lib/content/validators';

const workEntries = Object.entries(workRegistry);
let allProjectMetadataPromise: Promise<ProjectMetadata[]> | undefined;

function loadAllProjectMetadata() {
  if (!allProjectMetadataPromise) {
    allProjectMetadataPromise = Promise.all(
      workEntries.map(([slug, entry]) =>
        loadRegistryMetadata('project', slug, entry, assertProjectMetadata),
      ),
    ).then((items) => {
      const writingSlugs = new Set([
        'building-audit-trails-that-survive-service-failure',
        'integrating-payment-gateway-nextjs-laravel',
        'deploying-laravel-with-gitlab-ci-cd',
        'recovering-from-supervisor-worker-failures',
        'synchronizing-multiple-git-remotes',
      ]);

      for (const item of items) {
        for (const relatedSlug of item.relatedWriting) {
          if (!writingSlugs.has(relatedSlug)) {
            throw new Error(
              `[content:project] ${item.slug}: relatedWriting slug "${relatedSlug}" was not found in writing registry.`,
            );
          }
        }
      }

      return items;
    });
  }

  return allProjectMetadataPromise;
}

export async function getAllProjectsIncludingDrafts(): Promise<ProjectMetadata[]> {
  const items = await loadAllProjectMetadata();
  return items.sort(byPublishedDateDesc);
}

export async function getProjects(): Promise<ProjectMetadata[]> {
  const items = await getAllProjectsIncludingDrafts();
  return items.filter((item) => item.contentStatus === 'published');
}

export async function getFeaturedProjects(): Promise<ProjectMetadata[]> {
  const items = await getProjects();
  return items.filter((item) => item.featured).sort(byFeaturedOrder);
}

export async function getProjectBySlug(
  slug: string,
): Promise<LoadedContentEntry<ProjectMetadata> | null> {
  const metadata = (await getProjects()).find((item) => item.slug === slug);

  if (!metadata) {
    return null;
  }

  const registryEntry = workRegistry[slug as keyof typeof workRegistry];
  return loadRegistryEntry('project', slug, registryEntry, assertProjectMetadata);
}

export async function getProjectStaticParams() {
  return toStaticParams(await getProjects());
}

export async function getAdjacentProjects(slug: string) {
  const ordered = await getProjects();
  const index = ordered.findIndex((item) => item.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: ordered[index - 1] ?? null,
    next: ordered[index + 1] ?? null,
  };
}
