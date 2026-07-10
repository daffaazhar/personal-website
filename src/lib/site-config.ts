export const siteConfig = {
  name: 'Daffa Azhar',
  monogram: 'DA',
  locale: 'en_US',
  author: {
    name: 'Daffa Azhar Putra Utama',
  },
  description:
    'Software engineer building dependable digital products from interface to infrastructure.',
  location: 'Sidoarjo · UTC+7',
  updatedLabel: 'Updated Jul 2026',
  availability: 'Available for selected projects',
  availabilityVerified: false,
  heroSupport:
    'I work across web applications, backend architecture, deployment automation, and technical writing.',
  personalNote:
    'Most weekends I am on a bicycle somewhere between Surabaya and the coast. Distance is where I do my clearest thinking about hard problems.',
  email: 'daffaazharsda@gmail.com',
  links: {
    github: 'https://github.com/daffaazhar',
    linkedin: 'https://www.linkedin.com/in/daffaazhar',
    resume: '/resume',
    rss: '/rss.xml',
  },
  social: {
    profiles: ['https://github.com/daffaazhar', 'https://www.linkedin.com/in/daffaazhar'],
  },
} as const;

export const primaryNavigation = [
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/notes', label: 'Notes' },
  { href: '/about', label: 'About' },
  { href: '/index', label: 'Index' },
] as const;

export const secondaryNavigation = [{ href: siteConfig.links.rss, label: 'RSS' }] as const;
