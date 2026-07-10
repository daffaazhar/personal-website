import { retrospectives } from '@/content/retrospectives';
import { type Retrospective, validateRetrospectives } from '@/lib/content/schemas';
import { byYearDesc } from '@/lib/content/shared';

validateRetrospectives(retrospectives);

export function getRetrospectives(): Retrospective[] {
  return retrospectives
    .filter((retrospective) => retrospective.contentStatus === 'published')
    .sort(byYearDesc);
}

export function getRetrospectiveBySlug(slug: string): Retrospective | null {
  return getRetrospectives().find((retrospective) => retrospective.slug === slug) ?? null;
}
