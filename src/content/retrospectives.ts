import type { Retrospective } from '@/lib/content/schemas';

export const retrospectives = [
  {
    title: 'Building for failure, not only success',
    slug: 'building-for-failure-not-only-success',
    year: 2026,
    description:
      'My work shifted from delivering features to examining what happens after a request succeeds: whether events remain recoverable, deployments stay repeatable, and production failures leave enough evidence to diagnose.',
    publishedAt: '2026-07-09',
    contentStatus: 'published',
    topics: ['Retrospective'],
    highlights: ['In progress'],
    statusLabel: 'In progress',
  },
  {
    title: 'Learning production constraints',
    slug: 'learning-production-constraints',
    year: 2025,
    description:
      'Working on a cash-management platform and an event-booking product made performance, session recovery, shared front-end standards, and deployment discipline concrete rather than theoretical.',
    publishedAt: '2025-12-31',
    contentStatus: 'published',
    topics: ['Retrospective'],
    highlights: ['Production constraints'],
  },
  {
    title: 'Connecting product decisions to implementation',
    slug: 'connecting-product-decisions-to-implementation',
    year: 2024,
    description:
      'I worked across public-sector software, logistics, and product teams while helping shape Countlorie, Calme, and Eco.in. The year made role boundaries clearer: product direction, interface quality, and engineering execution depend on one another, but they are not the same responsibility.',
    publishedAt: '2024-12-31',
    contentStatus: 'published',
    topics: ['Retrospective'],
    highlights: ['Role boundaries'],
  },
  {
    title: 'Building reusable foundations',
    slug: 'building-reusable-foundations',
    year: 2023,
    description:
      'Early front-end work taught me that small abstractions matter when data grows. Incremental loading, reusable components, and careful state handling became practical ways to keep interfaces understandable.',
    publishedAt: '2023-12-31',
    contentStatus: 'published',
    topics: ['Retrospective'],
    highlights: ['Reusable foundations'],
  },
  {
    title: 'Starting with applied software work',
    slug: 'starting-with-applied-software-work',
    year: 2022,
    description:
      'I began formal study in Informatics Engineering at PENS and used competitions to practise turning incomplete ideas into testable product decisions under time limits.',
    publishedAt: '2022-12-31',
    contentStatus: 'published',
    topics: ['Retrospective'],
    highlights: ['Applied software work'],
  },
] satisfies Retrospective[];
