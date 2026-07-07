import type { Retrospective } from '@/lib/content/schemas';

export const retrospectives = [
  {
    title: 'The 2026 Retrospective',
    slug: '2026-retrospective',
    year: 2026,
    description: 'Draft annual archive for work, learning, and selected personal context.',
    publishedAt: '2026-12-31',
    contentStatus: 'draft',
    topics: ['Retrospective'],
    highlights: [
      'TODO: Add verified professional milestone.',
      'TODO: Add verified personal milestone.',
    ],
  },
  {
    title: 'The 2025 Retrospective',
    slug: '2025-retrospective',
    year: 2025,
    description: 'Draft annual archive placeholder for verified 2025 milestones.',
    publishedAt: '2025-12-31',
    contentStatus: 'draft',
    topics: ['Retrospective'],
    highlights: [
      'TODO: Add verified professional milestone.',
      'TODO: Add verified personal milestone.',
    ],
  },
  {
    title: 'The 2024 Retrospective',
    slug: '2024-retrospective',
    year: 2024,
    description: 'Draft annual archive placeholder for verified 2024 milestones.',
    publishedAt: '2024-12-31',
    contentStatus: 'draft',
    topics: ['Retrospective'],
    highlights: [
      'TODO: Add verified professional milestone.',
      'TODO: Add verified personal milestone.',
    ],
  },
] satisfies Retrospective[];
