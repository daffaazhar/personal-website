import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-slug'],
  },
});

const nextConfig: NextConfig = {
  output: 'standalone',
  // Metadata and TOC loaders read registry sourcePath files via process.cwd().
  outputFileTracingIncludes: {
    '/*': ['./src/content/work/**/*.mdx', './src/content/writing/**/*.mdx'],
  },
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        source: '/archive',
        destination: '/index',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/index',
        destination: '/archive',
      },
    ];
  },
};

export default withMDX(nextConfig);
