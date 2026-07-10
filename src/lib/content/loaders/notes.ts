import { loadRegistryEntry, loadRegistryMetadata } from '@/lib/content/loaders/shared';
import { notesRegistry } from '@/lib/content/registries/notes';
import { byPublishedDateDesc, toStaticParams } from '@/lib/content/sorting';
import type { LoadedContentEntry, NoteMetadata } from '@/lib/content/types';
import { assertNoteMetadata } from '@/lib/content/validators';

const noteEntries = Object.entries(notesRegistry);
let allNoteMetadataPromise: Promise<NoteMetadata[]> | undefined;

function loadAllNoteMetadata() {
  if (!allNoteMetadataPromise) {
    allNoteMetadataPromise = Promise.all(
      noteEntries.map(([slug, entry]) =>
        loadRegistryMetadata('note', slug, entry, assertNoteMetadata),
      ),
    ).then((items) => {
      const articleSlugs = new Set([
        'building-audit-trails-that-survive-service-failure',
        'integrating-payment-gateway-nextjs-laravel',
        'deploying-laravel-with-gitlab-ci-cd',
        'recovering-from-supervisor-worker-failures',
        'synchronizing-multiple-git-remotes',
      ]);

      for (const item of items) {
        if (item.relatedArticle && !articleSlugs.has(item.relatedArticle)) {
          throw new Error(
            `[content:note] ${item.slug}: relatedArticle slug "${item.relatedArticle}" was not found in writing registry.`,
          );
        }
      }

      return items;
    });
  }

  return allNoteMetadataPromise;
}

export async function getAllNotesIncludingDrafts(): Promise<NoteMetadata[]> {
  const items = await loadAllNoteMetadata();
  return items.sort(byPublishedDateDesc);
}

export async function getNotes(): Promise<NoteMetadata[]> {
  const items = await getAllNotesIncludingDrafts();
  return items.filter((item) => item.contentStatus === 'published');
}

export async function getNoteBySlug(
  slug: string,
): Promise<LoadedContentEntry<NoteMetadata> | null> {
  const metadata = (await getNotes()).find((item) => item.slug === slug);

  if (!metadata) {
    return null;
  }

  const registryEntry = notesRegistry[slug as keyof typeof notesRegistry];
  return loadRegistryEntry('note', slug, registryEntry, assertNoteMetadata);
}

export async function getNoteStaticParams() {
  return toStaticParams(await getNotes());
}
