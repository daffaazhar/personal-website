import type { BaseContentMetadata } from '@/lib/content/types';

export function onlyPublished<T extends BaseContentMetadata>(items: T[]) {
  return items.filter((item) => item.contentStatus === 'published');
}
