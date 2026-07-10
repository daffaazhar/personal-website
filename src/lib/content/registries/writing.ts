export const writingRegistry = {
  'building-audit-trails-that-survive-service-failure': {
    sourcePath: 'src/content/writing/building-audit-trails-that-survive-service-failure.mdx',
    load: () => import('@/content/writing/building-audit-trails-that-survive-service-failure.mdx'),
  },
  'integrating-payment-gateway-nextjs-laravel': {
    sourcePath: 'src/content/writing/integrating-payment-gateway-nextjs-laravel.mdx',
    load: () => import('@/content/writing/integrating-payment-gateway-nextjs-laravel.mdx'),
  },
  'deploying-laravel-with-gitlab-ci-cd': {
    sourcePath: 'src/content/writing/deploying-laravel-with-gitlab-ci-cd.mdx',
    load: () => import('@/content/writing/deploying-laravel-with-gitlab-ci-cd.mdx'),
  },
  'recovering-from-supervisor-worker-failures': {
    sourcePath: 'src/content/writing/recovering-from-supervisor-worker-failures.mdx',
    load: () => import('@/content/writing/recovering-from-supervisor-worker-failures.mdx'),
  },
  'synchronizing-multiple-git-remotes': {
    sourcePath: 'src/content/writing/synchronizing-multiple-git-remotes.mdx',
    load: () => import('@/content/writing/synchronizing-multiple-git-remotes.mdx'),
  },
} as const;

export type WritingSlug = keyof typeof writingRegistry;
