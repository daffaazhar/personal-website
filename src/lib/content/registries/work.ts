export const workRegistry = {
  calme: {
    sourcePath: 'src/content/work/calme.mdx',
    load: () => import('@/content/work/calme.mdx'),
  },
  'eco-in': {
    sourcePath: 'src/content/work/eco-in.mdx',
    load: () => import('@/content/work/eco-in.mdx'),
  },
  'work-fusion': {
    sourcePath: 'src/content/work/work-fusion.mdx',
    load: () => import('@/content/work/work-fusion.mdx'),
  },
  'event-booking-platform': {
    sourcePath: 'src/content/work/event-booking-platform.mdx',
    load: () => import('@/content/work/event-booking-platform.mdx'),
  },
  'deployment-infrastructure': {
    sourcePath: 'src/content/work/deployment-infrastructure.mdx',
    load: () => import('@/content/work/deployment-infrastructure.mdx'),
  },
  'legacy-retail-management-system': {
    sourcePath: 'src/content/work/legacy-retail-management-system.mdx',
    load: () => import('@/content/work/legacy-retail-management-system.mdx'),
  },
} as const;

export type WorkSlug = keyof typeof workRegistry;
