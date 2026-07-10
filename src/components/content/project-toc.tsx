'use client';

import { useEffect } from 'react';

type ProjectTocItem = {
  depth?: 2 | 3;
  id: string;
  title: string;
};

type ProjectTocProps = {
  items: ProjectTocItem[];
  variant: 'inline' | 'rail';
};

export function ProjectToc({ items, variant }: ProjectTocProps) {
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    let frame = 0;

    const setCurrent = (id: string) => {
      items.forEach((item) => {
        document
          .querySelectorAll<HTMLAnchorElement>(`.project-toc a[href="#${item.id}"]`)
          .forEach((link) => {
            if (item.id === id) {
              link.setAttribute('aria-current', 'location');
            } else {
              link.removeAttribute('aria-current');
            }
          });
      });
    };

    const updateActiveSection = () => {
      const hashId = window.location.hash.replace('#', '');
      const hashSection = sections.find((section) => section.id === hashId);

      if (hashSection) {
        const hashTop = hashSection.getBoundingClientRect().top;

        if (hashTop >= 0 && hashTop <= window.innerHeight) {
          setCurrent(hashId);
          return;
        }
      }

      const offset = window.innerHeight * 0.24;
      const current =
        sections.findLast((section) => section.getBoundingClientRect().top <= offset) ??
        sections[0]!;

      setCurrent(current.id);
    };

    const updateFromHash = () => {
      const hashId = window.location.hash.replace('#', '');

      if (items.some((item) => item.id === hashId)) {
        setCurrent(hashId);
      }
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    const handleHashChange = () => {
      updateFromHash();
      window.setTimeout(scheduleUpdate, 50);
    };

    updateActiveSection();
    window.setTimeout(updateActiveSection, 250);

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [items]);

  return (
    <nav className={`project-toc project-toc--${variant}`} aria-label="Table of contents">
      <p>On this page</p>
      <ol>
        {items.map((item) => (
          <li key={item.id} data-depth={item.depth ?? 2}>
            <a
              href={`#${item.id}`}
              aria-current={item.id === items[0]?.id ? 'location' : undefined}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
