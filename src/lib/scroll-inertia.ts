import Lenis from 'lenis';

// Shared progressive enhancement: move the native document, never a wrapper.
// Touch, keyboard, anchors and nested scroll surfaces retain native behavior.
export function installScrollInertia(root: HTMLElement) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lenis: Lenis | undefined;
  const destroy = () => {
    if (!lenis) return;
    // Verified against installed Lenis 1.3.26: destroy() leaves the 400ms
    // native-scroll velocity timer alive. Public immediate scrollTo() does not
    // clear it either (and returns early at the current target). Retain this
    // guarded timer-only workaround until upstream destroy() owns its cleanup;
    // never call private reset(), stop/start, or mutate native scroll state.
    const nativeScrollTimer: unknown = Reflect.get(lenis, '_resetVelocityTimeout');
    if (typeof nativeScrollTimer === 'number') window.clearTimeout(nativeScrollTimer);
    lenis.destroy();
    lenis = undefined;
  };
  const updatePreference = () => {
    destroy();
    if (reduced.matches) return;
    lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      lerp: 0.16,
      wheelMultiplier: 1,
      syncTouch: false,
      anchors: false,
      allowNestedScroll: true,
      prevent: (node) => {
        const native = node.matches('input, textarea, select, [contenteditable], pre, code');
        const nested =
          node.scrollHeight > node.clientHeight &&
          ['auto', 'scroll', 'overlay'].includes(getComputedStyle(node).overflowY);
        // Hand existing momentum back too, not just this one wheel event.
        // Lenis still owns its nested boundary/chaining decision below.
        if (native || nested) relinquish();
        return native;
      },
      virtualScroll: ({ event }) => {
        const native =
          event instanceof WheelEvent &&
          (event.ctrlKey ||
            event.metaKey ||
            event.altKey ||
            event.shiftKey ||
            event.deltaMode === 2 ||
            Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
            !(event.target instanceof Element) ||
            (!root.contains(event.target) &&
              !event.target.matches('html, body, .app-root, #main-content')));
        if (native) lenis?.scrollTo(window.scrollY, { immediate: true });
        return !native;
      },
    });
  };
  // Cancel interpolation before native navigation, without stopping/locking scroll.
  const relinquish = () => lenis?.scrollTo(window.scrollY, { immediate: true });
  const interruptions = [
    'keydown',
    'pointerdown',
    'touchstart',
    'click',
    'focusin',
    'hashchange',
    'popstate',
    'resize',
  ] as const;
  interruptions.forEach((name) =>
    window.addEventListener(name, relinquish, { capture: true, passive: true }),
  );
  document.addEventListener('visibilitychange', relinquish);
  reduced.addEventListener('change', updatePreference);
  updatePreference();
  return () => {
    destroy();
    interruptions.forEach((name) => window.removeEventListener(name, relinquish, true));
    document.removeEventListener('visibilitychange', relinquish);
    reduced.removeEventListener('change', updatePreference);
  };
}
