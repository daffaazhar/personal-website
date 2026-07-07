export type StaticParam = {
  slug: string;
};

export function byPublishedDateDesc<T extends { publishedAt: string }>(a: T, b: T) {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export function byYearDesc<T extends { year: number }>(a: T, b: T) {
  return b.year - a.year;
}

export function byStartDesc<T extends { start: string }>(a: T, b: T) {
  return b.start.localeCompare(a.start);
}

export function byFeaturedOrder<T extends { featuredOrder: number | null }>(a: T, b: T) {
  return (
    (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER)
  );
}

export function toStaticParams(items: { slug: string }[]): StaticParam[] {
  return items.map((item) => ({ slug: item.slug }));
}
