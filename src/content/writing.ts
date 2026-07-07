import type { Article } from '@/lib/content/schemas';

export const articles = [
  {
    title: 'Building reliable audit trails',
    slug: 'building-reliable-audit-trails',
    description:
      'Draft seed for explaining transaction boundaries, replay, and operational trust in audit logs.',
    publishedAt: '2026-07-07',
    updatedAt: '2026-07-07',
    language: 'en',
    readingTime: 9,
    featured: true,
    contentStatus: 'draft',
    topics: ['Systems', 'Reliability', 'Databases'],
    relatedProjects: ['work-fusion'],
    body: [
      {
        title: 'Thesis',
        body: ['TODO: Replace with verified article introduction and examples.'],
      },
      {
        title: 'Pattern',
        body: ['TODO: Add concrete implementation pattern and caveats.'],
      },
    ],
  },
  {
    title: 'Integrating a payment gateway with Next.js and Laravel',
    slug: 'integrating-payment-gateway-nextjs-laravel',
    description:
      'Draft seed for documenting request signing, callback handling, and user-facing payment states.',
    publishedAt: '2026-07-01',
    updatedAt: '2026-07-07',
    language: 'en',
    readingTime: 8,
    featured: true,
    contentStatus: 'draft',
    topics: ['Next.js', 'Laravel', 'Payments'],
    relatedProjects: ['event-booking-platform'],
    body: [
      {
        title: 'Flow',
        body: ['TODO: Add verified payment flow and integration notes.'],
      },
    ],
  },
  {
    title: 'Deploying Laravel with GitLab CI/CD',
    slug: 'deploying-laravel-with-gitlab-ci-cd',
    description:
      'Draft seed for documenting repeatable deployments, server preparation, and rollback habits.',
    publishedAt: '2026-06-20',
    updatedAt: '2026-07-07',
    language: 'en',
    readingTime: 7,
    featured: false,
    contentStatus: 'draft',
    topics: ['DevOps', 'Laravel', 'CI/CD'],
    relatedProjects: ['deployment-infrastructure'],
    body: [
      {
        title: 'Pipeline',
        body: ['TODO: Add verified pipeline shape, commands, and operational caveats.'],
      },
    ],
  },
  {
    title: 'Recovering from Supervisor worker failures',
    slug: 'recovering-from-supervisor-worker-failures',
    description:
      'Draft seed for explaining how to diagnose worker failures without masking root causes.',
    publishedAt: '2026-06-10',
    updatedAt: '2026-07-07',
    language: 'en',
    readingTime: 6,
    featured: false,
    contentStatus: 'draft',
    topics: ['Ops', 'Laravel', 'Supervisor'],
    relatedProjects: ['deployment-infrastructure'],
    body: [
      {
        title: 'Diagnosis',
        body: ['TODO: Add verified failure modes, logs, and recovery commands.'],
      },
    ],
  },
  {
    title: 'Synchronizing multiple Git remotes',
    slug: 'synchronizing-multiple-git-remotes',
    description:
      'Draft seed for practical Git remote workflows when repositories need to move together.',
    publishedAt: '2026-05-25',
    updatedAt: '2026-07-07',
    language: 'en',
    readingTime: 5,
    featured: false,
    contentStatus: 'draft',
    topics: ['Git', 'Workflow'],
    relatedProjects: [],
    body: [
      {
        title: 'Workflow',
        body: ['TODO: Add verified commands and caveats for the remote-sync workflow.'],
      },
    ],
  },
] satisfies Article[];
