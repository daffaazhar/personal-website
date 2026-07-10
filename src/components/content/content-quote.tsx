import type { ReactNode } from 'react';

type ContentQuoteProps = {
  children: ReactNode;
};

export function ContentQuote({ children }: ContentQuoteProps) {
  return <blockquote className="content-quote">{children}</blockquote>;
}
