'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';

import styles from './personal-homepage.module.css';

type Layout = 'list' | 'grid';

export function SelectedWork({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useState<Layout>('list');
  const list = useRef<HTMLDivElement>(null);
  const controls = useRef<HTMLDivElement>(null);
  const animations = useRef<Animation[]>([]);

  function cancelAnimations() {
    animations.current.forEach((animation) => animation.cancel());
    animations.current = [];
  }

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cancel = () => cancelAnimations();
    if (controls.current) controls.current.hidden = false;
    preference.addEventListener('change', cancel);
    window.addEventListener('resize', cancel);
    return () => {
      cancel();
      preference.removeEventListener('change', cancel);
      window.removeEventListener('resize', cancel);
    };
  }, []);

  function switchLayout(next: Layout) {
    if (next === layout || !list.current) return;
    const elements = Array.from(
      list.current.querySelectorAll<HTMLElement>('[data-work-image], [data-work-copy]'),
    );
    // Sample the current animated geometry BEFORE cancellation, so rapid reversals
    // start at the visible position rather than an obsolete layout endpoint.
    const first = elements.map((element) => element.getBoundingClientRect());
    cancelAnimations();
    flushSync(() => setLayout(next));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const last = elements.map((element) => element.getBoundingClientRect());
    const computed = getComputedStyle(list.current);
    const timing = computed.getPropertyValue('--work-layout-duration').trim();
    const duration = timing ? parseFloat(timing) * (timing.endsWith('ms') ? 1 : 1000) : 480;
    const easing = computed.getPropertyValue('--ease-enter').trim() || 'ease-out';
    try {
      elements.forEach((element, index) => {
        const from = first[index];
        const to = last[index];
        if (!from || !to || !from.width || !from.height || !to.width || !to.height) return;
        const image = element.hasAttribute('data-work-image');
        const animation = element.animate(
          [
            {
              transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${image ? from.width / to.width : 1}, ${image ? from.height / to.height : 1})`,
            },
            { transform: 'none' },
          ],
          { duration, easing, fill: 'both' },
        );
        animations.current.push(animation);
        animation.onfinish = () => {
          animation.cancel();
          animations.current = animations.current.filter((item) => item !== animation);
        };
      });
    } catch {
      // If native animation enhancement fails, expose the static target layout.
      cancelAnimations();
    }
  }

  return (
    <section
      id="prototype-work"
      className={styles.work}
      aria-labelledby="prototype-work-title"
      data-home-section
    >
      <div className={styles.sectionHeading}>
        <h2 id="prototype-work-title">Selected work</h2>
        <div
          className={styles.workControls}
          ref={controls}
          hidden
          role="group"
          aria-label="Work layout"
        >
          {(['list', 'grid'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-label={`${mode === 'list' ? 'List' : 'Grid'} view`}
              title={`${mode === 'list' ? 'List' : 'Grid'} view`}
              aria-pressed={layout === mode}
              aria-controls="selected-work-projects"
              onClick={() => switchLayout(mode)}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                {mode === 'list' ? (
                  <path d="M2 3h3v3H2zM8 4.5h8M2 8h3v3H2zM8 9.5h8M2 13h3v3H2zM8 14.5h8" />
                ) : (
                  <path d="M2 2h5v5H2zM11 2h5v5h-5zM2 11h5v5H2zM11 11h5v5h-5z" />
                )}
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div
        id="selected-work-projects"
        className={styles.projectList}
        data-work-layout={layout}
        ref={list}
      >
        {children}
      </div>
      <Link className={styles.caseStudy} href="/work">
        All projects <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
