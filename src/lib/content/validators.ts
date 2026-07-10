import type {
  ArticleMetadata,
  ContentImage,
  ContentLink,
  MdxModule,
  NoteMetadata,
  ProjectMetadata,
} from '@/lib/content/types';

type MetadataKind = 'project' | 'article' | 'note';

function fail(kind: MetadataKind, source: string, message: string): never {
  throw new Error(`[content:${kind}] ${source}: ${message}`);
}

function assertRecord(
  value: unknown,
  kind: MetadataKind,
  source: string,
): asserts value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail(kind, source, 'metadata must be a plain object export.');
  }
}

function expectString(value: unknown, field: string, kind: MetadataKind, source: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(kind, source, `missing or invalid "${field}". Expected non-empty string.`);
  }

  return value;
}

function expectOptionalString(
  value: unknown,
  field: string,
  kind: MetadataKind,
  source: string,
): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  return expectString(value, field, kind, source);
}

function expectBoolean(value: unknown, field: string, kind: MetadataKind, source: string): boolean {
  if (typeof value !== 'boolean') {
    fail(kind, source, `missing or invalid "${field}". Expected boolean.`);
  }

  return value;
}

function expectNumber(value: unknown, field: string, kind: MetadataKind, source: string): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    fail(kind, source, `missing or invalid "${field}". Expected number.`);
  }

  return value;
}

function expectNullableNumber(
  value: unknown,
  field: string,
  kind: MetadataKind,
  source: string,
): number | null {
  if (value === null) {
    return null;
  }

  return expectNumber(value, field, kind, source);
}

function expectNullableString(
  value: unknown,
  field: string,
  kind: MetadataKind,
  source: string,
): string | null {
  if (value === null) {
    return null;
  }

  return expectString(value, field, kind, source);
}

function expectStringArray(
  value: unknown,
  field: string,
  kind: MetadataKind,
  source: string,
): string[] {
  if (
    !Array.isArray(value) ||
    value.some((item) => typeof item !== 'string' || item.length === 0)
  ) {
    fail(kind, source, `missing or invalid "${field}". Expected string array.`);
  }

  return value;
}

function expectDate(value: unknown, field: string, kind: MetadataKind, source: string) {
  const text = expectString(value, field, kind, source);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    fail(kind, source, `invalid "${field}". Expected YYYY-MM-DD.`);
  }

  return text;
}

function assertContentStatus(
  value: unknown,
  kind: MetadataKind,
  source: string,
): asserts value is 'draft' | 'published' {
  if (value !== 'draft' && value !== 'published') {
    fail(kind, source, 'invalid "contentStatus". Expected "draft" or "published".');
  }
}

function validateContentImage(
  value: unknown,
  field: string,
  kind: MetadataKind,
  source: string,
): ContentImage | null {
  if (value === null) {
    return null;
  }

  assertRecord(value, kind, source);

  const src = expectString(value.src, `${field}.src`, kind, source);
  const alt = expectString(value.alt, `${field}.alt`, kind, source);
  const width = expectNumber(value.width, `${field}.width`, kind, source);
  const height = expectNumber(value.height, `${field}.height`, kind, source);
  const caption = expectOptionalString(value.caption, `${field}.caption`, kind, source);
  const background = expectOptionalString(value.background, `${field}.background`, kind, source);

  if (
    background !== undefined &&
    background !== 'white' &&
    background !== 'subtle' &&
    background !== 'inverse'
  ) {
    fail(kind, source, `invalid "${field}.background".`);
  }

  return {
    src,
    alt,
    width,
    height,
    ...(caption ? { caption } : {}),
    ...(background ? { background } : {}),
  };
}

function validateLinks(
  value: unknown,
  field: string,
  kind: MetadataKind,
  source: string,
): ContentLink {
  assertRecord(value, kind, source);

  const live =
    value.live === null || value.live === undefined
      ? null
      : expectString(value.live, `${field}.live`, kind, source);
  const repository =
    value.repository === null || value.repository === undefined
      ? null
      : expectString(value.repository, `${field}.repository`, kind, source);

  return { live, repository };
}

export function assertMdxModule(
  value: unknown,
  kind: MetadataKind,
  source: string,
): asserts value is MdxModule {
  assertRecord(value, kind, source);

  if (typeof value.default !== 'function') {
    fail(kind, source, 'default MDX component export is missing.');
  }

  if (!('metadata' in value)) {
    fail(kind, source, 'metadata export is missing.');
  }
}

export function assertProjectMetadata(
  value: unknown,
  source: string,
): asserts value is ProjectMetadata {
  assertRecord(value, 'project', source);
  assertContentStatus(value.contentStatus, 'project', source);

  validateContentImage(value.cover, 'cover', 'project', source);

  if (value.featuredOrder !== null && value.featuredOrder !== undefined) {
    expectNumber(value.featuredOrder, 'featuredOrder', 'project', source);
  }

  if (
    value.status !== 'concept' &&
    value.status !== 'in-progress' &&
    value.status !== 'completed' &&
    value.status !== 'archived'
  ) {
    fail('project', source, 'invalid "status".');
  }

  value.title = expectString(value.title, 'title', 'project', source);
  value.slug = expectString(value.slug, 'slug', 'project', source);
  value.summary = expectString(value.summary, 'summary', 'project', source);
  value.publishedAt = expectDate(value.publishedAt, 'publishedAt', 'project', source);
  value.updatedAt = expectDate(value.updatedAt, 'updatedAt', 'project', source);
  value.label = expectOptionalString(value.label, 'label', 'project', source);
  value.yearStart = expectNumber(value.yearStart, 'yearStart', 'project', source);
  value.yearEnd = expectNullableNumber(value.yearEnd, 'yearEnd', 'project', source);
  value.periodLabel = expectOptionalString(value.periodLabel, 'periodLabel', 'project', source);
  value.featured = expectBoolean(value.featured, 'featured', 'project', source);
  value.featuredOrder =
    value.featuredOrder === undefined
      ? null
      : expectNullableNumber(value.featuredOrder, 'featuredOrder', 'project', source);
  value.role = expectStringArray(value.role, 'role', 'project', source);
  value.disciplines = expectStringArray(value.disciplines, 'disciplines', 'project', source);
  value.stack = expectStringArray(value.stack, 'stack', 'project', source);
  value.teamSize =
    value.teamSize === undefined
      ? null
      : expectNullableNumber(value.teamSize, 'teamSize', 'project', source);
  value.company =
    value.company === undefined
      ? null
      : expectNullableString(value.company, 'company', 'project', source);
  value.location = expectString(value.location, 'location', 'project', source);
  value.platform = expectOptionalString(value.platform, 'platform', 'project', source);
  value.links = validateLinks(value.links, 'links', 'project', source);
  value.outcomes = expectStringArray(value.outcomes, 'outcomes', 'project', source);
  value.cover = validateContentImage(value.cover, 'cover', 'project', source);
  value.coverCaption = expectOptionalString(value.coverCaption, 'coverCaption', 'project', source);
  value.metadataDescription = expectOptionalString(
    value.metadataDescription,
    'metadataDescription',
    'project',
    source,
  );
  value.relatedWriting =
    value.relatedWriting === undefined
      ? []
      : expectStringArray(value.relatedWriting, 'relatedWriting', 'project', source);
}

export function assertArticleMetadata(
  value: unknown,
  source: string,
): asserts value is ArticleMetadata {
  assertRecord(value, 'article', source);
  assertContentStatus(value.contentStatus, 'article', source);

  if (value.language !== 'en' && value.language !== 'id') {
    fail('article', source, 'invalid "language".');
  }

  value.title = expectString(value.title, 'title', 'article', source);
  value.slug = expectString(value.slug, 'slug', 'article', source);
  value.description = expectString(value.description, 'description', 'article', source);
  value.publishedAt = expectDate(value.publishedAt, 'publishedAt', 'article', source);
  value.updatedAt = expectDate(value.updatedAt, 'updatedAt', 'article', source);
  value.language = value.language;
  value.readingTime = expectNumber(value.readingTime, 'readingTime', 'article', source);
  value.featured = expectBoolean(value.featured, 'featured', 'article', source);
  value.topics = expectStringArray(value.topics, 'topics', 'article', source);
  value.relatedProjects =
    value.relatedProjects === undefined
      ? []
      : expectStringArray(value.relatedProjects, 'relatedProjects', 'article', source);
  value.cover =
    value.cover === undefined
      ? null
      : validateContentImage(value.cover, 'cover', 'article', source);
}

export function assertNoteMetadata(value: unknown, source: string): asserts value is NoteMetadata {
  assertRecord(value, 'note', source);
  assertContentStatus(value.contentStatus, 'note', source);

  value.title = expectString(value.title, 'title', 'note', source);
  value.slug = expectString(value.slug, 'slug', 'note', source);
  value.description = expectString(value.description, 'description', 'note', source);
  value.publishedAt = expectDate(value.publishedAt, 'publishedAt', 'note', source);
  value.updatedAt = expectDate(value.updatedAt, 'updatedAt', 'note', source);
  value.lastTestedAt = expectDate(value.lastTestedAt, 'lastTestedAt', 'note', source);
  value.topics =
    value.topics === undefined ? [] : expectStringArray(value.topics, 'topics', 'note', source);
  value.environment =
    value.environment === undefined
      ? []
      : expectStringArray(value.environment, 'environment', 'note', source);
  value.expectedResult =
    value.expectedResult === undefined || value.expectedResult === null
      ? null
      : expectString(value.expectedResult, 'expectedResult', 'note', source);
  value.caveat =
    value.caveat === undefined || value.caveat === null
      ? null
      : expectString(value.caveat, 'caveat', 'note', source);
  value.references =
    value.references === undefined
      ? []
      : expectStringArray(value.references, 'references', 'note', source);
  value.relatedArticle =
    value.relatedArticle === undefined || value.relatedArticle === null
      ? null
      : expectString(value.relatedArticle, 'relatedArticle', 'note', source);
}
