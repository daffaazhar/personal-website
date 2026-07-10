import { readFile } from 'node:fs/promises';
import path from 'node:path';

import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import type { TocItem } from '@/lib/content/types';

export async function extractTableOfContents(sourcePath: string): Promise<TocItem[]> {
  const absolutePath = path.join(process.cwd(), sourcePath);
  const source = await readFile(absolutePath, 'utf8');
  const tree = unified().use(remarkParse).use(remarkMdx).parse(source);
  const slugger = new GithubSlugger();
  const headings: TocItem[] = [];

  visit(tree, 'heading', (node) => {
    if (node.depth !== 2 && node.depth !== 3) {
      return;
    }

    const title = toString(node).trim();

    if (!title) {
      throw new Error(`[content:toc] ${sourcePath}: empty heading at depth ${node.depth}.`);
    }

    headings.push({
      id: slugger.slug(title),
      title,
      depth: node.depth,
    });
  });

  return headings;
}
