'use client';

import { useEffect, useState } from 'react';

type ArticleCodeBlockProps = {
  language: string;
  code: string;
};

type TokenKind = 'plain' | 'comment' | 'string' | 'keyword' | 'type' | 'number' | 'operator';

type Token = {
  value: string;
  kind: TokenKind;
};

const languageLabels: Record<string, string> = {
  csharp: 'C#',
  cs: 'C#',
  sql: 'SQL',
  ts: 'TypeScript',
  tsx: 'TSX',
  js: 'JavaScript',
  jsx: 'JSX',
  bash: 'Bash',
  sh: 'Shell',
};

const csharpKeywords = new Set([
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'else',
  'false',
  'finally',
  'for',
  'foreach',
  'if',
  'in',
  'new',
  'null',
  'private',
  'protected',
  'public',
  'return',
  'static',
  'throw',
  'true',
  'try',
  'using',
  'var',
  'while',
]);

const csharpTypes = new Set(['DateTimeOffset', 'Exception', 'Guid', 'Task']);

const sqlKeywords = new Set([
  'and',
  'create',
  'from',
  'index',
  'on',
  'or',
  'select',
  'table',
  'unique',
  'where',
]);

export function ArticleCodeBlock({ language, code }: ArticleCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1800);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <div className="article-code">
      <div className="article-code__header">
        <span>{languageLabels[language.toLowerCase()] ?? language}</span>
        <button
          type="button"
          className="article-code__copy"
          onClick={handleCopy}
          aria-label={`Copy ${language} code`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code>
          {lines.map((line, lineIndex) => (
            <span className="article-code__line" key={`${lineIndex}-${line}`}>
              {tokenizeLine(line, language).map((token, tokenIndex) => (
                <span
                  key={`${lineIndex}-${tokenIndex}-${token.value}`}
                  className={`article-code__token article-code__token--${token.kind}`}
                >
                  {token.value}
                </span>
              ))}
              {lineIndex < lines.length - 1 ? '\n' : null}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

function tokenizeLine(line: string, language: string): Token[] {
  if (language.toLowerCase() === 'sql') {
    return tokenizeSqlLine(line);
  }

  return tokenizeCSharpLine(line);
}

function tokenizeCSharpLine(line: string): Token[] {
  const pattern =
    /(\/\/.*$|@"[^"]*"|"([^"\\]|\\.)*"|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|=>|==|!=|<=|>=|[{}()[\].,;:+\-*/=<>])/g;

  return tokenizeWithPattern(line, pattern, (value) => {
    if (value.startsWith('//')) {
      return 'comment';
    }

    if (value.startsWith('"') || value.startsWith('@"')) {
      return 'string';
    }

    if (/^\d/.test(value)) {
      return 'number';
    }

    if (csharpKeywords.has(value)) {
      return 'keyword';
    }

    if (csharpTypes.has(value)) {
      return 'type';
    }

    if (/^(=>|==|!=|<=|>=|[{}()[\].,;:+\-*/=<>])$/.test(value)) {
      return 'operator';
    }

    return 'plain';
  });
}

function tokenizeSqlLine(line: string): Token[] {
  const pattern =
    /(--.*$|'([^']|'')*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|[(),;.*=<>-])/gi;

  return tokenizeWithPattern(line, pattern, (value) => {
    if (value.startsWith('--')) {
      return 'comment';
    }

    if (value.startsWith("'")) {
      return 'string';
    }

    if (/^\d/.test(value)) {
      return 'number';
    }

    if (sqlKeywords.has(value.toLowerCase())) {
      return 'keyword';
    }

    if (/^[(),;.*=<>-]$/.test(value)) {
      return 'operator';
    }

    return 'plain';
  });
}

function tokenizeWithPattern(
  line: string,
  pattern: RegExp,
  classify: (value: string) => TokenKind,
): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;

  for (const match of line.matchAll(pattern)) {
    const index = match.index ?? 0;
    const value = match[0];

    if (index > lastIndex) {
      tokens.push({
        value: line.slice(lastIndex, index),
        kind: 'plain',
      });
    }

    tokens.push({
      value,
      kind: classify(value),
    });

    lastIndex = index + value.length;
  }

  if (lastIndex < line.length) {
    tokens.push({
      value: line.slice(lastIndex),
      kind: 'plain',
    });
  }

  if (tokens.length === 0) {
    tokens.push({ value: line, kind: 'plain' });
  }

  return tokens;
}
