declare module '*.mdx' {
  import type { ComponentType } from 'react';

  const MDXContent: ComponentType<{ components?: Record<string, unknown> }>;
  export default MDXContent;
  export const metadata: unknown;
}
