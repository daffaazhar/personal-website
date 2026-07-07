export const siteConfig = {
  name: 'Daffa Azhar',
  monogram: 'DA',
  description:
    'Software engineer building dependable digital products from interface to infrastructure.',
  location: 'Jakarta · UTC+7',
  updatedLabel: 'Updated Jul 2026',
  availability: 'Available for selected projects',
  email: 'TODO: Add public email',
  links: {
    github: 'https://github.com/TODO',
    linkedin: 'https://www.linkedin.com/in/TODO',
    resume: '/resume',
    rss: '/rss.xml',
  },
} as const;

export const primaryNavigation = [
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/notes', label: 'Notes' },
  { href: '/about', label: 'About' },
  { href: '/index', label: 'Index' },
] as const;

export const secondaryNavigation = [
  { href: siteConfig.links.rss, label: 'RSS' },
  { href: '/uses', label: 'Uses' },
  { href: '/guestbook', label: 'Guestbook' },
  { href: '/talks', label: 'Talks' },
] as const;
