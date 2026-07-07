import { notes } from '@/content/notes';
import { type Note, validateNotes } from '@/lib/content/schemas';
import { byPublishedDateDesc, toStaticParams } from '@/lib/content/shared';

validateNotes(notes);

export function getNotes(): Note[] {
  return [...notes].sort(byPublishedDateDesc);
}

export function getNoteBySlug(slug: string): Note | null {
  return notes.find((note) => note.slug === slug) ?? null;
}

export function getNoteStaticParams() {
  return toStaticParams(notes);
}
