import test from 'node:test';
import assert from 'node:assert/strict';

import { validatePublishedCollections } from '../scripts/lib/content-audit.mjs';

function project(overrides = {}, entryOverrides = {}) {
  return {
    kind: 'project',
    sourcePath: 'src/content/work/example.mdx',
    source: 'Published source',
    metadata: {
      title: 'Example project',
      slug: 'example-project',
      summary: 'Project summary',
      metadataDescription: 'Project metadata description',
      publishedAt: '2026-07-10',
      updatedAt: '2026-07-10',
      contentStatus: 'published',
      relatedWriting: [],
      cover: {
        src: '/images/example.png',
        alt: 'Example project cover',
      },
      ...overrides,
    },
    ...entryOverrides,
  };
}

function article(overrides = {}, entryOverrides = {}) {
  return {
    kind: 'article',
    sourcePath: 'src/content/writing/example.mdx',
    source: 'Published source',
    metadata: {
      title: 'Example article',
      slug: 'example-article',
      description: 'Article description',
      publishedAt: '2026-07-10',
      updatedAt: '2026-07-10',
      contentStatus: 'published',
      relatedProjects: [],
      cover: null,
      ...overrides,
    },
    ...entryOverrides,
  };
}

function note(overrides = {}, entryOverrides = {}) {
  return {
    kind: 'note',
    sourcePath: 'src/content/notes/example.mdx',
    source: 'Published source',
    metadata: {
      title: 'Example note',
      slug: 'example-note',
      description: 'Note description',
      publishedAt: '2026-07-10',
      updatedAt: '2026-07-10',
      lastTestedAt: '2026-07-10',
      contentStatus: 'published',
      relatedArticle: null,
      ...overrides,
    },
    ...entryOverrides,
  };
}

test('rejects placeholder text in published content', () => {
  assert.throws(
    () =>
      validatePublishedCollections({
        projects: [project()],
        articles: [article({}, { source: 'TODO: confirm article' })],
        notes: [note()],
      }),
    /placeholder text/i,
  );
});

test('rejects duplicate slugs', () => {
  assert.throws(
    () =>
      validatePublishedCollections({
        projects: [project(), project({ sourcePath: 'src/content/work/example-2.mdx' })],
        articles: [article()],
        notes: [note()],
      }),
    /Duplicate slug/i,
  );
});

test('rejects invalid dates', () => {
  assert.throws(
    () =>
      validatePublishedCollections({
        projects: [project({ publishedAt: '2026-13-10' })],
        articles: [article()],
        notes: [note()],
      }),
    /valid YYYY-MM-DD date/i,
  );
});

test('rejects broken related content slugs', () => {
  assert.throws(
    () =>
      validatePublishedCollections({
        projects: [project({ relatedWriting: ['missing-article'] })],
        articles: [article()],
        notes: [note()],
      }),
    /must resolve to a published writing entry/i,
  );
});

test('rejects missing metadata descriptions', () => {
  assert.throws(
    () =>
      validatePublishedCollections({
        projects: [project({ metadataDescription: '' })],
        articles: [article()],
        notes: [note()],
      }),
    /metadataDescription/i,
  );
});

test('rejects missing required alt text', () => {
  assert.throws(
    () =>
      validatePublishedCollections({
        projects: [project({ cover: { src: '/images/example.png', alt: '' } })],
        articles: [article()],
        notes: [note()],
      }),
    /useful alt text/i,
  );
});
