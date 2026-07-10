'use client';

import { ArticleCodeBlock } from '@/components/content/article-code-block';

type CodeBlockProps = {
  code: string;
  language?: string;
};

export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  return <ArticleCodeBlock code={code} language={language} />;
}
