# Personal Website Agent Instructions

## Before changing code

1. Read `DESIGN.md` completely.
2. Read `WRITING_STYLE.md` before creating or editing copy.
3. Inspect the existing implementation and any relevant reference material.
4. Preserve established design tokens unless a specific token revision has been
   approved. Document approved design revisions in `DESIGN.md` before
   implementing them; do not silently broaden their scope.
5. Do not introduce styled UI libraries.
6. Use Base UI only for behavioral primitives.
7. Do not use bento grids, large rounded cards, fake terminals, or generic SaaS
   styling. Gradients and glow are disallowed by default, except for the explicitly
   approved closing-name treatment described below.
8. Run typecheck, lint, formatting checks, and tests before completing a task.
9. Do not run `npm run build` as part of task completion; the user runs the
   production build manually.
10. Remove temporary test code and test-only packages before completion. Retain
    production dependencies needed by the implemented feature.

## Current approved design direction

- Midnight Ink: dark charcoal canvas, soft-blue accent, and self-hosted DM Sans.
- Personal, playful composition; use Abhee as a motion reference, not a source of
  copied identity, content, or assets.
- Preserve portrait/greeting continuity. The homepage plays the intro
  on every mount/reload, without a session-storage gate or replay button.
  Reduced motion still skips the intro.
- The homepage omits the standard header/footer. Other routes retain
  navigation. Contact, résumé, social, and archive links remain accessible.
- All visual routes share the homepage's Lenis smooth scrolling through one
  route-aware root controller; touch and non-wheel navigation remain native.
  Preserve keyboard, anchors/history, nested surfaces, reduced-motion, and
  route-cleanup behavior. Homepage intro, glow and fixed blur stay homepage-only.
- During the welcome, only the portrait/greeting appear. After relocation, the
  full page fills from its top content section to the bottom, with hero copy first;
  no scroll-triggered section reveals. Interruptions reveal everything immediately.
- Experience shows all published, verified roles newest-first, each with its
  existing local company logo; About retains the detailed outcomes.
- All visual routes use the homepage's compact 58rem canvas, typography and
  divider-free editorial layout; preserve functional reading-surface boundaries.
- Notes is retired; its former URLs return 404. Internal provenance remains.
- The oversized centered `Daffa.` ending reveals individual letters in sequence.
  Its closing-only gradient follows the visible-only loop contract in `DESIGN.md`.

## Approved closing-name glow exception

The user has approved adding glow behind the closing name on `/` only.
The later request to match Abhee exactly approves a closing-only `#4361EE`
radial gradient: `120% 120% at 50% -20%, transparent 40%, #4361EE 100%`.
This edge-to-edge closing-stage exception does not change the global accent.

Keep this exception narrow:

- Restrict the effect to the closing-name stage, not the page background, hero,
  project imagery, archive pages, or reading surfaces.
- Keep the dark canvas and legible name/contact text; no neon, glass panels,
  rainbow colors, or generic glowing UI.
- Decorative layers must not intercept pointer events, enter the accessibility
  tree, cause overflow, or alter layout.
- The approved closing-only drift/breathing loop runs only while visible; pause
  offscreen/in hidden tabs. Reduced motion and no-JavaScript remain static.
- Verify the rendered effect on desktop and mobile before claiming completion.

This exception records design approval; it does not mean the glow has already
been implemented or visually verified.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
