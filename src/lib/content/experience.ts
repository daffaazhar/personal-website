import { experience } from '@/content/experience';
import { type Experience, validateExperience } from '@/lib/content/schemas';
import { byStartDesc } from '@/lib/content/shared';

validateExperience(experience);

export function getExperience(): Experience[] {
  return [...experience].sort(byStartDesc);
}

export function getPublishedExperience(): Experience[] {
  return getExperience().filter((item) => item.contentStatus === 'published' && item.verified);
}

export function getRecentExperience(limit = 2): Experience[] {
  return getPublishedExperience().slice(0, limit);
}
