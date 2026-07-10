import type {
  AnchorHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactElement,
  ReactNode,
} from 'react';
import { Children, isValidElement } from 'react';

import type { MDXComponents } from 'mdx/types';

import { CodeBlock } from '@/components/content/code-block';
import { ContentCallout } from '@/components/content/content-callout';
import { ContentQuote } from '@/components/content/content-quote';
import { ContentTable } from '@/components/content/content-table';

function InlineLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? '';
  const external = href.startsWith('http');

  return (
    <a
      {...props}
      className={['text-link', 'text-link--inline', props.className].filter(Boolean).join(' ')}
      target={external ? '_blank' : props.target}
      rel={external ? 'noreferrer noopener' : props.rel}
    />
  );
}

function PreformattedBlock(props: ComponentPropsWithoutRef<'pre'>) {
  const child = Children.only(props.children) as ReactNode;

  if (isCodeElement(child)) {
    const className = typeof child.props.className === 'string' ? child.props.className : '';
    const language = className.replace('language-', '') || 'text';
    const code = extractText(child.props.children);
    return <CodeBlock code={code} language={language} />;
  }

  return <pre {...props} />;
}

function Table({ children }: { children: ReactNode }) {
  const parsed = readTable(children);

  if (!parsed) {
    return <>{children}</>;
  }

  return <ContentTable columns={parsed.columns} rows={parsed.rows} />;
}

function readTable(children: ReactNode) {
  const nodes = Children.toArray(children).filter(isElementWithChildren);
  const head = nodes.find((node) => node.type === 'thead');
  const body = nodes.find((node) => node.type === 'tbody');

  if (!head || !body) {
    return null;
  }

  const headerRow = Children.toArray(head.props.children).find(isElementWithChildren);

  if (!headerRow) {
    return null;
  }

  const columns = Children.toArray(headerRow.props.children)
    .filter(isElementWithChildren)
    .map((cell) => extractText(cell.props.children).trim());
  const rows = Children.toArray(body.props.children)
    .filter(isElementWithChildren)
    .map((row) =>
      Children.toArray(row.props.children)
        .filter(isElementWithChildren)
        .map((cell) => extractText(cell.props.children).trim()),
    );

  return { columns, rows };
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }

  if (isElementWithChildren(node)) {
    return extractText(node.props.children);
  }

  return '';
}

function isElementWithChildren(
  node: ReactNode,
): node is ReactElement<{ children?: ReactNode; className?: string }> {
  return isValidElement(node);
}

function isCodeElement(
  node: ReactNode,
): node is ReactElement<{ children?: ReactNode; className?: string }, 'code'> {
  return isValidElement(node) && node.type === 'code';
}

export function getMDXComponents(): MDXComponents {
  return {
    a: InlineLink,
    blockquote: ContentQuote,
    Callout: ContentCallout,
    pre: PreformattedBlock,
    table: Table,
  };
}
