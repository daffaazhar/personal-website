# DESIGN.md — Quietly Distinctive Personal Website

> Design specification for a personal website that combines the restrained,
> rational visual language associated with Polestar with the content depth of
> a mature personal knowledge hub: portfolio, long-form writing, short notes,
> experience, annual retrospectives, testimonials, and selected personal life.
>
> This is an interpretation, not a replica. Do not copy Polestar trademarks,
> logos, proprietary typefaces, photography, exact layouts, or another
> personal website's wording.

---

## 1. Product definition

### Purpose

The website must communicate four dimensions of one person:

1. **Capability** — selected work, contribution, decisions, and outcomes.
2. **Knowledge** — articles, mental models, tutorials, and short notes.
3. **Growth** — experience, annual retrospectives, and lessons learned.
4. **Personality** — a restrained selection of interests outside work.

The result should feel like a carefully engineered product catalogue and
editorial archive—not a SaaS landing page, art portfolio, dashboard, or
decorated online résumé.

### Primary audiences

- Recruiters and hiring managers
- Potential clients and collaborators
- Engineers and readers
- Returning visitors following the author's growth
- The author, as a long-term archive

### Primary user tasks

A visitor should be able to:

- understand the author's positioning within 10 seconds;
- find two or three strongest projects immediately;
- verify role, responsibility, and outcome;
- read technical writing comfortably;
- scan short notes quickly;
- understand professional and personal growth;
- find contact, résumé, GitHub, and LinkedIn links.

---

## 2. Design thesis

### Core statement

**Quietly distinctive: serious, rational, minimal, and precise without becoming
cold or anonymous.**

Attention should come from:

- proportion;
- typography;
- composition;
- image quality;
- content hierarchy;
- carefully chosen detail;
- confident omission.

Attention must not come from:

- gradients and glow effects;
- oversized rounded cards;
- decorative 3D objects;
- fake terminal interfaces;
- technology-logo marquees;
- continuous animation;
- visual noise.

### Design principles

#### Pure

Remove anything that does not improve comprehension, navigation, or character.

- Every section has a purpose.
- Every image provides evidence or context.
- Every label improves orientation.
- Avoid duplicate calls to action.
- Prefer spacing and rules over unnecessary card containers.

#### Progressive

Feel current through thoughtful behavior, not trends.

- Fluid type scaling
- Editorial relationships between content
- Subtle transitions
- Responsive layouts designed for each breakpoint
- Content models that can grow for years

#### Performance

Visual and technical performance are one quality.

- Fast first render
- Responsive images
- Minimal JavaScript
- Static-first articles
- Accessible interaction
- No decorative heavy animation

---

## 3. Information architecture

### Primary navigation

Use no more than five top-level links:

```text
Work
Writing
Notes
About
Index
```

Desktop:

```text
[NAME / MONOGRAM]                 Work  Writing  Notes  About  Index
```

Mobile:

```text
[NAME]                                                     Menu
```

Résumé, email, social links, newsletter, uses, guestbook, and other secondary
content belong in the footer or Index.

### Content types

#### Work

Curated projects documented as case studies:

- context;
- problem;
- role;
- team;
- constraints;
- decisions;
- implementation;
- challenges;
- results;
- lessons;
- credits;
- related writing.

#### Writing

Long-form content:

- technical explanations;
- mental models;
- tutorials;
- architecture articles;
- production lessons;
- career reflections;
- annual retrospectives.

#### Notes

Compact practical content:

- commands;
- configuration fixes;
- debugging notes;
- short patterns;
- workflow tips;
- code snippets;
- concise lessons.

#### About

A narrative profile containing:

- introduction;
- positioning;
- origin story;
- learning and writing philosophy;
- current focus;
- selected personal interests;
- annual growth archive;
- experience;
- contact.

#### Index

A complete, text-first archive:

- all work;
- all writing;
- all notes;
- retrospectives;
- talks;
- side projects;
- book notes;
- uses;
- experiments;
- RSS;
- optional guestbook.

### MVP

Launch with:

1. Home
2. Work listing
3. Project detail
4. Writing listing
5. Article detail
6. Notes listing
7. Note detail
8. About
9. Index
10. Résumé and contact links

Add later:

- guestbook;
- newsletter;
- uses;
- talks;
- book notes;
- statistics;
- mentorship;
- side quests.

Do not delay launch for likes, view counters, or social features.

---

## 4. Visual direction

The interface should feel:

- rational;
- calm;
- technical;
- premium but not luxurious;
- modern but not futuristic;
- personal but not informal;
- editorial but not artistic;
- minimal but not empty.

Use:

- rectangular planes;
- precise alignment;
- large visual stages;
- simple split layouts;
- thin horizontal rules;
- controlled large typography;
- small technical metadata;
- intentional whitespace.

Avoid:

- scrapbook textures;
- decorative blobs;
- arbitrary overlap;
- excessive diagonals;
- noisy bento grids;
- floating badges;
- ornamental grids;
- large rounded containers.

Choose one original brand anchor:

- numbered sections;
- a compact monogram;
- a small geometric mark;
- coordinate-style metadata;
- one accent line.

Do not create a star symbol resembling Polestar's mark.

---

## 5. Design tokens

### Color

Monochrome is the foundation. One accent color is allowed.

```css
:root {
  --canvas: #f4f4f1;
  --surface: #ffffff;
  --surface-subtle: #e9e9e5;

  --ink: #111111;
  --ink-muted: #62625e;
  --ink-faint: #8a8a84;

  --line: #cecec8;
  --line-strong: #9c9c95;

  --inverse-canvas: #101010;
  --inverse-ink: #f5f5f1;

  --accent: #f2e533;
  --accent-ink: #111111;

  --success: #246b3c;
  --warning: #8a5c00;
  --danger: #9d2c2c;
}
```

Accent may appear in:

- one featured editorial tile;
- active navigation;
- a small status marker;
- a highlighted data point;
- selection and focus support;
- one visual anchor per viewport.

Accent must not:

- dominate the screen;
- become every button background;
- appear as a gradient;
- compete with additional brand colors.

### Typography

Use **Instrument Sans** for headings, body, interface, labels, and navigation.

```css
font-family:
  "Instrument Sans",
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
```

Use **IBM Plex Mono** only for actual code and technical identifiers.

```css
font-family:
  "IBM Plex Mono",
  "SFMono-Regular",
  Consolas,
  monospace;
```

Weight strategy:

- default `400`;
- optional `500` for small controls;
- avoid `600–900`;
- create hierarchy with size, position, spacing, and contrast first.

Type scale:

```css
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
```

Reading widths:

- article body: `60–72ch`;
- project narrative: `58–68ch`;
- description: `30–48ch`;
- hero: approximately `8–14` words per line.

### Spacing

Use a 4px base and an 8px working rhythm.

```css
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
```

Section spacing:

- mobile: `64–96px`;
- tablet: `80–120px`;
- desktop: `112–160px`.

### Grid

```css
--container-max: 1600px;
--reading-max: 760px;
--gutter-mobile: 16px;
--gutter-tablet: 32px;
--gutter-desktop: 48px;
```

- Desktop: 12 columns, `16–24px` gap.
- Tablet: 8 columns, `16px` gap.
- Mobile: 4 columns, `12px` gap.
- Long-form text uses 6–7 desktop columns.
- Visual stages may be full width.

### Shape

```css
--radius-none: 0;
--radius-small: 2px;
--radius-pill: 999px;
```

Rules:

- default radius is `0`;
- `2px` is allowed for inputs and code blocks;
- pill is allowed only for tiny status/filter controls;
- no large rounded cards.

### Borders and shadows

```css
--border: 1px solid var(--line);
--border-strong: 1px solid var(--line-strong);
```

Prefer rules and tonal contrast over shadows. Only menus or modals may use:

```css
box-shadow: 0 12px 30px rgb(0 0 0 / 0.10);
```

---

## 6. Image direction

Images are evidence, not decoration.

Project imagery may include:

- product screenshots;
- architecture diagrams;
- system flows;
- before-and-after states;
- process photography;
- result dashboards;
- meaningful code or terminal excerpts;
- team or event documentation.

Personal imagery may include:

- travel;
- cycling or hobbies;
- talks;
- working environment;
- selected annual milestones.

Rules:

- prefer neutral backgrounds;
- use high-resolution clean crops;
- use a few large images instead of many thumbnails;
- avoid devices floating above gradients;
- avoid fake paper grain;
- caption meaningful images;
- never crop important diagram information.

Recommended ratios:

- hero: `16:9`, `3:2`, or `4:3`;
- project tile: `4:3`;
- portrait: `4:5`;
- diagram: natural ratio.

Stage types:

1. white stage;
2. soft-grey stage;
3. rare black high-contrast stage.

---

## 7. Motion

Motion should be calm, precise, short, and informative.

```css
--duration-fast: 120ms;
--duration-normal: 200ms;
--duration-slow: 360ms;

--ease-standard: cubic-bezier(0.25, 0.10, 0.25, 1);
--ease-enter: cubic-bezier(0.22, 1, 0.36, 1);
```

Allowed:

- underline or arrow movement;
- image scale up to `1.015`;
- simple menu fade/translation;
- short color transition;
- optional subtle page fade.

Avoid:

- springs and bounce;
- scroll-jacking;
- parallax as decoration;
- autoplay loops;
- content hidden until hover.

Respect `prefers-reduced-motion`.

---

## 8. Components

### Global header

Desktop:

- height `64–72px`;
- name left;
- navigation right;
- active item shown by line or contrast;
- no large CTA button.

Mobile:

- name left;
- “Menu” right;
- full-width menu panel;
- large text rows with separators;
- social and résumé links at bottom.

### Status line

Example:

```text
AVAILABLE FOR SELECTED PROJECTS      JAKARTA · UTC+7      UPDATED JUL 2026
```

- use small text;
- use one small accent marker;
- avoid glowing online-status pills.

### Hero

Example:

```text
01 / INTRODUCTION

Software engineer building
dependable digital products
from interface to infrastructure.

I work across application development, architecture,
automation, and technical writing.

Selected work ↗     Read the journal ↗     Résumé ↗
```

Rules:

- no typewriter effect;
- no rotating job titles;
- no floating tech icons;
- no tiny circular profile image;
- do not place the whole résumé above the fold.

### Section header

```text
02 / SELECTED WORK                              VIEW ALL WORK ↗
```

or:

```text
02 / SELECTED WORK
Projects documented through decisions, constraints, and outcomes.
```

### Featured project

Required information:

- project number;
- title;
- one-sentence purpose;
- role;
- period;
- selected capabilities;
- outcome;
- large visual;
- case-study link.

Example:

```text
01 / WORK FUSION                                     2025—2026

Reliable workflow infrastructure with
a verifiable audit trail.

ROLE          Backend Engineer
FOCUS         Architecture · Audit Trail · Reliability
SYSTEM        Laravel · PostgreSQL · NATS JetStream
OUTCOME       Complete recording across tested recovery scenarios

View case study ↗
```

Variants:

- full-width hero stage for the strongest project;
- text/visual split for secondary projects;
- bordered list row for additional work.

### Project row

```text
03   EVENT BOOKING PLATFORM   Front-end Development   2025—Now   View ↗
```

On mobile, stack number, title, metadata, and link.

### Article row

```text
17 DEC 2024   List Animation using Motion for React
              A focused guide to enter and exit animation patterns.
              6 min · React · Animation                         ↗
```

- title dominates;
- date and metadata are secondary;
- thumbnail is optional;
- view/like counts appear only when reliable.

### Featured editorial tile

Use once or twice per page, optionally with accent background.

```text
MENTAL MODEL

Complex systems become easier
when the model is visible.

Explore selected explanations ↗
```

### Notes index

```text
2026

04 JUL   Fixing Supervisor BACKOFF on Ubuntu       Laravel · Ops   ↗
02 JUL   Synchronizing migrations with an existing DB              ↗
01 JUL   Taking commits between Git repositories   Git             ↗
```

- group by year;
- provide topic filter;
- use accessible search;
- no image requirement;
- no masonry.

### Retrospective timeline

```text
2026   Final project · Production systems · Cycling
2025   Freelance development · CI/CD · New responsibilities
2024   ...
```

Retrospectives mix career and personal growth, but should not become
achievement scoreboards.

### Experience timeline

```text
SEP 2025—NOW

Freelance Front-End Developer
Company Name · Remote

Built...
Improved...
Standardized...
```

Use outcome-oriented bullets and connect roles to related case studies.

### Testimonial

- show no more than three on the homepage;
- do not auto-rotate;
- prefer specific statements;
- use permission-approved attribution;
- keep each quote approximately 30–90 words.

### Newsletter

Simple inline form, no modal or exit-intent popup.

```text
Occasional notes on software, systems, and lessons from building.

[ Email address                                  ] [ Subscribe ]
```

### Footer

Use an inverse dark surface or clearly separated light surface.

```text
LET'S BUILD SOMETHING USEFUL.

Email ↗
LinkedIn ↗
GitHub ↗
Résumé ↗

Work  Writing  Notes  About  Index
RSS   Uses     Guestbook

© 2026 NAME. Built with care in Indonesia.
```

---

## 9. Page specifications

### Homepage

Goal: a curated but complete introduction.

Order:

1. Header
2. Status line
3. Hero
4. Featured visual
5. Selected work
6. Knowledge proposition
7. Featured writing
8. Recent retrospectives
9. Experience preview
10. Testimonials
11. Personal note
12. Optional newsletter
13. Footer

Density:

- 2–3 featured projects;
- 3 articles;
- 3 recent retrospectives;
- 2 roles;
- up to 3 testimonials.

Do not reproduce every archive item on the homepage.

### Work listing

Header:

```text
WORK / SELECTED AND ARCHIVED PROJECTS

Products, systems, and experiments documented through
decisions, constraints, and outcomes.
```

Structure:

- one featured project;
- 3–5 curated projects in split or grid layouts;
- text rows for additional projects;
- filters only after at least 10 projects.

Sort by relevance and recency, not technology.

### Project detail

Header:

```text
PROJECT 01 / WORK FUSION

Reliable workflow and audit-trail infrastructure.

ROLE           Backend Engineer
PERIOD         2025—2026
TEAM           3 people
STATUS         Completed
DISCIPLINES    Architecture · Backend · Reliability
```

Order:

1. Summary
2. Hero visual
3. Metadata
4. Context
5. Problem
6. Role and contribution
7. Constraints
8. System/process overview
9. Key decisions
10. Implementation details
11. Challenges and resolutions
12. Results
13. Lessons
14. Team and credits
15. Related writing
16. Next project

Writing should be concrete.

Prefer:

> The service stored the event in the same database transaction as the
> business change, then published it asynchronously.

Avoid:

> We leveraged cutting-edge technology to deliver a robust solution.

### Writing listing

Header:

```text
WRITING

Technical explanations, mental models, and reflections
from building software.
```

Features:

- one featured article;
- topic filter;
- optional language filter;
- chronological rows;
- search when the archive is large;
- retrospective category;
- RSS.

Use text-based filters, not a multi-row cloud of rounded chips.

### Article detail

Header:

```text
17 DEC 2026
SYSTEMS · 9 MIN READ

Building Audit Trails That Survive Service Failure
```

Article structure:

- title and dek;
- publication metadata;
- updated date when relevant;
- optional cover;
- optional table of contents;
- body;
- figures and captions;
- code;
- references;
- related articles;
- newsletter.

Reading rules:

- body width `60–72ch`;
- desktop body size `17–19px`;
- line height `1.65–1.75`;
- generous heading spacing;
- wider code and diagrams when needed;
- horizontally scrollable tables on mobile.

### Notes

Listing is optimized for scanning.

Detail may contain:

- concise explanation;
- command or code;
- expected result;
- caveat;
- source;
- related article;
- last-tested date.

Example:

```text
LAST TESTED     JUL 2026
ENVIRONMENT     UBUNTU 24.04 · PHP 8.3
TOPIC           LARAVEL · SUPERVISOR
```

### About

Order:

1. Portrait or contextual image
2. Introduction
3. Working philosophy
4. Origin story
5. Current focus
6. Selected personal interests
7. Annual growth archive
8. Experience
9. Concise capabilities
10. Contact

Tone should be warm but precise.

Prefer:

> I began documenting technical problems because writing exposed gaps in my
> own understanding.

Avoid:

> I am passionate, hardworking, and always eager to learn.

### Index

A dense, fast, text-first archive grouped as:

```text
WORK
WRITING
NOTES
RETROSPECTIVES
TALKS
SIDE PROJECTS
BOOK NOTES
USES
PERSONAL
WEBSITE
```

---

## 10. Content schemas

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
links:
  live: null
  repository: null

outcomes:
  - "A concrete, defensible outcome."
  - "Another measurable result."

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

### Retrospective

```yaml
---
title: "The 2026 Retrospective"
slug: "2026-retrospective"
year: 2026
description: "Work, learning, cycling, and production lessons."
published_at: "2026-12-31"
topics:
  - "Retrospective"
highlights:
  - "A meaningful professional milestone"
  - "A meaningful personal milestone"
---
```

---

## 11. Copywriting

Voice:

- direct;
- specific;
- calm;
- reflective;
- technically credible;
- free from exaggerated claims.

Prefer headlines such as:

- “Building reliable systems from interface to infrastructure.”
- “Notes from shipping, breaking, and improving software.”
- “A workflow system designed for traceability.”
- “What production incidents taught me about deployment.”

Avoid:

- “Crafting exceptional digital experiences.”
- “Turning ideas into reality.”
- “Building the future one line at a time.”
- “Pixel-perfect innovative solutions.”
- “Code. Create. Inspire.”

Project-summary formula:

```text
[What it is] + [who/what it helps] + [distinctive responsibility/outcome].
```

Experience-bullet formula:

```text
Action + scope/context + decision + outcome.
```

---

## 12. Responsive behavior

Suggested breakpoints:

```css
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
--bp-2xl: 1536px;
```

Mobile rules:

- recompose layouts rather than shrinking desktop;
- stack split sections;
- minimum body size `16px`;
- minimum touch target `44 × 44px`;
- turn project tables into stacked rows;
- remove sticky sidebars;
- make code blocks scroll safely;
- keep navigation simple.

Large-screen rules:

- never stretch article lines;
- use extra space for composition;
- cap the content container;
- allow selected media to be full bleed;
- preserve whitespace.

---

## 13. Accessibility

Target WCAG 2.2 AA.

Required:

- semantic headings;
- one `h1` per page;
- keyboard-operable navigation and filters;
- visible focus;
- skip link;
- meaningful alt text;
- captions for diagrams;
- real form labels;
- accessible error messages;
- sufficient contrast;
- no color-only meaning;
- reduced-motion support;
- semantic landmarks;
- correct language attribute.

Focus style:

```css
:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
}
```

Yellow accent requires dark text; do not use small yellow text on white.

---

## 14. Performance

Targets:

- Lighthouse Performance 90+ on representative mobile tests;
- LCP below 2.5s at the 75th percentile;
- CLS below 0.1;
- INP below 200ms.

Rules:

- responsive AVIF/WebP images;
- declared image dimensions;
- lazy-load below-fold images;
- static-render writing;
- server components by default;
- client components only for actual interaction;
- self-host fonts when licensing allows;
- preload only critical font files;
- avoid heavy animation libraries;
- minimize third-party scripts;
- do not hydrate static article content unnecessarily.

Recommended stack:

- Next.js App Router or another static-first framework;
- MDX/content collections;
- CSS variables;
- Tailwind only when it follows this specification;
- static search index;
- privacy-conscious analytics.

---

## 15. SEO

Each page needs:

- unique title;
- unique description;
- canonical URL;
- Open Graph data;
- social image;
- sitemap entry;
- correct indexing rules.

Structured data:

- `Person` for Home/About;
- `Article` or `TechArticle` for writing;
- `CreativeWork` for case studies;
- `BreadcrumbList` for nested pages.

Social-image style:

```text
CATEGORY / DATE

Article or project title
Short descriptor

NAME · DOMAIN
```

Use canvas, ink, one accent detail, and a clear grid. No gradients.

---

## 16. Routes

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
├── /uses            optional
├── /guestbook       optional
├── /book-notes      optional
├── /talks           optional
└── /rss.xml
```

---

## 17. Component names

```text
SiteHeader
MobileNavigation
StatusLine
HeroStatement
SectionHeader
FeaturedProject
ProjectSplit
ProjectRow
ArticleRow
FeaturedEditorialTile
NotesIndex
NoteRow
RetrospectiveTimeline
ExperienceTimeline
TestimonialQuote
NewsletterForm
SiteFooter
MetadataList
Figure
FigureCaption
CodeBlock
ArticleToc
RelatedContent
ArchiveFilter
SearchInput
ExternalLink
```

Avoid vague names such as:

```text
CoolCard
FancyBox
MagicSection
BentoItem
GlowButton
```

---

## 18. CSS foundation

```css
@layer base {
  :root {
    color-scheme: light;

    --canvas: #f4f4f1;
    --surface: #ffffff;
    --surface-subtle: #e9e9e5;
    --ink: #111111;
    --ink-muted: #62625e;
    --line: #cecec8;
    --accent: #f2e533;

    --container: 100rem;
    --reading: 47.5rem;
    --gutter: clamp(1rem, 3vw, 3rem);
    --section-space: clamp(4rem, 9vw, 10rem);

    --font-sans: "Instrument Sans", "Helvetica Neue", Arial, sans-serif;
    --font-mono: "IBM Plex Mono", monospace;
    --ease-standard: cubic-bezier(0.25, 0.10, 0.25, 1);
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background: var(--canvas);
    color: var(--ink);
    font-family: var(--font-sans);
    font-weight: 400;
    line-height: 1.55;
    text-rendering: optimizeLegibility;
  }

  ::selection {
    background: var(--accent);
    color: var(--ink);
  }

  a {
    color: inherit;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.18em;
  }

  img {
    display: block;
    max-width: 100%;
  }

  :focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 3px;
  }
}

.container {
  width: min(100%, var(--container));
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.section {
  padding-block: var(--section-space);
}

.rule {
  border-top: 1px solid var(--line);
}

.reading-column {
  width: min(100%, var(--reading));
}
```

---

## 19. Do and do not

### Do

- Give strong projects large visual space.
- Use metadata as part of composition.
- Make dates and responsibilities easy to find.
- Use lines, spacing, and alignment instead of boxes.
- Place personal reflections beside technical writing.
- Curate the homepage.
- Keep a complete Index.
- State outcomes honestly.
- Use one accent color sparingly.
- Use captions.
- Treat the footer as a real closing section.

### Do not

- Copy Polestar branding, logo, photos, or proprietary assets.
- Reproduce another personal website's copy.
- Build every section as a rounded card.
- Use a bento grid as the main layout system.
- Fill the hero with floating technology icons.
- Add decorative terminal windows.
- Use skill percentages.
- Use generic claims without evidence.
- Add likes or views before reliable data exists.
- Auto-rotate testimonials.
- Hide essential information behind hover.
- Use multiple animation styles.
- Use multiple accent colors on one page.
- Make the blog resemble a documentation dashboard.

---

## 20. Acceptance checklist

### Identity

- [ ] Positioning is clear within 10 seconds.
- [ ] The site is original and does not copy Polestar branding.
- [ ] One accent color is used.
- [ ] Character comes from proportion and detail, not effects.

### Content

- [ ] At least two projects are fully documented.
- [ ] Personal contribution is separated from team contribution.
- [ ] Outcomes are concrete and defensible.
- [ ] Writing and Notes serve different purposes.
- [ ] About contains professional context and selected personal growth.
- [ ] Homepage is curated.
- [ ] Index is complete.

### Visual

- [ ] Alignment is consistent.
- [ ] Text stays within reading width.
- [ ] Images are purposeful.
- [ ] Metadata is legible.
- [ ] Cards are not overused.
- [ ] Border radius is minimal.
- [ ] Motion is restrained.
- [ ] Mobile layout is intentionally recomposed.

### Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus is visible.
- [ ] Contrast passes AA.
- [ ] Alt text is reviewed.
- [ ] Reduced motion works.
- [ ] Heading hierarchy is valid.

### Performance

- [ ] Images are optimized.
- [ ] Fonts do not create severe layout shift.
- [ ] Static content is server-rendered.
- [ ] Third-party scripts are minimized.
- [ ] Core Web Vitals are tested on mobile.

### SEO

- [ ] Metadata is unique.
- [ ] Social previews work.
- [ ] Sitemap and RSS work.
- [ ] Structured data validates.
- [ ] Canonical URLs are correct.

---

## 21. Research references

Visual-system references:

- `https://www.polestar.com/`
- `https://www.polestar.com/global/news/journal-1/`
- `https://www.polestar.com/us/news/journal-16-1/`
- `https://www.polestar.com/global/news/journal-10/`
- `https://www.polestar.com/uk/news/journal-12-2/`

Content-system references:

- `https://theodorusclarence.com/`
- `https://theodorusclarence.com/projects`
- `https://theodorusclarence.com/blog`
- `https://theodorusclarence.com/shorts`
- `https://theodorusclarence.com/about`

These links are research references only. The final website must use original
copy, imagery, identity, and implementation.

---

## 22. Final directive

When choosing between two options, choose the one that:

1. makes content easier to understand;
2. removes more visual noise;
3. gives the strongest work more room;
4. communicates evidence rather than claims;
5. remains useful five years from now.

The intended result is not a “Polestar-themed developer portfolio.”

The intended result is:

> **A calm, modern personal archive in which projects, knowledge, and growth
> are presented with the precision of a well-designed product.**
