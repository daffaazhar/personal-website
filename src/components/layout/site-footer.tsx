import Link from 'next/link';

import { primaryNavigation, secondaryNavigation, siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <p className="site-footer__headline">Let&apos;s build something useful.</p>
        <hr className="site-footer__rule" />

        <div className="site-footer__grid">
          <div className="site-footer__links" aria-label="Contact links">
            <a className="site-footer__link" href={`mailto:${siteConfig.email}`}>
              <span>Email</span>
              <span className="site-footer__link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="site-footer__link" href={siteConfig.links.linkedin}>
              <span>LinkedIn</span>
              <span className="site-footer__link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="site-footer__link" href={siteConfig.links.github}>
              <span>GitHub</span>
              <span className="site-footer__link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <Link
              className="site-footer__link"
              href={siteConfig.links.resume}
              target="_blank"
              rel="noreferrer"
            >
              <span>Résumé</span>
              <span className="site-footer__link-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>

          <nav className="site-footer__links" aria-label="Footer primary navigation">
            <span className="site-footer__column-title">Pages</span>
            {primaryNavigation.map((item) => (
              <Link className="site-footer__link" key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <nav className="site-footer__links" aria-label="Footer secondary navigation">
            <span className="site-footer__column-title">More</span>
            {secondaryNavigation.map((item) => (
              <Link className="site-footer__link" key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="site-footer__meta">© 2026 {siteConfig.name}. Built with care in Indonesia.</p>
      </div>
    </footer>
  );
}
