export function byPublishedDateDesc<T extends { publishedAt: string }>(a: T, b: T) {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export function byFeaturedOrder<T extends { featuredOrder: number | null }>(a: T, b: T) {
  return (
    (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER)
  );
}

export function toStaticParams(items: { slug: string }[]) {
  return items.map((item) => ({ slug: item.slug }));
}
