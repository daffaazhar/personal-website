import { experience } from '@/content/experience';
import { type Experience, validateExperience } from '@/lib/content/schemas';
import { byStartDesc } from '@/lib/content/shared';

validateExperience(experience);

export function getExperience(): Experience[] {
  return [...experience].sort(byStartDesc);
}
