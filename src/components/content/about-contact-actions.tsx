import Link from 'next/link';

import { siteConfig } from '@/lib/site-config';

type ContactAction = {
  label: string;
  href: string;
  ariaLabel: string;
  external?: boolean;
};

const contactActions: ContactAction[] = [
  {
    label: 'Send an email ↗',
    href: `mailto:${siteConfig.email}`,
    ariaLabel: 'Send an email to Daffa Azhar Putra Utama',
    external: true,
  },
  {
    label: 'LinkedIn ↗',
    href: siteConfig.links.linkedin,
    ariaLabel: 'Open Daffa Azhar Putra Utama on LinkedIn',
    external: true,
  },
  {
    label: 'GitHub ↗',
    href: siteConfig.links.github,
    ariaLabel: 'Open Daffa Azhar Putra Utama on GitHub',
    external: true,
  },
  {
    label: 'Open résumé ↗',
    href: siteConfig.links.resume,
    ariaLabel: 'Open the résumé PDF for Daffa Azhar Putra Utama in a new tab',
  },
];

export function AboutContactActions() {
  return (
    <div className="about-contact__actions" aria-label="Contact actions">
      {contactActions.map((action) =>
        action.external ? (
          <a
            key={action.label}
            className="text-link"
            href={action.href}
            aria-label={action.ariaLabel}
            target="_blank"
            rel="noreferrer"
          >
            <span>{action.label}</span>
          </a>
        ) : (
          <Link
            key={action.label}
            className="text-link"
            href={action.href}
            aria-label={action.ariaLabel}
            target="_blank"
            rel="noreferrer"
          >
            <span>{action.label}</span>
          </Link>
        ),
      )}
    </div>
  );
}
