'use client';

import { Dialog } from '@base-ui/react/dialog';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { primaryNavigation, secondaryNavigation, siteConfig } from '@/lib/site-config';

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="mobile-nav">
        <Dialog.Trigger className="mobile-nav__trigger">Menu</Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Backdrop className="mobile-nav__backdrop" />
        <Dialog.Viewport className="mobile-nav__viewport">
          <Dialog.Popup className="mobile-nav__popup">
            <div className="mobile-nav__header">
              <Dialog.Title className="mobile-nav__title">{siteConfig.name}</Dialog.Title>
              <Dialog.Close className="mobile-nav__close">Close</Dialog.Close>
            </div>

            <nav className="mobile-nav__links" aria-label="Mobile navigation">
              {primaryNavigation.map((item) => (
                <Link
                  className="mobile-nav__link"
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mobile-nav__secondary" aria-label="Secondary links">
              <a href={`mailto:${siteConfig.email}`}>Email ↗</a>
              <a href={siteConfig.links.github}>GitHub ↗</a>
              <a href={siteConfig.links.linkedin}>LinkedIn ↗</a>
              {secondaryNavigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
