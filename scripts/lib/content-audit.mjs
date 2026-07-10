import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const placeholderPattern = /TODO:|\[XX\]|\[X\]\+|lorem ipsum/i;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const collections = {
  project: 'src/content/work',
  article: 'src/content/writing',
  note: 'src/content/notes',
};

function createIssue(entry, field, message) {
  return `[${entry.kind}] ${entry.sourcePath}${field ? ` :: ${field}` : ''} :: ${message}`;
}

function assertText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function assertDate(value) {
  return (
    typeof value === 'string' &&
    datePattern.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
  );
}

function parseDate(value) {
  return new Date(`${value}T00:00:00Z`).getTime();
}

function hasPlaceholder(value) {
  return placeholderPattern.test(value);
}

function failWithIssues(issues) {
  if (issues.length === 0) {
    return;
  }

  throw new Error(`Content validation failed:\n${issues.map((issue) => `- ${issue}`).join('\n')}`);
}

function validateImage(entry, image, field, issues) {
  if (!image) {
    return;
  }

  if (!assertText(image.src)) {
    issues.push(createIssue(entry, `${field}.src`, 'Expected non-empty image source.'));
  }

  if (!assertText(image.alt)) {
    issues.push(createIssue(entry, `${field}.alt`, 'Expected useful alt text.'));
  }
}

function validatePublishedEntry(entry, issues) {
  const { metadata, source } = entry;

  if (!assertText(metadata.title)) {
    issues.push(createIssue(entry, 'title', 'Expected non-empty title.'));
  }

  if (!assertText(metadata.slug)) {
    issues.push(createIssue(entry, 'slug', 'Expected non-empty slug.'));
  }

  if (!assertDate(metadata.publishedAt)) {
    issues.push(createIssue(entry, 'publishedAt', 'Expected valid YYYY-MM-DD date.'));
  }

  if (!assertDate(metadata.updatedAt)) {
    issues.push(createIssue(entry, 'updatedAt', 'Expected valid YYYY-MM-DD date.'));
  }

  if (assertDate(metadata.publishedAt) && assertDate(metadata.updatedAt)) {
    if (parseDate(metadata.updatedAt) < parseDate(metadata.publishedAt)) {
      issues.push(
        createIssue(entry, 'updatedAt', 'Updated date must not be earlier than published date.'),
      );
    }
  }

  if (hasPlaceholder(source)) {
    issues.push(createIssue(entry, 'source', 'Published content contains placeholder text.'));
  }

  if (entry.kind === 'project') {
    if (!assertText(metadata.summary)) {
      issues.push(createIssue(entry, 'summary', 'Expected non-empty project summary.'));
    }

    if (!assertText(metadata.metadataDescription)) {
      issues.push(
        createIssue(
          entry,
          'metadataDescription',
          'Published projects require metadataDescription.',
        ),
      );
    }

    validateImage(entry, metadata.cover, 'cover', issues);
  }

  if (entry.kind === 'article') {
    if (!assertText(metadata.description)) {
      issues.push(
        createIssue(entry, 'description', 'Published articles require a metadata description.'),
      );
    }

    validateImage(entry, metadata.cover, 'cover', issues);
  }

  if (entry.kind === 'note') {
    if (!assertText(metadata.description)) {
      issues.push(createIssue(entry, 'description', 'Published notes require a description.'));
    }

    if (!assertDate(metadata.lastTestedAt)) {
      issues.push(createIssue(entry, 'lastTestedAt', 'Expected valid YYYY-MM-DD date.'));
    }
  }
}

export function validatePublishedCollections({ projects, articles, notes }) {
  const issues = [];
  const entries = [...projects, ...articles, ...notes];
  const byKind = {
    project: projects,
    article: articles,
    note: notes,
  };

  for (const [kind, kindEntries] of Object.entries(byKind)) {
    const seenSlugs = new Map();

    for (const entry of kindEntries) {
      if (seenSlugs.has(entry.metadata.slug)) {
        issues.push(
          createIssue(
            entry,
            'slug',
            `Duplicate slug "${entry.metadata.slug}" also found in ${seenSlugs.get(entry.metadata.slug)}.`,
          ),
        );
      } else {
        seenSlugs.set(entry.metadata.slug, entry.sourcePath);
      }
    }

    if (!['project', 'article', 'note'].includes(kind)) {
      issues.push(`[${kind}] Unsupported collection kind.`);
    }
  }

  for (const entry of entries) {
    if (entry.metadata.contentStatus !== 'published') {
      continue;
    }

    validatePublishedEntry(entry, issues);
  }

  const publishedProjectSlugs = new Set(
    projects
      .filter((entry) => entry.metadata.contentStatus === 'published')
      .map((entry) => entry.metadata.slug),
  );
  const publishedArticleSlugs = new Set(
    articles
      .filter((entry) => entry.metadata.contentStatus === 'published')
      .map((entry) => entry.metadata.slug),
  );

  for (const entry of projects) {
    if (entry.metadata.contentStatus !== 'published') {
      continue;
    }

    for (const relatedSlug of entry.metadata.relatedWriting ?? []) {
      if (!publishedArticleSlugs.has(relatedSlug)) {
        issues.push(
          createIssue(
            entry,
            'relatedWriting',
            `Related writing slug "${relatedSlug}" must resolve to a published writing entry.`,
          ),
        );
      }
    }
  }

  for (const entry of articles) {
    if (entry.metadata.contentStatus !== 'published') {
      continue;
    }

    for (const relatedSlug of entry.metadata.relatedProjects ?? []) {
      if (!publishedProjectSlugs.has(relatedSlug)) {
        issues.push(
          createIssue(
            entry,
            'relatedProjects',
            `Related project slug "${relatedSlug}" must resolve to a published work entry.`,
          ),
        );
      }
    }
  }

  for (const entry of notes) {
    if (entry.metadata.contentStatus !== 'published' || !entry.metadata.relatedArticle) {
      continue;
    }

    if (!publishedArticleSlugs.has(entry.metadata.relatedArticle)) {
      issues.push(
        createIssue(
          entry,
          'relatedArticle',
          `Related article slug "${entry.metadata.relatedArticle}" must resolve to a published writing entry.`,
        ),
      );
    }
  }

  failWithIssues(issues);
}

function estreeToValue(node, sourcePath) {
  switch (node.type) {
    case 'Literal':
      return node.value;
    case 'ObjectExpression': {
      const value = {};

      for (const property of node.properties ?? []) {
        if (property.type !== 'Property' || property.computed) {
          throw new Error(`[content:metadata] ${sourcePath}: unsupported metadata property.`);
        }

        const key =
          property.key.type === 'Identifier'
            ? property.key.name
            : property.key.type === 'Literal'
              ? property.key.value
              : undefined;

        if (typeof key !== 'string') {
          throw new Error(`[content:metadata] ${sourcePath}: unsupported metadata key.`);
        }

        value[key] = estreeToValue(property.value, sourcePath);
      }

      return value;
    }
    case 'ArrayExpression':
      return (node.elements ?? []).map((element) => {
        if (!element) {
          throw new Error(`[content:metadata] ${sourcePath}: sparse arrays are not supported.`);
        }

        return estreeToValue(element, sourcePath);
      });
    case 'UnaryExpression':
      if (node.operator === '-') {
        return -Number(estreeToValue(node.argument, sourcePath));
      }

      throw new Error(`[content:metadata] ${sourcePath}: unsupported unary metadata value.`);
    case 'Identifier':
      if (node.name === 'undefined') {
        return undefined;
      }
      if (node.name === 'null') {
        return null;
      }

      throw new Error(
        `[content:metadata] ${sourcePath}: unsupported identifier "${node.name}" in metadata.`,
      );
    default:
      throw new Error(
        `[content:metadata] ${sourcePath}: unsupported metadata syntax "${node.type}".`,
      );
  }
}

async function extractMetadataAndSource(sourcePath) {
  const absolutePath = path.join(repoRoot, sourcePath);
  const source = await readFile(absolutePath, 'utf8');
  const tree = unified().use(remarkParse).use(remarkMdx).parse(source);
  let metadataValue;

  visit(tree, 'mdxjsEsm', (node) => {
    const body = node?.data?.estree?.body ?? [];

    for (const statement of body) {
      if (statement.type !== 'ExportNamedDeclaration') {
        continue;
      }

      const declaration = statement.declaration;

      if (!declaration || declaration.type !== 'VariableDeclaration') {
        continue;
      }

      for (const variable of declaration.declarations ?? []) {
        if (variable.id.type !== 'Identifier' || variable.id.name !== 'metadata') {
          continue;
        }

        metadataValue = estreeToValue(variable.init, sourcePath);
        return;
      }
    }
  });

  if (!metadataValue) {
    throw new Error(`[content:metadata] ${sourcePath}: metadata export is missing.`);
  }

  return { metadata: metadataValue, source };
}

async function readCollection(kind, relativeDir) {
  const absoluteDir = path.join(repoRoot, relativeDir);
  const filenames = (await readdir(absoluteDir)).filter((name) => name.endsWith('.mdx')).sort();
  const entries = [];

  for (const filename of filenames) {
    const sourcePath = path.join(relativeDir, filename);
    const { metadata, source } = await extractMetadataAndSource(sourcePath);

    entries.push({
      kind,
      sourcePath,
      metadata,
      source,
    });
  }

  return entries;
}

export async function loadRepositoryContent() {
  const [projects, articles, notes] = await Promise.all([
    readCollection('project', collections.project),
    readCollection('article', collections.article),
    readCollection('note', collections.note),
  ]);

  return { projects, articles, notes };
}

export async function readNavigationHrefs() {
  const source = await readFile(path.join(repoRoot, 'src/lib/site-config.ts'), 'utf8');
  return [...source.matchAll(/href:\s*'([^']+)'/g)]
    .map((match) => match[1])
    .filter((href) => href.startsWith('/'));
}

export function validateNavigationHrefs(hrefs, knownRoutes) {
  const issues = hrefs
    .filter((href) => !knownRoutes.has(href))
    .map((href) => `Navigation link "${href}" does not resolve to a known public route.`);

  failWithIssues(issues);
}

export async function readSourceFile(relativePath) {
  return readFile(path.join(repoRoot, relativePath), 'utf8');
}

export function assertNoPlaceholder(value, label) {
  if (hasPlaceholder(value)) {
    throw new Error(`${label} contains placeholder text.`);
  }
}
