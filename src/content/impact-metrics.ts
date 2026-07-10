import type { ImpactMetric } from '@/lib/content/schemas';

export const impactMetrics: ImpactMetric[] = [
  {
    id: 'experience-years',
    value: '3+',
    numericValue: 3,
    suffix: '+',
    label: 'Years',
    description: 'Building production software since 2023.',
    sourceNote: 'Derived from verified professional experience dates.',
  },
  {
    id: 'professional-roles',
    value: '7',
    numericValue: 7,
    label: 'Roles',
    description: 'Across fintech, public sector, SaaS, and retail systems.',
    sourceNote: 'Derived from the verified experience collection.',
  },
  {
    id: 'records-handled',
    value: '3,000+',
    numericValue: 3000,
    suffix: '+',
    label: 'Records',
    description: 'Handled in a data-intensive information-system interface.',
    sourceNote: 'Verified Data Polis experience outcome.',
  },
  {
    id: 'support-ticket-reduction',
    value: '30%',
    numericValue: 30,
    suffix: '%',
    label: 'Reduction',
    description: 'Fewer support tickets related to WAF-blocked requests.',
    sourceNote: 'Verified BRI QLola experience outcome.',
  },
];
