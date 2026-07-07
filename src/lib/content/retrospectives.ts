import { retrospectives } from '@/content/retrospectives';
import { type Retrospective, validateRetrospectives } from '@/lib/content/schemas';
import { byYearDesc } from '@/lib/content/shared';

validateRetrospectives(retrospectives);

export function getRetrospectives(): Retrospective[] {
  return [...retrospectives].sort(byYearDesc);
}

export function getRetrospectiveBySlug(slug: string): Retrospective | null {
  return retrospectives.find((retrospective) => retrospective.slug === slug) ?? null;
}
