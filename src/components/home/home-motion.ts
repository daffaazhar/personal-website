// Only the decorative glow loops; letter replay remains an independent effect.
export function installClosingGlow(root: HTMLElement) {
  const name = root.querySelector<HTMLElement>('[data-home-name]');
  if (!name || typeof IntersectionObserver === 'undefined') return () => {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  const update = () => {
    if (reduced.matches) {
      delete name.dataset.glowMotion;
      delete name.dataset.glowVisible;
      return;
    }
    name.dataset.glowMotion = '';
    name.dataset.glowVisible = String(visible && !document.hidden);
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false;
    update();
  });
  const start = () => {
    observer.observe(name);
    update();
  };
  if (root.dataset.intro === 'playing') {
    root.addEventListener('home:intro-finished', start, { once: true });
  } else {
    start();
  }
  reduced.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  return () => {
    observer.disconnect();
    root.removeEventListener('home:intro-finished', start);
    reduced.removeEventListener('change', update);
    document.removeEventListener('visibilitychange', update);
    delete name.dataset.glowMotion;
    delete name.dataset.glowVisible;
  };
}

export function installClosingReveal(root: HTMLElement) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const name = root.querySelector<HTMLElement>('[data-home-name]');
  if (!name || typeof IntersectionObserver === 'undefined') return () => {};
  const animations = new Set<Animation>();
  const easing = getComputedStyle(root).getPropertyValue('--ease-enter').trim();
  const animate = (element: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) => {
    if (typeof element.animate !== 'function') return;
    try {
      const animation = element.animate(frames, { ...options, easing });
      animations.add(animation);
      animation.addEventListener('finish', () => animations.delete(animation), { once: true });
    } catch {
      // Failed enhancement leaves the SSR final composition untouched.
    }
  };
  let armed = true;
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.at(-1);
      if (!entry) return;
      if (!entry.isIntersecting) {
        armed = true;
        animations.forEach((animation) => animation.cancel());
        animations.clear();
        return;
      }
      if (reduced.matches || !armed || entry.intersectionRatio < 0.12) return;
      armed = false;
      name.querySelectorAll<HTMLElement>('[data-home-letter]').forEach((letter, index) => {
        animate(
          letter,
          [
            { transform: 'translateY(0.5em)', opacity: 0, filter: 'blur(6px)' },
            { transform: 'none', opacity: 1, filter: 'blur(0px)' },
          ],
          { duration: 760, delay: index * 65, fill: 'backwards' },
        );
      });
    },
    { threshold: [0, 0.12] },
  );
  const cancel = () => {
    observer.disconnect();
    animations.forEach((animation) => animation.cancel());
    animations.clear();
  };
  const updatePreference = () => {
    cancel();
    armed = true;
    // Re-observing delivers fresh geometry, including an already visible name.
    // Preference changes must never bypass the welcome's page-load cascade.
    if (!reduced.matches && root.dataset.intro !== 'playing') observer.observe(name);
  };
  // Only the decorative ending remains scroll-triggered. Page sections are
  // owned by the welcome's top-to-bottom load cascade, not this observer.
  if (root.dataset.intro === 'playing') {
    root.addEventListener('home:intro-finished', updatePreference, { once: true });
  } else {
    updatePreference();
  }
  reduced.addEventListener('change', updatePreference);
  return () => {
    root.removeEventListener('home:intro-finished', updatePreference);
    reduced.removeEventListener('change', updatePreference);
    cancel();
  };
}
