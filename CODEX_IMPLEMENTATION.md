# CODEX_IMPLEMENTATION.md — Personal Website Implementation Brief

## 0. Role

You are the implementation agent for a production-ready personal website.

Your job is to build the website described in `DESIGN.md` with high fidelity, strong accessibility, excellent performance, and a maintainable content architecture.

Treat `DESIGN.md` as the primary design source of truth.

Do not reinterpret the project into a generic developer portfolio, SaaS landing page, dashboard, or component-library showcase.

The intended result is:

> A calm, modern personal archive in which projects, knowledge, and growth are presented with the precision of a well-designed product.

---

## 1. Working mode

Before making changes:

1. Inspect the repository.
2. Identify the existing framework, package manager, folder structure, and conventions.
3. Read `DESIGN.md` completely.
4. Check whether the repository already contains:
   - Next.js;
   - Tailwind CSS;
   - Base UI;
   - MDX or another content system;
   - existing design tokens;
   - existing pages or components;
   - tests;
   - linting and formatting configuration.
5. Preserve useful existing code and conventions.
6. Avoid large rewrites unless the current structure prevents the implementation.

Do not ask for confirmation when a reasonable implementation choice can be made from this document and `DESIGN.md`.

When the repository is empty or unsuitable, initialize the project using the stack below.

---

## 2. Required technology stack

Use the following stack unless the repository already has an equivalent, compatible implementation:

```text
Framework          Next.js with App Router
Language           TypeScript
Styling            Tailwind CSS + CSS custom properties
Design tokens      CSS custom properties as the source of truth
Headless UI        Base UI
Content            MDX or a typed file-based content layer
Icons              Lucide React or small custom SVG icons
Animation          Native CSS transitions
Validation         Zod where structured content validation is needed
Testing            Vitest + Testing Library
End-to-end         Playwright
Linting            ESLint
Formatting         Prettier
Package manager    Use the package manager already present in the repository
```

Preferred package when Base UI is not installed:

```bash
npm install @base-ui/react
```

Do not install a styled UI library.

Do not use:

- Material UI;
- Chakra UI;
- Mantine;
- Ant Design;
- Radix Themes;
- Bootstrap;
- a pre-styled portfolio template;
- a full shadcn/ui theme;
- a page builder;
- a heavy animation framework for basic transitions.

Base UI or another headless primitive may only provide behavior and accessibility. All visual styling must use the project's design tokens.

---

## 3. Design source of truth

The following priority order is mandatory:

1. `DESIGN.md`
2. This implementation brief
3. Existing project conventions, when they do not conflict with items 1–2
4. Reasonable implementation decisions

When a value already exists in `DESIGN.md`, do not invent a conflicting one.

Examples:

- use the defined monochrome palette;
- use one accent color;
- use `Instrument Sans`;
- use `IBM Plex Mono` only for code;
- use minimal border radius;
- use rules and spacing instead of rounded cards;
- use restrained motion;
- use large but controlled typography;
- use editorial rows rather than generic card grids.

---

## 4. Implementation principles

### 4.1 Build content-first

The page structure must remain clear when:

- JavaScript is disabled;
- images fail to load;
- motion is disabled;
- content becomes longer than the initial examples;
- new projects and articles are added.

### 4.2 Use design tokens everywhere

Do not hard-code visual values repeatedly inside components.

All core visual values must come from tokens:

- colors;
- typography;
- spacing;
- container widths;
- border colors;
- radius;
- motion timing;
- easing;
- z-index;
- breakpoints where practical.

Good:

```tsx
<section className="bg-canvas text-ink py-section">
```

Acceptable:

```tsx
<section
  style={{
    background: "var(--color-canvas)",
    color: "var(--color-ink)",
  }}
>
```

Avoid:

```tsx
<section className="bg-zinc-100 text-zinc-950 py-24 rounded-3xl shadow-xl">
```

### 4.3 Use custom visual components

The following components must be custom-built according to `DESIGN.md`:

```text
HeroStatement
StatusLine
SectionHeader
FeaturedProject
ProjectSplit
ProjectRow
ArticleRow
NoteRow
MetadataList
ExperienceTimeline
TestimonialQuote
Figure
FigureCaption
SiteHeader
SiteFooter
```

Use Base UI only for behavior-heavy primitives such as:

```text
Dialog
Menu
Popover
Tooltip
Tabs
Accordion
Select
Combobox
Toast
```

### 4.4 Avoid common developer-portfolio patterns

Do not create:

- bento-grid homepage layouts;
- gradient backgrounds;
- glow effects;
- floating technology icons;
- fake terminal cards;
- animated skill bars;
- skill percentages;
- rotating job titles;
- typewriter text;
- cursor effects;
- 3D decorative objects;
- continuously moving logo strips;
- large rounded cards;
- generic “crafting digital experiences” copy.

---

## 5. Project phases

Implement the website in the following order.

### Phase 1 — Repository and foundation

Deliver:

- project bootstrapping, if needed;
- TypeScript strict mode;
- linting and formatting;
- global CSS;
- design tokens;
- fonts;
- container and grid utilities;
- accessibility baseline;
- metadata baseline;
- route skeletons;
- content loading foundation.

### Phase 2 — Global layout

Deliver:

- site header;
- desktop navigation;
- mobile navigation using Base UI Dialog;
- skip-to-content link;
- main content shell;
- footer;
- global focus styling;
- responsive containers.

### Phase 3 — Content system

Deliver typed content collections for:

- projects;
- articles;
- notes;
- experience;
- testimonials.

Create validation for frontmatter.

Create sample content that demonstrates all layouts.

### Phase 4 — Homepage

Deliver the homepage sections in the exact hierarchy described below.

### Phase 5 — Work and project case studies

Deliver:

- work listing;
- featured project;
- project rows;
- individual project pages;
- metadata;
- figures;
- case-study navigation;
- related writing.

### Phase 6 — Writing and notes

Deliver:

- writing listing;
- article detail;
- notes listing;
- note detail;
- filters;
- optional static search when enough content exists;
- RSS.

### Phase 7 — About and Index

Deliver:

- narrative About page;
- experience timeline;
- personal interests section;
- complete Index page.

### Phase 8 — Quality

Deliver:

- accessibility review;
- responsive review;
- unit tests;
- end-to-end tests;
- metadata and social previews;
- performance optimization;
- final acceptance checklist.

Do not start advanced optional features before the core phases are complete.

---

## 6. Required routes

Implement:

```text
/
├── /work
│   └── /work/[slug]
├── /writing
│   └── /writing/[slug]
├── /notes
│   └── /notes/[slug]
├── /about
├── /index
├── /resume
├── /rss.xml
├── /sitemap.xml
└── /robots.txt
```

Optional routes, only after the core site is complete:

```text
/uses
/guestbook
/book-notes
/talks
```

Use static generation wherever possible.

Use `generateStaticParams` for content routes.

Use Next.js metadata APIs.

---

## 7. Recommended folder structure

Adapt when the repository already has a strong convention.

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── writing/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── notes/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── index/
│   │   └── page.tsx
│   │
│   ├── resume/
│   │   └── route.ts
│   │
│   ├── rss.xml/
│   │   └── route.ts
│   │
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   └── error.tsx
│
├── components/
│   ├── primitives/
│   │   ├── button.tsx
│   │   ├── text-link.tsx
│   │   ├── dialog.tsx
│   │   ├── tooltip.tsx
│   │   ├── tabs.tsx
│   │   └── input.tsx
│   │
│   ├── layout/
│   │   ├── site-header.tsx
│   │   ├── mobile-navigation.tsx
│   │   ├── site-footer.tsx
│   │   ├── container.tsx
│   │   ├── section.tsx
│   │   └── grid.tsx
│   │
│   ├── content/
│   │   ├── status-line.tsx
│   │   ├── hero-statement.tsx
│   │   ├── section-header.tsx
│   │   ├── featured-project.tsx
│   │   ├── project-split.tsx
│   │   ├── project-row.tsx
│   │   ├── article-row.tsx
│   │   ├── note-row.tsx
│   │   ├── metadata-list.tsx
│   │   ├── experience-timeline.tsx
│   │   └── testimonial-quote.tsx
│   │
│   ├── article/
│   │   ├── article-header.tsx
│   │   ├── article-toc.tsx
│   │   ├── code-block.tsx
│   │   ├── figure.tsx
│   │   ├── figure-caption.tsx
│   │   ├── callout.tsx
│   │   └── related-content.tsx
│   │
│   └── seo/
│       ├── structured-data.tsx
│       └── social-image.tsx
│
├── content/
│   ├── projects/
│   ├── writing/
│   ├── notes/
│   ├── experience/
│   └── testimonials/
│
├── lib/
│   ├── content/
│   │   ├── projects.ts
│   │   ├── writing.ts
│   │   ├── notes.ts
│   │   ├── experience.ts
│   │   ├── testimonials.ts
│   │   └── schemas.ts
│   ├── metadata.ts
│   ├── dates.ts
│   ├── reading-time.ts
│   ├── cn.ts
│   └── site-config.ts
│
├── styles/
│   ├── tokens.css
│   ├── typography.css
│   ├── utilities.css
│   └── article.css
│
└── test/
    ├── components/
    └── e2e/
```

---

## 8. Design-token implementation

Create a single source of truth in:

```text
src/styles/tokens.css
```

Use the values defined in `DESIGN.md`.

Required token groups:

- colors;
- typography;
- line heights;
- letter spacing;
- spacing;
- container sizes;
- reading widths;
- borders;
- radii;
- durations;
- easing;
- z-index;
- section spacing.

Example baseline:

```css
:root {
  --color-canvas: #f4f4f1;
  --color-surface: #ffffff;
  --color-surface-subtle: #e9e9e5;

  --color-ink: #111111;
  --color-ink-muted: #62625e;
  --color-ink-faint: #8a8a84;

  --color-line: #cecec8;
  --color-line-strong: #9c9c95;

  --color-inverse-canvas: #101010;
  --color-inverse-ink: #f5f5f1;

  --color-accent: #f2e533;
  --color-accent-ink: #111111;

  --font-sans:
    "Instrument Sans",
    "Helvetica Neue",
    Helvetica,
    Arial,
    sans-serif;

  --font-mono:
    "IBM Plex Mono",
    "SFMono-Regular",
    Consolas,
    monospace;

  --text-xs: clamp(0.72rem, 0.69rem + 0.12vw, 0.80rem);
  --text-sm: clamp(0.84rem, 0.80rem + 0.15vw, 0.94rem);
  --text-base: clamp(1rem, 0.96rem + 0.18vw, 1.10rem);
  --text-lg: clamp(1.22rem, 1.12rem + 0.42vw, 1.52rem);
  --text-xl: clamp(1.55rem, 1.35rem + 0.85vw, 2.15rem);
  --text-2xl: clamp(2.05rem, 1.65rem + 1.70vw, 3.25rem);
  --text-3xl: clamp(2.75rem, 1.90rem + 3.30vw, 5.50rem);
  --text-hero: clamp(3.40rem, 2.10rem + 5.20vw, 8.50rem);

  --leading-tight: 0.94;
  --leading-heading: 1.02;
  --leading-ui: 1.25;
  --leading-body: 1.55;
  --leading-reading: 1.70;

  --tracking-hero: -0.045em;
  --tracking-heading: -0.030em;
  --tracking-body: -0.010em;
  --tracking-label: 0.035em;

  --space-1: 0.25rem;
  --space-2: 0.50rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.50rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 8rem;
  --space-11: 10rem;

  --container-max: 100rem;
  --reading-max: 47.5rem;
  --page-gutter: clamp(1rem, 3vw, 3rem);
  --section-space: clamp(4rem, 9vw, 10rem);

  --radius-none: 0;
  --radius-small: 2px;

  --duration-fast: 120ms;
  --duration-normal: 200ms;
  --duration-slow: 360ms;

  --ease-standard: cubic-bezier(0.25, 0.10, 0.25, 1);
  --ease-enter: cubic-bezier(0.22, 1, 0.36, 1);

  --z-header: 40;
  --z-overlay: 80;
  --z-modal: 100;
}
```

Map these values into Tailwind when Tailwind is used.

Do not rely on Tailwind's default color palette as the visual source of truth.

---

## 9. Font implementation

Use `next/font`.

Primary:

```text
Instrument Sans
```

Code:

```text
IBM Plex Mono
```

Requirements:

- self-host through `next/font` where supported;
- use only required weights;
- minimize font payload;
- avoid additional font families;
- expose font variables;
- prevent layout shift;
- ensure fallback metrics are reasonable.

---

## 10. Global layout requirements

### Header

Desktop:

- height between 64–72px;
- name or monogram on the left;
- navigation on the right;
- active route indication;
- no large CTA button;
- no shadow;
- optional sticky behavior;
- canvas background.

Mobile:

- name left;
- “Menu” right;
- Base UI Dialog;
- full-screen or full-width panel;
- navigation rows separated by thin rules;
- social and résumé links at the bottom;
- focus management and Escape support.

### Footer

Use either:

- dark inverse surface; or
- clearly separated light surface.

Include:

- direct contact statement;
- email;
- GitHub;
- LinkedIn;
- résumé;
- primary routes;
- RSS;
- copyright;
- location;
- optional source-code link.

---

## 11. Homepage implementation

Implement the following sections in this order:

### 11.1 Status line

Example:

```text
AVAILABLE FOR SELECTED PROJECTS      INDONESIA · UTC+7      UPDATED JUL 2026
```

Use one small accent marker.

Do not use a green glowing status pill.

### 11.2 Hero

Required:

- section number;
- clear positioning;
- concise supporting paragraph;
- selected links;
- optional project or portrait visual.

Example content structure:

```text
01 / INTRODUCTION

Software engineer building
dependable digital products
from interface to infrastructure.

I work across web applications, backend architecture,
deployment automation, and technical writing.

Selected work ↗
Read the journal ↗
Résumé ↗
```

Do not use:

- typewriter effects;
- rotating roles;
- animated words;
- floating framework logos;
- a small circular profile picture.

### 11.3 Featured visual

Use one large, purposeful visual.

Suitable options:

- project system overview;
- product screenshot;
- restrained portrait;
- collage of two or three meaningful frames;
- architecture image.

Do not use an ornamental abstract 3D illustration.

### 11.4 Selected work

Show:

- one full-width featured project;
- one or two secondary projects;
- link to complete work archive.

Each project must include:

- title;
- summary;
- role;
- period;
- discipline;
- technologies;
- outcome;
- visual;
- detail link.

### 11.5 Knowledge proposition

A small editorial statement explaining the writing approach.

Example:

```text
Complex systems become easier
when the model is visible.
```

This may use the accent background once.

### 11.6 Featured writing

Show exactly three strong items.

Each row includes:

- date;
- title;
- concise description;
- topic;
- reading time;
- arrow.

### 11.7 Experience preview

Show two recent roles.

Include:

- period;
- role;
- organization;
- one concise outcome-oriented summary;
- related project link where relevant.

### 11.8 Testimonials

Show one to three static testimonials.

Do not use a carousel.

### 11.9 Personal note

A short section about selected interests outside work.

Keep it restrained and relevant.

### 11.10 Newsletter

Optional.

Only include when there is a real newsletter destination.

Do not create a non-functional form.

---

## 12. Work listing

Required:

- page header;
- introductory copy;
- one featured project;
- curated project layout;
- archive rows;
- optional filters only when enough projects exist.

Project categories may include:

```text
Product
Front-end
Backend
Infrastructure
Research
```

Do not sort by technology as the primary organization.

---

## 13. Project case-study implementation

Every project page must support:

1. Title
2. Summary
3. Hero visual
4. Metadata
5. Context
6. Problem
7. Role and contribution
8. Team and credits
9. Constraints
10. Architecture or process
11. Key decisions
12. Technical details
13. Challenges
14. Results
15. Lessons learned
16. Related writing
17. Previous/next project

Metadata example:

```text
ROLE           Backend Engineer
PERIOD         2025—2026
TEAM           3 people
STATUS         Completed
DISCIPLINES    Architecture · Backend · Reliability
```

Requirements:

- clearly separate personal contribution from team contribution;
- use concrete outcomes;
- do not use generic marketing claims;
- support full-width figures and diagrams;
- use captions;
- use sticky table of contents only when the page is long enough;
- remove sticky TOC on mobile;
- create previous/next navigation.

---

## 14. Writing implementation

### Writing listing

Support:

- featured article;
- chronological rows;
- topic filtering;
- optional language filtering;
- RSS;
- search only when useful.

Filters should be text-based:

```text
ALL
SYSTEMS
LARAVEL
NEXT.JS
DEVOPS
CAREER
```

Do not use a dense cloud of rounded chips.

### Article detail

Support:

- title;
- description/dek;
- date;
- updated date;
- topics;
- reading time;
- optional cover;
- TOC;
- prose;
- code blocks;
- figures;
- captions;
- references;
- related articles;
- optional newsletter.

Reading rules:

- body width `60–72ch`;
- desktop text `17–19px`;
- line height `1.65–1.75`;
- headings with generous top spacing;
- code may extend wider than the text column;
- tables scroll horizontally on small screens.

---

## 15. Notes implementation

Notes are not shortened articles. They are optimized for retrieval.

Listing example:

```text
2026

04 JUL   Fixing Supervisor BACKOFF on Ubuntu       Laravel · Ops   ↗
02 JUL   Synchronizing migrations with an existing DB              ↗
01 JUL   Taking commits between Git repositories   Git             ↗
```

Each note should support:

- title;
- date;
- updated date;
- last-tested date;
- topics;
- environment;
- concise explanation;
- code or command;
- expected output;
- caveat;
- references;
- related article.

Example metadata:

```text
LAST TESTED     JUL 2026
ENVIRONMENT     UBUNTU 24.04 · PHP 8.3
TOPIC           LARAVEL · SUPERVISOR
```

---

## 16. About page

Required content order:

1. Contextual portrait or image
2. Introduction
3. Working philosophy
4. Origin story
5. Current focus
6. Selected interests
7. Experience
8. Concise capabilities
9. Contact

Tone:

- specific;
- warm;
- calm;
- reflective;
- not self-promotional.

Avoid generic wording such as:

```text
I am passionate, hardworking, and always eager to learn.
```

Prefer:

```text
I began documenting technical problems because writing exposed gaps in my own understanding.
```

---

## 17. Index page

The Index is the complete archive.

Group content by:

```text
WORK
WRITING
NOTES
TALKS
SIDE PROJECTS
BOOK NOTES
USES
PERSONAL
WEBSITE
```

The page should be:

- dense;
- fast;
- text-first;
- easy to scan;
- grouped by year or category;
- keyboard-friendly.

Do not force the visual treatment used on the homepage.

---

## 18. Content models

Create Zod schemas or equivalent typed schemas.

### Project

```yaml
---
title: "Work Fusion"
slug: "work-fusion"
summary: "Reliable workflow and audit-trail infrastructure."
year_start: 2025
year_end: 2026
status: "completed"
featured: true
featured_order: 1

role:
  - "Backend Engineer"

disciplines:
  - "System Architecture"
  - "Backend Development"
  - "Reliability Engineering"

stack:
  - "Laravel"
  - "PostgreSQL"
  - "NATS JetStream"

team_size: 3
company: null
location: "Indonesia"

links:
  live: null
  repository: null

outcomes:
  - "A concrete and defensible outcome."

cover:
  src: "/images/work/work-fusion-cover.webp"
  alt: "System overview of the Work Fusion workflow"
  background: "subtle"

published_at: "2026-07-01"
updated_at: "2026-07-07"
---
```

### Article

```yaml
---
title: "Building Audit Trails That Survive Service Failure"
slug: "reliable-audit-trails"
description: "Transactional recording and asynchronous publication."
published_at: "2026-07-07"
updated_at: "2026-07-07"
language: "en"
reading_time: 9
featured: true

topics:
  - "Systems"
  - "Laravel"
  - "Reliability"

related_projects:
  - "work-fusion"
---
```

### Note

```yaml
---
title: "Fixing Supervisor BACKOFF on Ubuntu"
slug: "supervisor-backoff"
published_at: "2026-07-07"
updated_at: "2026-07-07"
last_tested_at: "2026-07-07"

topics:
  - "Ubuntu"
  - "Supervisor"
  - "Laravel"

environment:
  - "Ubuntu 24.04"
  - "Supervisor 4"
---
```

### Experience

```yaml
company: "Company Name"
role: "Software Engineer"
location: "Remote"
start: "2025-09"
end: null
summary: "One sentence of context."

outcomes:
  - "Action, context, and outcome."

related_projects:
  - "project-slug"
```

---

## 19. Initial content seeds

Create editable sample content so every page can be evaluated.

Use neutral placeholders when personal facts are not provided.

Recommended seed project topics:

```text
Work Fusion
Event Booking Platform
Deployment Infrastructure
Legacy Retail Management System
```

Recommended writing topics:

```text
Building reliable audit trails
Integrating a payment gateway with Next.js and Laravel
Deploying Laravel with GitLab CI/CD
Recovering from Supervisor worker failures
Synchronizing multiple Git remotes
```

Recommended note topics:

```text
Killing a process on a Linux port
Fixing Laravel storage permissions
Restarting Laravel queues
Supervisor BACKOFF troubleshooting
Nginx and PHP-FPM configuration
```

Do not fabricate employers, dates, metrics, quotes, or testimonials.

Use explicit placeholders such as:

```text
TODO: Replace with verified metric.
TODO: Add permission-approved testimonial.
TODO: Add final résumé URL.
```

---

## 20. Copywriting rules

Voice:

- direct;
- specific;
- calm;
- reflective;
- technically credible;
- free from exaggerated claims.

Good:

```text
Building reliable systems from interface to infrastructure.
```

Good:

```text
Notes from shipping, breaking, and improving software.
```

Avoid:

```text
Crafting exceptional digital experiences.
```

Avoid:

```text
Turning ideas into reality with cutting-edge technology.
```

Project-summary formula:

```text
What it is + who or what it helps + distinctive responsibility or outcome.
```

Experience-bullet formula:

```text
Action + scope/context + decision + outcome.
```

Do not invent performance claims.

---

## 21. Component API guidance

### SectionHeader

```ts
type SectionHeaderProps = {
  index: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
};
```

### MetadataList

```ts
type MetadataItem = {
  label: string;
  value: React.ReactNode;
};

type MetadataListProps = {
  items: MetadataItem[];
  columns?: 1 | 2 | 3 | 4;
};
```

### ProjectRow

```ts
type ProjectRowProps = {
  index: string;
  title: string;
  summary?: string;
  role: string;
  period: string;
  href: string;
};
```

### ArticleRow

```ts
type ArticleRowProps = {
  title: string;
  description?: string;
  href: string;
  date: string;
  topics: string[];
  readingTime?: number;
};
```

### NoteRow

```ts
type NoteRowProps = {
  title: string;
  href: string;
  date: string;
  topics: string[];
};
```

Keep component APIs semantic and content-oriented.

Avoid APIs based on visual gimmicks such as:

```ts
glow
fancy
glass
gradient
bentoSize
```

---

## 22. Base UI integration

Use Base UI only where interaction behavior is non-trivial.

### Mobile navigation

Use Base UI Dialog.

Required behavior:

- correct accessible name;
- focus trapped inside;
- Escape closes;
- focus returns to trigger;
- background scrolling disabled;
- click outside closes;
- reduced-motion compatible.

### Tooltip

Use only for icon-only controls.

Primary navigation must use visible labels.

### Tabs

Use only when tab semantics are correct.

For archive filters that navigate or change URLs, normal links or buttons may be better.

### Select and Combobox

Use only when native controls are insufficient.

Style all states through design tokens.

---

## 23. Motion requirements

Allowed:

- link underline;
- arrow shift up to 4px;
- image scale up to `1.015`;
- simple menu fade and translation;
- short color transitions;
- optional page fade.

Timing:

```css
--duration-fast: 120ms;
--duration-normal: 200ms;
--duration-slow: 360ms;
```

Disallowed:

- spring motion;
- bounce;
- scroll-jacking;
- decorative parallax;
- autoplay loop;
- large hover transforms;
- content appearing only through animation.

Implement `prefers-reduced-motion`.

---

## 24. Responsive requirements

### Mobile

- minimum body size `16px`;
- minimum target size `44 × 44px`;
- stack split layouts;
- transform tables into rows;
- remove sticky sidebars;
- keep code scrollable;
- preserve title hierarchy;
- avoid horizontal page scrolling.

### Tablet

- use 8-column behavior;
- preserve reading width;
- use split layouts only when both sides remain legible.

### Desktop

- use a 12-column grid;
- cap content width;
- do not stretch prose;
- use whitespace for composition;
- allow selected media to become full width.

Test at minimum:

```text
375 × 812
390 × 844
768 × 1024
1024 × 768
1280 × 800
1440 × 900
1920 × 1080
```

---

## 25. Accessibility requirements

Target WCAG 2.2 AA.

Required:

- skip link;
- semantic landmarks;
- one `h1` per page;
- valid heading hierarchy;
- keyboard navigation;
- visible focus;
- no color-only state;
- meaningful alt text;
- decorative images use empty alt;
- captions for diagrams;
- accessible forms;
- connected error messages;
- reduced-motion support;
- correct page language;
- accessible external-link labeling;
- accessible mobile menu;
- accessible filters;
- accessible code blocks;
- sufficient contrast.

Focus style:

```css
:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 3px;
}
```

Do not use signal yellow as small text on white.

---

## 26. Performance requirements

Targets:

```text
Lighthouse Performance     90+
Lighthouse Accessibility   95+
Lighthouse Best Practices  95+
Lighthouse SEO             95+
LCP                        under 2.5s
CLS                        under 0.1
INP                        under 200ms
```

Requirements:

- static-render content;
- server components by default;
- minimal client components;
- optimized images;
- declared image dimensions;
- AVIF/WebP;
- responsive `sizes`;
- lazy loading below the fold;
- no layout shift from fonts;
- minimal third-party scripts;
- no heavy animation library;
- no autoplay background video;
- no WebGL decoration;
- no hydration for static article content.

---

## 27. SEO and metadata

Implement:

- site-wide metadata defaults;
- unique page titles;
- unique descriptions;
- canonical URLs;
- Open Graph metadata;
- social preview images;
- sitemap;
- robots;
- RSS;
- structured data.

Structured data:

```text
Home/About        Person
Writing detail    Article or TechArticle
Project detail    CreativeWork
Nested pages      BreadcrumbList
```

Generate social images with:

- canvas background;
- dark text;
- one accent detail;
- category/date;
- title;
- site identity.

No gradients.

---

## 28. Testing requirements

### Unit and component tests

At minimum test:

- mobile navigation;
- active navigation state;
- SectionHeader action rendering;
- content schema validation;
- project sorting;
- article sorting;
- filter behavior;
- note environment metadata;
- related-content selection;
- invalid slug behavior.

### Accessibility tests

Use automated checks where practical.

Validate:

- mobile dialog behavior;
- focus return;
- heading order;
- link names;
- form labels;
- color-independent states.

### End-to-end tests

Use Playwright.

Required flows:

1. Load homepage.
2. Navigate to Work.
3. Open a project.
4. Navigate to Writing.
5. Open an article.
6. Navigate to Notes.
7. Open a note.
8. Open and close mobile navigation with keyboard.
9. Verify unknown content slug shows 404.
10. Verify RSS route responds.
11. Verify sitemap route responds.
12. Verify core pages have titles and descriptions.

---

## 29. Code-quality rules

- TypeScript strict mode.
- No `any` unless justified with a comment.
- No disabled lint rules without explanation.
- No duplicated visual constants.
- No oversized page components.
- Separate data loading from rendering.
- Prefer server components.
- Use semantic naming.
- Avoid premature abstraction.
- Avoid global state unless truly needed.
- Use URL state for shareable filters.
- Keep components focused.
- Write comments for decisions, not obvious syntax.
- Keep imports ordered according to the repository convention.
- Ensure all build, lint, and tests pass.

---

## 30. Error and empty states

Implement restrained states consistent with the visual system.

### Not found

Include:

- clear heading;
- brief explanation;
- link back to relevant archive or homepage.

### Empty archive

Do not render an empty decorative grid.

Show:

```text
No notes are available in this category yet.
View all notes ↗
```

### Content load failure

For build-time content errors:

- fail the build with a clear schema error;
- include the content filename;
- include the invalid field;
- do not silently ignore malformed content.

---

## 31. Security and privacy

- Do not expose secrets in client code.
- Do not add analytics without a configuration switch.
- Do not add a newsletter integration without environment validation.
- Do not add a guestbook database in the core phase.
- Sanitize rendered user-provided content if optional interactive features are added.
- External links opened in new tabs must use appropriate `rel`.
- Do not expose private email addresses in structured data unless intentionally public.

---

## 32. Deliverables

At completion, provide:

1. Implemented source code.
2. Updated `README.md`.
3. Setup instructions.
4. Environment variable documentation.
5. Content-authoring instructions.
6. Testing instructions.
7. Deployment instructions.
8. A list of implemented routes.
9. A list of remaining `TODO` content placeholders.
10. A brief explanation of any deviations from `DESIGN.md`.
11. Screenshots or visual test output when the environment supports it.

---

## 33. README requirements

The final README must include:

```text
Project overview
Technology stack
Local development
Available scripts
Content structure
How to add a project
How to add an article
How to add a note
Design-token location
Testing
Production build
Deployment
Environment variables
Accessibility notes
Known TODOs
```

---

## 34. Definition of done

The implementation is done only when:

### Foundation

- [ ] The app builds successfully.
- [ ] TypeScript passes.
- [ ] ESLint passes.
- [ ] Formatting passes.
- [ ] Tests pass.
- [ ] `DESIGN.md` tokens are implemented.

### Visual system

- [ ] Instrument Sans is used.
- [ ] IBM Plex Mono is limited to code.
- [ ] One accent color is used.
- [ ] Border radius remains minimal.
- [ ] Rounded-card patterns are avoided.
- [ ] No gradients or glow effects exist.
- [ ] Motion is restrained.
- [ ] Mobile layouts are intentionally composed.

### Pages

- [ ] Homepage is complete.
- [ ] Work listing is complete.
- [ ] Project detail is complete.
- [ ] Writing listing is complete.
- [ ] Article detail is complete.
- [ ] Notes listing is complete.
- [ ] Note detail is complete.
- [ ] About is complete.
- [ ] Index is complete.
- [ ] 404 is complete.

### Content

- [ ] Typed content schemas exist.
- [ ] Sample content covers all layouts.
- [ ] No fabricated metrics are presented as fact.
- [ ] Personal contribution can be distinguished from team contribution.
- [ ] All placeholder content is marked clearly.

### Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus is visible.
- [ ] Mobile menu is accessible.
- [ ] Contrast passes AA.
- [ ] Alt text is reviewed.
- [ ] Reduced motion is supported.
- [ ] Heading hierarchy is valid.

### Performance

- [ ] Images are optimized.
- [ ] Static content is server-rendered.
- [ ] Client JavaScript is minimized.
- [ ] Core Web Vitals are acceptable.
- [ ] No unnecessary heavy package is installed.

### SEO

- [ ] Metadata is unique.
- [ ] Open Graph images work.
- [ ] Sitemap works.
- [ ] Robots works.
- [ ] RSS works.
- [ ] Structured data validates.

---

## 35. Final instruction

Do not optimize for the fastest visual implementation.

Optimize for:

1. clarity;
2. content longevity;
3. maintainability;
4. accessibility;
5. performance;
6. fidelity to `DESIGN.md`;
7. original identity.

When uncertain between a decorative and a restrained implementation, choose the restrained implementation.

When uncertain between a generic component and a content-specific component, choose the content-specific component.

When uncertain between a client-side and server-side implementation, choose server-side unless the feature requires client interaction.

When uncertain whether a feature belongs in the MVP, leave it out and document it as an optional enhancement.

The final website must not look like a prebuilt UI kit.

It must look like a coherent personal product.
