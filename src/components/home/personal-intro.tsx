'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';

import { installClosingGlow, installClosingReveal } from './home-motion';
import styles from './personal-homepage.module.css';

export function PersonalIntro({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const stop = useRef<() => void>(() => {});

  const play = useCallback(() => {
    stop.current();
    const container = root.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const portrait = container.querySelector<HTMLElement>('[data-prototype-portrait]');
    const greeting = container.querySelector<HTMLElement>('[data-prototype-greeting]');
    if (!portrait || !greeting || typeof portrait.animate !== 'function') return;

    // Both elements keep their real hero slots. Only their visual positions move.
    const portraitRect = portrait.getBoundingClientRect();
    const greetingRect = greeting.getBoundingClientRect();
    const tokens = getComputedStyle(container);
    const readTime = (name: string, fallback: number) => {
      const value = tokens.getPropertyValue(name).trim();
      const parsed = parseFloat(value);
      return Number.isFinite(parsed) ? parsed * (value.endsWith('ms') ? 1 : 1000) : fallback;
    };
    const enter = readTime('--welcome-enter', 560);
    const reveal = readTime('--welcome-reveal', 420);
    const hold = readTime('--welcome-hold', 380);
    const waveElement = greeting.querySelector<HTMLElement>('[data-home-wave]');
    const hand = greeting.querySelector<SVGElement>('[data-home-wave-hand]');
    const wave = waveElement && hand ? readTime('--welcome-wave', 1400) : 0;
    const handCycle = readTime('--welcome-hand-cycle', 420);
    const move = readTime('--welcome-move', 900);
    const contentDuration = readTime('--welcome-section', 640);
    const sectionStagger = readTime('--welcome-section-stagger', 160);
    const heroStagger = readTime('--welcome-hero-stagger', 45);
    const easing = tokens.getPropertyValue('--ease-enter').trim();
    const portraitScale = parseFloat(tokens.getPropertyValue('--welcome-portrait-scale')) || 1.3;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.44;
    const portraitX = centerX - portraitRect.left - portraitRect.width / 2;
    const portraitY = centerY - portraitRect.top - portraitRect.height / 2;
    const greetingX = centerX - greetingRect.left - greetingRect.width / 2;
    const greetingY = centerY + (portraitRect.height * portraitScale) / 2 + 28 - greetingRect.top;
    // Both wrist cycles and the detached hand fade finish before travel.
    const moveStart = enter + Math.max(reveal + hold, wave);
    const total = moveStart + move;
    const toIntro = (x: number, y: number, scale: number, rotation = 0) =>
      `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`;
    const animations: Animation[] = [];
    const timers: number[] = [];
    container.dataset.intro = 'playing';
    container.dataset.introPhase = 'portrait';

    let active = true;
    const finish = () => {
      if (!active) return;
      active = false;
      timers.forEach(window.clearTimeout);
      animations.forEach((animation) => animation.cancel());
      delete container.dataset.intro;
      delete container.dataset.introPhase;
      container.dispatchEvent(new Event('home:intro-finished'));
    };
    // Idempotent cancellation is safe for both departure and StrictMode rehearsal.
    stop.current = finish;

    try {
      if (waveElement && hand) {
        animations.push(
          waveElement.animate(
            [
              { opacity: 0, offset: 0 },
              { opacity: 0, offset: 0.18 },
              { opacity: 1, offset: 0.3 },
              { opacity: 1, offset: 0.82 },
              { opacity: 0, offset: 0.94 },
              { opacity: 0, offset: 1 },
            ],
            { duration: wave, delay: enter, easing: 'linear', fill: 'backwards' },
          ),
          hand.animate(
            [
              { transform: 'rotate(0deg)', offset: 0, easing: 'ease-in-out' },
              { transform: 'rotate(-12deg)', offset: 0.25, easing: 'ease-in-out' },
              { transform: 'rotate(14deg)', offset: 0.75, easing: 'ease-in-out' },
              { transform: 'rotate(0deg)', offset: 1 },
            ],
            {
              duration: handCycle,
              delay: enter + wave * 0.22,
              iterations: 2,
              easing: 'linear',
              fill: 'backwards',
            },
          ),
        );
      }
      const portraitIntro = toIntro(portraitX, portraitY, portraitScale);
      animations.push(
        portrait.animate(
          [
            {
              opacity: 0,
              transform: toIntro(portraitX - 34, portraitY + 18, portraitScale * 0.92, -9),
              offset: 0,
            },
            { opacity: 1, transform: portraitIntro, offset: enter / total },
            { opacity: 1, transform: portraitIntro, offset: moveStart / total },
            { opacity: 1, transform: 'none', offset: 1 },
          ].map((frame) => ({ ...frame, easing })),
          { duration: total, easing: 'linear', fill: 'both' },
        ),
        greeting.animate(
          [
            {
              opacity: 0,
              transform: toIntro(greetingX, greetingY + 12, 1.08),
              filter: 'blur(4px)',
              offset: 0,
            },
            {
              opacity: 0,
              transform: toIntro(greetingX, greetingY + 12, 1.08),
              filter: 'blur(4px)',
              offset: enter / total,
            },
            {
              opacity: 1,
              transform: toIntro(greetingX, greetingY, 1.08),
              filter: 'blur(0px)',
              offset: (enter + reveal) / total,
            },
            {
              opacity: 1,
              transform: toIntro(greetingX, greetingY, 1.08),
              filter: 'blur(0px)',
              offset: moveStart / total,
            },
            { opacity: 1, transform: 'none', filter: 'blur(0px)', offset: 1 },
          ].map((frame) => ({ ...frame, easing })),
          { duration: total, easing: 'linear', fill: 'both' },
        ),
      );
      const veil = container.querySelector<HTMLElement>('[data-prototype-veil]');
      if (veil) {
        animations.push(
          veil.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: move * 0.65,
            delay: moveStart + move * 0.15,
            easing,
            fill: 'both',
          }),
        );
      }
      // Prepare every group now: backwards fill keeps even offscreen sections
      // blank while the veil fades, rather than exposing finished SSR content.
      const sections = [...container.querySelectorAll<HTMLElement>('[data-home-section]')];
      const entries = [...container.querySelectorAll<HTMLElement>('[data-prototype-entry]')];
      const heroStart = total;
      const sectionStart =
        heroStart + Math.max(0, entries.length - 1) * heroStagger + sectionStagger;
      const contentEnd =
        Math.max(
          heroStart + Math.max(0, entries.length - 1) * heroStagger,
          sections.length ? sectionStart + (sections.length - 1) * sectionStagger : heroStart,
        ) + contentDuration;
      sections.forEach((section, index) => {
        animations.push(
          section.animate(
            [
              { opacity: 0, transform: 'translateY(24px)' },
              { opacity: 1, transform: 'none' },
            ],
            {
              duration: contentDuration,
              delay: sectionStart + index * sectionStagger,
              easing,
              fill: 'backwards',
            },
          ),
        );
      });
      const closing = container.querySelector<HTMLElement>('[data-home-name]');
      if (closing) {
        // Hold the ending out of the page entrance; its own in-view choreography
        // begins only after the cascade completes (or the visitor interrupts it).
        animations.push(
          closing.animate([{ opacity: 0 }, { opacity: 0 }], {
            duration: contentEnd,
            fill: 'backwards',
          }),
        );
      }
      entries.forEach((element, index) => {
        animations.push(
          element.animate(
            [
              { opacity: 0, transform: 'translateY(24px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            {
              duration: contentDuration,
              delay: heroStart + index * heroStagger,
              easing,
              fill: 'both',
            },
          ),
        );
      });
      timers.push(
        window.setTimeout(() => {
          container.dataset.introPhase = 'greeting';
        }, enter),
      );
      timers.push(
        window.setTimeout(() => {
          container.dataset.introPhase = 'travel';
        }, moveStart),
      );
      timers.push(
        window.setTimeout(() => {
          container.dataset.introPhase = 'content';
        }, total),
      );
      timers.push(window.setTimeout(() => finish(), contentEnd + 200));
      void Promise.all(animations.map((animation) => animation.finished))
        .then(() => finish())
        .catch(() => {});
    } catch {
      // Native motion enhancement must never prevent reading the SSR content.
      finish();
    }
  }, []);

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      if (media.matches) stop.current();
    };
    updatePreference();
    // Every fresh mount/reload starts the welcome, without a storage gate.
    play();
    const interrupt = () => stop.current();
    const onVisibilityChange = () => {
      if (document.hidden) interrupt();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    media.addEventListener('change', updatePreference);
    window.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('pointerdown', interrupt, { passive: true });
    window.addEventListener('keydown', interrupt);
    window.addEventListener('resize', interrupt);
    window.addEventListener('scroll', interrupt, { passive: true });
    window.addEventListener('touchstart', interrupt, { passive: true });
    window.addEventListener('focusin', interrupt);
    return () => {
      stop.current();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      media.removeEventListener('change', updatePreference);
      window.removeEventListener('wheel', interrupt);
      window.removeEventListener('pointerdown', interrupt);
      window.removeEventListener('keydown', interrupt);
      window.removeEventListener('resize', interrupt);
      window.removeEventListener('scroll', interrupt);
      window.removeEventListener('touchstart', interrupt);
      window.removeEventListener('focusin', interrupt);
    };
  }, [play]);

  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const stopReveals = installClosingReveal(container);
    const stopGlow = installClosingGlow(container);
    return () => {
      stopReveals();
      stopGlow();
    };
  }, []);

  return (
    <div className={styles.root} ref={root} data-personal-homepage>
      <div className={styles.veil} data-prototype-veil aria-hidden="true" />
      {children}
    </div>
  );
}
