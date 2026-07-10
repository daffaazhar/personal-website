import type { ReactNode } from 'react';

type ContentCalloutProps = {
  children: ReactNode;
  title?: string;
};

export function ContentCallout({ children, title }: ContentCalloutProps) {
  return (
    <aside className="content-callout">
      {title ? <p className="content-callout__title">{title}</p> : null}
      <div>{children}</div>
    </aside>
  );
}
