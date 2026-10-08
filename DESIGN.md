---
version: alpha
name: Midnight Ink
description: Daffa Azhar's personal website, with a playful welcome and a compact editorial layout.
colors:
  primary: '#191d23'
  surface: '#222831'
  surface-subtle: '#252d37'
  ink: '#e8e9e5'
  ink-muted: '#a5adb8'
  ink-faint: '#a5adb8'
  line: '#343b45'
  line-strong: '#596574'
  inverse-canvas: '#15191f'
  inverse-ink: '#e8e9e5'
  accent: '#9ab8f3'
  accent-ink: '#191d23'
  success: '#a5d6a7'
  warning: '#ffcc80'
  danger: '#f0a0a0'
typography:
  body:
    fontFamily: DM Sans
    fontWeight: 400
    lineHeight: 1.65
  heading:
    fontFamily: DM Sans
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: '-0.02em'
rounded:
  small: 2px
  media: 6px
spacing:
  small: 8px
  medium: 16px
  large: 24px
components:
  page:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.ink}'
  secondary-copy:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.ink-muted}'
  link:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.accent}'
  accent-control:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.accent-ink}'
  code:
    backgroundColor: '{colors.inverse-canvas}'
    textColor: '{colors.inverse-ink}'
---

# Personal website design

## Overview

The site introduces Daffa through his work, writing, experience and interests.
It should feel personal and playful without becoming a SaaS landing page or a
component-library showcase. The welcome provides character; the rest of the
site makes the work easy to inspect and the writing comfortable to read.

This document contains the current approved design, not a revision history or
an implementation status report. Updating documentation does not approve new
visual changes or establish that an effect has been tested.

Responsibilities are split deliberately:

- `DESIGN.md`: visual identity, layout and interaction contracts.
- `WRITING_STYLE.md`: voice, factual integrity and editorial review.
- `AGENTS.md`: development constraints and verification rules.
- `README.md`: setup, content authoring, checks and deployment.

Abhee (`https://abhee.dev/`) is a motion reference, not a source of copied identity,
copy or assets. Preserve the supplied portrait and original project artwork.

## Colors

Midnight Ink uses a dark charcoal canvas, off-white text and a soft-blue accent.
The front matter is a summary of the approved palette. The complete normative
implementation tokens remain in `src/styles/tokens.css`; use their existing
`--color-*` names rather than introducing a second runtime token system.

- Canvas: `#191d23`; surfaces: `#222831` and `#252d37`.
- Ink: `#e8e9e5`; muted and faint ink: `#a5adb8`.
- Functional boundaries: `#343b45`; stronger boundaries: `#596574`.
- Code/inverse surface: `#15191f`, with `#e8e9e5` text.
- Accent: `#9ab8f3`; filled accent controls use `#191d23` text.
- Semantic status colors: success `#a5d6a7`, warning `#ffcc80`, danger `#f0a0a0`.

Use accent for links, selection, focus and restrained active states. Do not use
color alone to communicate state. Syntax highlighting and original illustration
or company-logo colors are not additional interface accents.

Gradients and glow are prohibited except for the closing-name stage described
below. Its dedicated `#4361EE` does not change the global accent.

## Typography

Use self-hosted DM Sans for headings, body, navigation and metadata. Use weight
400 for body copy and 500 for headings and small controls. Establish hierarchy
through size, contrast, alignment and whitespace rather than heavy weights.

Preserve the existing type scale in `src/styles/tokens.css`:

- Small labels: `--text-xs` and `--text-sm`.
- Body and descriptions: `--text-base`,
  `clamp(1rem, 0.98rem + 0.1vw, 1.0625rem)`.
- Section and page headings: the existing scale up through `--text-2xl`,
  `clamp(2rem, 1.65rem + 1.2vw, 2.75rem)`.
- Fluid CSS sizes are documented here rather than converted into fixed
  front-matter values; the token stylesheet remains authoritative.
- Larger type tokens remain available, but do not restore oversized archive
  titles merely because a token exists.
- Heading leading: 1.2; body leading: 1.65; reading leading: 1.7.
- Heading tracking: -0.02em. The oversized closing name has its own scoped styling.

Monospace is for actual code and technical identifiers, not ordinary metadata.
The existing `--font-mono` stack starts with IBM Plex Mono; `--font-code` starts
with Fira Code. Preserve those stacks and fallbacks.

DM Sans asset: `public/fonts/prototype/dm-sans-latin.woff2`, sourced from Google
Fonts DM Sans v17. Its SIL Open Font License and copyright are retained in
`public/fonts/prototype/OFL.txt`. Font loading uses `font-display: swap`; do not
replace it with a runtime Google Fonts request or remove its license.

## Layout

### Shared canvas

All visual routes use the homepage's compact editorial language:

- Outer canvas: `--personal-width: 58rem`.
- Gutters: `--page-gutter: clamp(1.25rem, 3vw, 2rem)`.
- Existing spacing steps and responsive rules, not a new spacing system.
- Whitespace, alignment and typography instead of decorative section dividers.
- Article prose: 60–72ch; project narrative: 58–68ch, constrained by the canvas.
- TOCs become inline when a sidebar would compress the reading column.

Shared tokens such as `--container-max` and `--reading-max` are not permission to
widen the approved route layouts. Preserve functional boundaries around code,
tables, diagrams, callouts and embedded controls, along with visible focus rings.

### Routes and navigation

Primary destinations are Work, Writing, About and Index. Preserve email, résumé,
GitHub, LinkedIn, RSS and existing archive access. Do not invent destinations for
unimplemented features.

- `/` is the public homepage.
- `/prototype` is retired and returns 404; `/` is the sole homepage route.
- `/work` and `/work/[slug]` contain projects and case studies.
- `/writing` and `/writing/[slug]` contain articles.
- `/about` contains the profile and detailed experience.
- `/index` is the complete text-first archive; `/archive` redirects to it.
- `/resume`, `/rss.xml`, `/sitemap.xml` and `/robots.txt` retain their utility roles.
- Unknown slugs and retired `/notes` URLs return 404. Notes is not an active
  collection, section or navigation item. Internal `sourceNotes` provenance stays.

The homepage omits the standard header/footer; its in-section links and
contact ending keep navigation accessible. Other visual routes retain the shared
header/footer on the same dark canvas. They do not inherit the welcome, portrait
relocation, closing name/glow or fixed blur.

### Responsive behavior

Recompose narrow layouts instead of shrinking desktop compositions. Keep body
copy at least 16px and interactive touch targets at least 44 × 44px. Allow long
titles to wrap. Tables and code may scroll within named keyboard-focusable
surfaces; the document must not overflow horizontally. Mobile menus must remain
scrollable in short landscape viewports.

Review at 375, 390, 768, 1024, 1280, 1440 and 1920px widths, plus short landscape.
These are review widths, not instructions to replace existing breakpoints.

## Elevation & Depth

Use tonal surfaces for functional reading and interaction boundaries. Avoid
large shadows, glass panels, floating ornaments and decorative 3D/WebGL.
The existing elevated shadow is reserved for menus or dialogs when needed.
The closing glow is a scoped exception, not a page-background effect.

## Shapes

Default radius is 0; small functional controls may use 2px. Portrait and project
media use the approved 6px radius. Pills are limited to small status/filter
controls. Do not wrap sections in large rounded cards or bento grids.

## Components

### Homepage composition

Keep this order:

1. Portrait/greeting welcome and settled hero copy.
2. Selected work.
3. Experience.
4. Writing.
5. A little about me.
6. Contact, followed by the oversized centered `Daffa.` ending.

Selected work and Writing remain curated from published content. Experience is
an explicit exception to curation: show every published, verified role newest
first. Stack each existing local company logo above its company name, left-aligned
on desktop and mobile. Preserve original logo colors/proportions, dates, role,
employment type, available engagement context and summary. Keep Pilarmedia's
contrast backing; do not recolor the artwork. Link to `/about#experience` for
full outcomes. Do not invent employers, achievements or replacement logos.

### Selected work layout switch

The homepage defaults to compact thumbnail-left, title/description-right
rows. A labeled, keyboard-accessible list/grid button pair beside the heading
switches to a two-column image-led grid, or one column on narrow screens.

Use native WAAPI FLIP on the same image elements. Do not clone overlays, swap
images instantly or add a heavy motion library. Preserve artwork, order, metadata
and links. Cancel animations on interruption, resize and unmount; rapid toggles
measure current geometry. The SSR/no-JavaScript baseline is a usable list with
no dead enhancement controls. Reduced motion switches immediately, including
live preference changes.

### Archives and reading surfaces

Work makes project purpose, role and evidence easy to find. Writing uses readable
chronological rows and existing filters. Case studies distinguish individual
contribution from team results; articles retain figures, captions, code, references
and related content where present. About retains detailed outcomes. Index stays
dense and text-first while sharing the same canvas and typography.

Preserve content, imagery, filters, metadata and links during visual work. Do not
add compulsory testimonials, newsletter forms, statistics, search or other
features just because an earlier brief suggested them.

### Navigation and feedback

Use Base UI only for behavioral primitives, with custom token-based styling.
Mobile navigation has an accessible name, managed focus, Escape dismissal and
focus return; its internal scrolling works while the dialog locks background
scrolling. Active navigation remains recognizable without relying only on color.

Use descriptive link labels and action-specific error/empty states. Clipboard
controls announce both success and failure, with manual copying available when
the API is missing or denied. Heading anchors remain visible below the sticky
header. Do not erase list markers in article prose.

## Do's and Don'ts

- Preserve existing tokens unless a specific revision is approved. Record that
  revision here before implementation, keeping its scope explicit.
- Use purposeful imagery with declared dimensions, responsive sizes and useful
  alt text/captions. Do not crop meaningful diagram content or distort portraits.
- Keep content server-rendered and readable without JavaScript. Enhancement
  failure or interrupted motion must expose the settled layout.
- Target WCAG 2.2 AA: semantic landmarks, one h1, clear heading order, skip link,
  keyboard access, visible accent focus, contrast and non-color state cues.
- Prefer focused components and minimal client JavaScript. Do not introduce
  styled UI libraries, fake terminals, skill percentages, rotating titles,
  typewriter copy, cursor effects or decorative logo marquees.
- Keep unique metadata, canonical URLs, social previews and structured data.
  Index only public content; preserve retired-route 404s.
- Performance goals are LCP below 2.5s, CLS below 0.1 and INP below 200ms at the
  75th percentile, with Lighthouse Performance 90+ on representative mobile
  tests. These are targets, not claims about current measurements.

## Motion contracts

### Shared scrolling

One route-aware root controller enhances native document scrolling with Lenis:
`lerp: 0.16`, `wheelMultiplier: 1`, `syncTouch: false`, native anchors and nested
scroll handling. Never translate a page wrapper, snap sections or invent touch
momentum. Do not add a second homepage-owned instance.

Keyboard, touch, anchors/history, focus, editable controls, modified/horizontal
wheel input and nested surfaces retain native behavior. Cancel interpolation
before native navigation or input takes over, and on resize/visibility changes.
Clean up the instance, RAF work and listeners on route changes and unmount.
Destroy under reduced motion, including live changes; recreate when allowed.
No-JavaScript scrolling stays native. Dialog background locking is a navigation
primitive, not permission for Lenis to lock the document.

### Welcome and page-load cascade

The homepage plays the intro on every mount/reload. No session-storage
gate or replay button. Preserve the same portrait and greeting nodes as they
move into the real hero slots.

Use the supplied chest-up illustration with its original face, hair, neck, collar
and shirt. Keep natural proportions and the transparent optimized local asset;
no composited fake neck or attached animated arm. About keeps its existing photo.
One separate decorative hand beside the greeting waves twice, then disappears
before relocation. The portrait stays still during the wave hold.

Preserve scoped timing: 560ms portrait entrance, 420ms greeting reveal, 1400ms
wave gesture with two 420ms hand cycles, and 900ms relocation. The existing
stylesheet and sequence logic own delays; do not restore obsolete timing recipes.

During the welcome, only portrait/greeting appear on the blank canvas. After
relocation, the whole page fills top to bottom, hero copy first, then the sections
in composition order. Section entrance is 640ms with 160ms stagger and a 24px
rise; hero copy uses its existing smaller stagger. This is a page-load cascade,
not scroll-triggered section reveals. Do not auto-scroll or lock input.

Scroll, pointer/touch, keyboard/focus, resize, preference change or departure
cancels the sequence and reveals all content immediately. StrictMode cleanup,
failed enhancement, reduced motion and no-JavaScript must leave usable content.
Reduced motion skips welcome movement, opacity gating, blur and stagger entirely.

### Closing name and glow

After the page cascade settles, the centered `Daffa.` ending has its own in-view
letter entrance: 0.5em rise, opacity 0→1 and 6px→0 blur over 760ms, staggered 65ms.
Rearm after the stage fully leaves the viewport; replay when at least 12% enters.
Small movements while it remains visible do not restart it. Live reduced-motion
changes cancel/rearm correctly; the static baseline stays visible.

The sole gradient/glow exception is behind this name on the homepage:

```css
radial-gradient(120% 120% at 50% -20%, transparent 40%, #4361EE 100%)
```

Keep the stage edge-to-edge with 128px top and 64px bottom space, glow offset
64px down and the name lowered 54px. Preserve its approved 6s eased alternate
loop: horizontal drift -8%→+8%, scaleX 1.24→1.36 and scaleY 0.90→1.20. Overscan
and clipping prevent exposed edges or overflow. Run only after the intro settles
and while visible; pause offscreen/in hidden tabs. Reduced motion and
no-JavaScript retain a static glow and legible name.

Do not add the obsolete two-halo mask/fade-scale treatment, text glow, neon,
rainbow colors or glow on hero, projects, archives, reading surfaces or the global
background. Decoration stays aria-hidden and non-interactive, without layout
changes. Verify desktop and mobile rendering after any change to this effect.

### Fixed bottom blur

The homepage alone uses one decorative layer fixed at the viewport bottom:
100px height, 4px backdrop blur, transparent-to-canvas background, and a mask
opaque over the bottom half fading toward the top. Content scrolls behind it;
it is not attached to the closing name or section animations.

Hide it during welcome, reduced motion and visible keyboard focus. It ignores
pointer events, stays aria-hidden, introduces no overflow and unmounts on other
routes. Browsers without backdrop-filter retain crisp content.

### Ordinary controls

Preserve shared 180ms, 260ms and 480ms durations and existing easing tokens.
Use short color, underline, arrow or menu transitions. No decorative parallax,
bounce or autoplay loops beyond the explicitly scoped closing glow. Essential
information must never depend on hover or animation.
