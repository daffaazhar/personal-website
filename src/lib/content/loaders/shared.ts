import { readFile } from 'node:fs/promises';
import path from 'node:path';

import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { extractTableOfContents } from '@/lib/content/table-of-contents';
import type { LoadedContentEntry, MdxModule } from '@/lib/content/types';
import { assertMdxModule } from '@/lib/content/validators';

type RegistryEntry = {
  sourcePath: string;
  load: () => Promise<MdxModule>;
};

type ContentKind = 'project' | 'article' | 'note';

const metadataCache = new Map<string, unknown>();

type EstreeNode = {
  type: string;
  value?: unknown;
  name?: string;
  operator?: string;
  argument?: EstreeNode;
  declaration?: EstreeNode;
  properties?: Array<{
    type: string;
    key: EstreeNode;
    value: EstreeNode;
    computed?: boolean;
  }>;
  elements?: Array<EstreeNode | null>;
  declarations?: Array<{
    id: EstreeNode;
    init: EstreeNode | null;
  }>;
};

async function readSource(sourcePath: string) {
  const absolutePath = path.join(process.cwd(), sourcePath);
  return readFile(absolutePath, 'utf8');
}

function estreeToValue(node: EstreeNode, sourcePath: string): unknown {
  switch (node.type) {
    case 'Literal':
      return node.value;
    case 'ObjectExpression': {
      const value: Record<string, unknown> = {};

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
        const numericValue = estreeToValue(node.argument as EstreeNode, sourcePath);

        if (typeof numericValue !== 'number') {
          throw new Error(
            `[content:metadata] ${sourcePath}: unary metadata values must wrap numbers.`,
          );
        }

        return -numericValue;
      }

      throw new Error(`[content:metadata] ${sourcePath}: unsupported unary metadata value.`);
    case 'Identifier':
      if (node.name === 'undefined') {
        return undefined;
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

async function extractMetadataExport(sourcePath: string): Promise<unknown> {
  if (metadataCache.has(sourcePath)) {
    return metadataCache.get(sourcePath);
  }

  const source = await readSource(sourcePath);
  const tree = unified().use(remarkParse).use(remarkMdx).parse(source);
  let metadataValue: unknown;

  visit(tree as never, 'mdxjsEsm', (node: unknown) => {
    const body = (
      node &&
      typeof node === 'object' &&
      'data' in node &&
      node.data &&
      typeof node.data === 'object' &&
      'estree' in node.data &&
      node.data.estree &&
      typeof node.data.estree === 'object' &&
      'body' in node.data.estree
        ? node.data.estree.body
        : []
    ) as EstreeNode[];

    for (const statement of body) {
      if (statement.type !== 'ExportNamedDeclaration') {
        continue;
      }

      const declaration = statement.declaration as EstreeNode | undefined;

      if (!declaration || declaration.type !== 'VariableDeclaration') {
        continue;
      }

      for (const variable of declaration.declarations ?? []) {
        if (variable.id.type !== 'Identifier' || variable.id.name !== 'metadata') {
          continue;
        }

        if (!variable.init) {
          throw new Error(`[content:metadata] ${sourcePath}: metadata export must be initialized.`);
        }

        metadataValue = estreeToValue(variable.init, sourcePath);
        return;
      }
    }
  });

  if (metadataValue === undefined) {
    throw new Error(`[content:metadata] ${sourcePath}: metadata export is missing.`);
  }

  metadataCache.set(sourcePath, metadataValue);
  return metadataValue;
}

export async function loadRegistryMetadata<TMetadata>(
  kind: ContentKind,
  slug: string,
  entry: RegistryEntry,
  assertMetadata: (value: unknown, source: string) => asserts value is TMetadata,
): Promise<TMetadata> {
  const metadata = await extractMetadataExport(entry.sourcePath);
  assertMetadata(metadata, entry.sourcePath);

  if ((metadata as { slug: string }).slug !== slug) {
    throw new Error(
      `[content:${kind}] ${entry.sourcePath}: registry key "${slug}" does not match metadata.slug "${(metadata as { slug: string }).slug}".`,
    );
  }

  return metadata;
}

export async function loadRegistryEntry<TMetadata>(
  kind: ContentKind,
  slug: string,
  entry: RegistryEntry,
  assertMetadata: (value: unknown, source: string) => asserts value is TMetadata,
): Promise<LoadedContentEntry<TMetadata>> {
  try {
    const [loadedModule, metadata, toc] = await Promise.all([
      entry.load(),
      loadRegistryMetadata(kind, slug, entry, assertMetadata),
      extractTableOfContents(entry.sourcePath),
    ]);

    assertMdxModule(loadedModule, kind, entry.sourcePath);

    return {
      Content: loadedModule.default,
      metadata,
      sourcePath: entry.sourcePath,
      toc,
    };
  } catch (error) {
    console.error(`[content:${kind}] failed to load ${entry.sourcePath}`, error);
    throw error;
  }
}
