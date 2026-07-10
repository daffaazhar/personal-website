# WRITING_STYLE.md — Personal Website Writing Guide

> Pedoman ini mengatur gaya penulisan untuk seluruh personal website.
> Gunakan bersama `DESIGN.md`, `CODEX_IMPLEMENTATION.md`, dan `AGENTS.md`.
>
> Tujuannya adalah memastikan homepage, portfolio, case study, experience,
> blog, notes, About, metadata, CTA, dan microcopy terdengar seperti satu orang
> yang sama: tenang, spesifik, kredibel, reflektif, dan mudah dipahami.

---

## 1. Tujuan penulisan

Website harus menjelaskan empat hal:

1. **What I build**
2. **How I think**
3. **What I contributed**
4. **What I learned**

Tulisan harus membantu pembaca memahami pekerjaan, bukan hanya melihat daftar teknologi atau pencapaian.

Website ini bukan CV yang dipindahkan ke browser. Website ini adalah arsip personal yang mendokumentasikan:

- selected work;
- keputusan teknis;
- pengalaman profesional;
- pengetahuan praktis;
- pembelajaran dari proyek;
- perkembangan dari waktu ke waktu;
- beberapa sisi personal yang relevan.

---

## 2. Bahasa utama

Bahasa utama website adalah **English**.

Gunakan international English yang:

- jelas;
- alami;
- tidak terlalu idiomatik;
- mudah dipahami pembaca non-native;
- tetap akurat secara teknis.

Gunakan Bahasa Indonesia hanya ketika:

- halaman memang memiliki versi Indonesia;
- topik bersifat lokal;
- nama resmi atau istilah lebih tepat dipertahankan;
- konteks mengharuskannya.

Jangan mencampur dua bahasa dalam satu kalimat, kecuali untuk nama resmi atau istilah teknis.

---

## 3. Core voice

Suara utama website harus:

- direct;
- calm;
- specific;
- technically credible;
- reflective;
- modest;
- evidence-based;
- human.

Suara website tidak boleh:

- terlalu promosi;
- berlebihan;
- korporat;
- samar;
- motivasional;
- dramatis;
- terdengar seperti teks generatif;
- dipenuhi buzzword.

Kesan yang diharapkan:

> This person understands the work, explains it clearly, and does not need to exaggerate.

---

## 4. Prinsip utama

### 4.1 State the point early

Sampaikan poin utama di awal.

Prefer:

> I improved the deployment workflow by replacing manual server updates with a GitLab CI/CD pipeline.

Avoid:

> As part of an effort to continuously enhance operational excellence, I was involved in a process aimed at improving deployment efficiency.

---

### 4.2 Be specific

Gunakan kata benda, teknologi, constraint, dan outcome yang konkret.

Prefer:

> The service stored audit events in the same database transaction as the business change, then published them asynchronously through NATS JetStream.

Avoid:

> The system used modern technologies to ensure reliability and scalability.

---

### 4.3 Stay calm

Gunakan bahasa percaya diri tanpa dramatisasi.

Prefer:

> This change reduced manual deployment steps and made releases more consistent.

Avoid:

> This groundbreaking solution completely transformed the deployment process.

---

### 4.4 Name the lesson

Tuliskan pembelajaran secara spesifik.

Prefer:

> The outage scenario showed that a successful API response was not enough. The event also needed to remain recoverable after the broker became unavailable.

Avoid:

> This project was challenging, but I learned a lot.

---

### 4.5 Use evidence

Klaim harus didukung oleh:

- verified metrics;
- observed behavior;
- implementation details;
- test results;
- documented feedback;
- project outcomes.

Jika angka belum terverifikasi, jangan dipublikasikan.

Gunakan internal placeholder:

```text
TODO: Verify the metric before publishing.
```

---

## 5. Audience

### Recruiters and hiring managers

Mereka perlu memahami:

- role;
- scope;
- contribution;
- outcome;
- communication ability.

### Engineers

Mereka mencari:

- technical context;
- decisions;
- trade-offs;
- implementation details;
- lessons.

### Potential clients and collaborators

Mereka perlu melihat:

- reliability;
- relevant experience;
- problem-solving approach;
- clear communication.

### Returning readers

Mereka membutuhkan:

- tulisan yang berguna;
- continuity;
- honest growth;
- searchable archive.

Tulis untuk pembaca cerdas yang belum tentu mengetahui konteks proyek.

---

## 6. Point of view

Gunakan first person singular untuk kontribusi pribadi.

Prefer:

> I designed the inter-service event flow and implemented the transactional outbox.

Gunakan first person plural untuk pekerjaan tim.

Prefer:

> We designed the product flow together. I was responsible for the backend architecture and audit-trail implementation.

Jangan mengambil seluruh hasil tim sebagai kontribusi pribadi.

Selalu bedakan:

- team responsibility;
- personal responsibility;
- shared outcome.

---

## 7. Tone per content type

| Content | Tone |
|---|---|
| Homepage | concise, confident, clear |
| Project case study | analytical, specific, evidence-based |
| Experience | professional, outcome-oriented |
| Technical article | explanatory, structured, practical |
| Short note | concise, operational, precise |
| About | personal, reflective, restrained |
| Retrospective | honest, reflective, contextual |
| Contact | direct, warm, low-friction |
| Error state | calm, useful, non-blaming |

---

## 8. Homepage

Homepage harus menjawab:

1. Who is this person?
2. What does this person build?
3. What work should I inspect first?
4. What does this person write about?
5. How can I learn more or make contact?

Homepage harus dikurasi, bukan memuat seluruh isi website.

### 8.1 Hero

Hero berisi:

- satu positioning statement;
- satu supporting paragraph;
- dua atau tiga tautan.

Recommended:

```text
Software engineer building dependable digital products
from interface to infrastructure.

I work across web applications, backend architecture,
deployment automation, and technical writing.
```

Avoid:

- “Crafting exceptional digital experiences”
- “Turning ideas into reality”
- “Passionate software engineer”
- “Building the future, one line at a time”
- “Creating seamless and innovative solutions”

Hero harus menjelaskan scope kerja nyata, bukan adjective tentang diri sendiri.

### 8.2 Supporting paragraph

Gunakan 20–45 kata.

Fokus pada:

- area pekerjaan;
- jenis masalah;
- current focus.

Jangan jadikan hero sebagai daftar teknologi.

### 8.3 Section introduction

Gunakan satu kalimat pendek.

Example:

```text
Selected work

Projects documented through decisions, constraints, and outcomes.
```

Example:

```text
Writing

Technical explanations and lessons from building production software.
```

---

## 9. Project case study

Case study harus menjelaskan:

1. Context
2. Problem
3. Role
4. Constraints
5. Decisions
6. Implementation
7. Outcome
8. Lessons

### 9.1 Title

Gunakan nama proyek sebenarnya.

Prefer:

```text
Work Fusion
```

Avoid:

```text
Revolutionizing Workflow Management with Work Fusion
```

### 9.2 Summary

Formula:

```text
What it is + who or what it helps + distinctive responsibility or outcome.
```

Example:

> A workflow platform designed to preserve traceable audit events across service failures and asynchronous processing.

### 9.3 Context

Jelaskan produk sebelum teknologi.

Prefer:

> Work Fusion digitizes approval-based workflows that previously relied on fragmented manual processes.

Avoid:

> The project uses Laravel, PostgreSQL, NATS JetStream, Redis, and REST APIs.

### 9.4 Problem

Jelaskan masalah engineering sebenarnya.

Good:

> A workflow could be committed successfully while its audit event failed to reach the broker. The system needed a recovery mechanism that preserved the event without duplicating it.

Weak:

> The challenge was to create a reliable system.

### 9.5 Role

Gunakan scope yang presisi.

Good:

> I designed the inter-service event flow, implemented the transactional outbox, and defined the audit-trail recovery tests.

Weak:

> I handled the backend.

### 9.6 Decision writing

Gunakan:

```text
Decision → reason → trade-off
```

Example:

> I used a transactional outbox so the business change and pending event could be stored atomically. This added background processing and retry logic, but prevented successful transactions from losing their audit event.

### 9.7 Outcome

Hanya tampilkan hasil terverifikasi.

Good:

> All pending events were delivered after the broker recovered in the tested outage scenario.

Good:

> The interface handled more than 3,000 records through incremental loading.

Avoid:

> Performance improved significantly.

Jika metrik tidak tersedia, gunakan hasil yang dapat diamati tanpa mengarang angka.

### 9.8 Lesson

Nama pembelajarannya harus jelas.

Good:

> The project changed how I evaluate reliability. A successful request is only one stage; recoverability and idempotent processing matter after the response has already returned.

Weak:

> I learned many new things.

---

## 10. Experience

Experience harus menyampaikan:

- role;
- organization;
- period;
- scope;
- contribution;
- outcome.

### 10.1 Summary

Gunakan satu paragraf pendek yang tidak mengulang bullet.

Example:

> Developing and maintaining business applications across modern web platforms and legacy desktop systems, with responsibilities spanning application development, database optimization, AI-assisted engineering workflows, and deployment infrastructure.

### 10.2 Bullet formula

Gunakan:

```text
Action + context + technical decision + outcome
```

Example:

> Standardized reusable modal, transition, and animation patterns across the booking application and added a re-authentication flow that prevents long-form booking data from being lost after session expiry.

Avoid:

> Responsible for front-end development.

### 10.3 Verbs

Prefer:

- built;
- developed;
- designed;
- implemented;
- improved;
- optimized;
- migrated;
- standardized;
- documented;
- maintained;
- investigated;
- integrated;
- automated;
- validated.

Use carefully:

- led;
- architected;
- transformed;
- pioneered;
- spearheaded.

Gunakan hanya jika scope-nya benar-benar sesuai.

### 10.4 Metrics

Metrik harus memiliki konteks.

Good:

> Reduced WAF-related support tickets by 30% by presenting clear error states for blocked requests.

Weak:

> Improved support tickets by 30%.

Jangan tampilkan `[XX]%` pada konten publik.

---

## 11. Technical articles

Artikel teknis memprioritaskan pemahaman.

Recommended structure:

1. Problem
2. Context
3. Assumptions
4. Mental model
5. Implementation
6. Failure cases
7. Verification
8. Trade-offs
9. Summary

### Opening

Nyatakan masalah di paragraf pertama.

Good:

> A Laravel queue worker that exits immediately may enter Supervisor’s BACKOFF state. The message tells you that the process failed repeatedly, but not why.

Avoid:

> In today’s fast-paced software-development landscape, reliable background processing is more important than ever.

### Explain before instructing

Jangan langsung memberi command tanpa konteks.

Sebelum code block, jelaskan:

- apa yang dilakukan;
- dijalankan di mana;
- expected result;
- risikonya.

Setelah code block, jelaskan cara memverifikasi.

### Assumptions

Gunakan metadata:

```text
Environment: Ubuntu 24.04, PHP 8.3, Supervisor 4
```

### Trade-offs

Tuliskan trade-off jika relevan.

Example:

> Caching configuration improves startup time, but environment changes will not take effect until the cache is rebuilt.

### Ending

Akhiri dengan prinsip penting.

Prefer:

> BACKOFF is a symptom. The process log identifies the actual failure.

Avoid:

> Hopefully this helps!

---

## 12. Short notes

Notes harus sempit, operasional, dan mudah ditemukan.

Recommended structure:

```text
Title
Last tested
Environment
Problem
Command or solution
Expected result
Caveat
Related content
```

Good title:

```text
Fixing Supervisor BACKOFF on Ubuntu
```

Avoid:

```text
A Quick Guide to Fixing One of the Most Common and Annoying Supervisor Errors
```

Tidak perlu introduction panjang jika judul sudah jelas.

---

## 13. About

About harus personal tetapi tidak oversharing.

Jelaskan:

- how I work;
- how I learned;
- what I value;
- current focus;
- selected interests.

### Opening

Prefer:

> I build web products and backend systems, then document the decisions and failures that shaped them.

Avoid:

> I am a passionate and highly motivated software engineer.

### Personal interests

Berikan konteks.

Good:

> Outside work, I spend time cycling and documenting technical lessons that would otherwise remain buried in project history.

Weak:

> My hobbies are cycling, reading, and travelling.

### Boundaries

Jangan publikasikan informasi yang:

- terlalu privat;
- tidak relevan;
- tidak aman;
- tidak nyaman untuk tetap terindeks dalam jangka panjang.

---

## 14. Retrospective

Retrospective bukan daftar achievement.

Bahas:

- what changed;
- what worked;
- what failed;
- what was difficult;
- what was learned;
- what changes next.

Recommended sections:

```text
The year in one sentence
Work
Learning
What did not work
Personal life
What changed in my thinking
What I am carrying forward
```

Good:

> I spent too much time solving deployment problems reactively. The repeated failures made it clear that I needed reusable environment checks and documented recovery steps.

Avoid:

> This year had many ups and downs, but I am grateful for everything.

---

## 15. Metadata

Metadata harus ringkas dan faktual.

Example:

```text
ROLE
Backend Engineer

PERIOD
2025–2026

TEAM
3 people

DISCIPLINES
Architecture · Backend · Reliability
```

Gunakan label pendek dan konsisten.

---

## 16. Statistics and impact claims

Sebelum menampilkan statistik, verifikasi:

1. What was measured?
2. What was the baseline?
3. What period does it cover?
4. Was the outcome directly attributable?
5. Can the claim be defended?

Good:

> 30% fewer support tickets related to WAF-blocked requests.

Weak:

> 30% better user experience.

Jangan tampilkan estimasi sebagai angka pasti.

Jika data diturunkan dari sumber lain, simpan `sourceNote` secara internal.

---

## 17. Calls to action

Gunakan CTA langsung:

- View case study
- Read article
- Browse all work
- View complete experience
- Read the retrospective
- Download résumé
- Send an email
- Open GitHub

Avoid:

- Discover more
- Explore the journey
- Unlock insights
- Begin the experience
- Let’s make magic

Gunakan panah secara konsisten:

```text
View case study ↗
```

---

## 18. Navigation labels

Use:

```text
Work
Writing
Notes
About
Index
```

Avoid:

```text
Creations
Thoughts
Journey
World
Explore
```

Clarity is more valuable than cleverness.

---

## 19. Headings

Heading harus:

- mendeskripsikan konten;
- singkat;
- natural;
- tidak mengandung filler.

Good:

```text
Building audit trails that survive service failure
```

Good:

```text
Why the worker entered BACKOFF
```

Avoid:

```text
Understanding the Complex Nature of Reliable Distributed System Communication
```

Gunakan sentence case untuk article headings.

---

## 20. Capitalization

Sentence case untuk:

- page title;
- article title;
- section title;
- button label;
- navigation.

Uppercase hanya untuk:

- metadata kecil;
- figure caption;
- status line pendek;
- compact technical labels.

Example:

```text
FIG 01
BACKEND ARCHITECTURE
```

Jangan menulis paragraf panjang dalam uppercase.

---

## 21. Dates

Recommended long format:

```text
January 2026 — Present
September 2025 — Present
August 2024 — October 2024
```

Compact metadata:

```text
JAN 2026—NOW
```

Jangan mencampur format tanggal dalam satu sistem.

---

## 22. Numbers

Gunakan numerals untuk:

- metrics;
- dates;
- technical values;
- quantities above nine;
- performance outcomes.

Examples:

```text
3,000+ records
30% fewer tickets
4 layers of idempotency
```

Hindari false precision.

Gunakan `approximately` jika memang estimasi.

---

## 23. Technical terminology

Gunakan istilah yang tepat ketika meningkatkan akurasi.

Example:

> A transactional outbox stores the pending event in the same database transaction as the business change.

Jelaskan istilah bila pembaca mungkin belum mengenalnya.

Avoid jargon chains:

> The asynchronous event-driven microservice ecosystem leveraged resilient distributed messaging.

Prefer:

> Services published events asynchronously through NATS JetStream, while the outbox preserved events during broker failure.

---

## 24. Official names

Gunakan penulisan resmi:

- Next.js
- TypeScript
- JavaScript
- Laravel
- PostgreSQL
- GitLab CI/CD
- NATS JetStream
- Docker
- Redux
- Material UI
- Swagger
- Core Web Vitals
- Web Application Firewall
- Delphi

Avoid:

- NextJS
- Next Js
- Typescript
- Javascript
- Gitlab

---

## 25. Acronyms

Tulis bentuk lengkap saat pertama kali digunakan jika tidak umum.

Example:

> Web Application Firewall (WAF)

Setelah itu gunakan `WAF`.

API, UI, SQL, dan CI/CD dapat langsung digunakan untuk technical audience.

---

## 26. Links

Gunakan descriptive link text.

Good:

```text
Read the Work Fusion case study
```

Avoid:

```text
Click here
```

---

## 27. Figure captions

Figure caption harus menjelaskan objek.

Recommended:

```text
FIG 01

WORK FUSION
Workflow and audit-trail infrastructure

BACKEND ARCHITECTURE · RELIABILITY · 2025–2026
```

Untuk diagram:

> FIG 04 — The outbox stores pending events before asynchronous publication.

---

## 28. Alt text

Good:

> Work Fusion dashboard showing pending workflows, task status, and audit events.

Weak:

> Screenshot of dashboard.

Diagram:

> Architecture diagram showing the client, API, services, NATS JetStream, audit trail, and notification flow.

Decorative images use empty alt text.

---

## 29. Error and empty states

Good:

> This article could not be found. Browse all writing instead.

Good:

> No notes match this topic yet.

Avoid:

> Oops! Something went wrong!

Error harus calm, useful, dan tidak menyalahkan pengguna.

---

## 30. Contact

Good:

> Have a useful problem to solve? Send me an email.

Good:

> I am open to selected engineering and collaboration opportunities.

Avoid:

> Let’s build something amazing together!

---

## 31. Microcopy

Gunakan kata kerja yang jelas:

```text
Open résumé
Copy email address
Filter by topic
Updated July 2026
Last tested July 2026
Pause animation
Resume animation
```

Icon-only controls wajib memiliki accessible label.

---

## 32. Length guidelines

| Element | Recommended length |
|---|---:|
| Hero heading | 7–16 words |
| Hero paragraph | 20–45 words |
| Homepage project summary | 20–45 words |
| Experience summary | 25–60 words |
| Experience bullet | 20–45 words |
| Article description | 15–35 words |
| Testimonial | 30–90 words |
| About paragraph | 50–120 words |

Guidelines ini tidak kaku. Clarity tetap menjadi prioritas.

---

## 33. Sentence and paragraph rhythm

Gunakan kombinasi:

- kalimat pendek;
- kalimat penjelas medium;
- occasional longer technical sentence.

Good:

> The API request succeeded. The broker was unavailable, so the event remained pending in the outbox. A background worker published it after the connection recovered.

Hindari beberapa kalimat panjang secara berurutan.

Satu paragraf sebaiknya memiliki satu ide utama.

---

## 34. Lists

Gunakan list untuk:

- steps;
- constraints;
- outcomes;
- requirements;
- comparisons.

Jangan mengubah semua paragraf menjadi bullet.

Case study harus tetap memiliki narrative flow.

---

## 35. Testimonials

Jangan mengubah makna testimonial.

Allowed:

- correct obvious spelling;
- remove repetition;
- shorten with permission;
- add role and relationship context.

Gunakan attribution yang telah disetujui.

Jangan menulis testimonial atas nama orang lain.

---

## 36. Source integrity

Bedakan:

- verified fact;
- measured result;
- personal interpretation;
- estimate;
- future intention.

Verified:

> The outage test delivered all 10 pending events after recovery.

Interpretation:

> This result increased my confidence in the recovery design.

Estimate:

> The system handled approximately 100,000 customer records.

Future intention:

> I plan to document the deployment architecture in a separate article.

---

## 37. Draft content

Draft content harus ditandai:

```yaml
draft: true
verified: false
```

Gunakan internal TODO:

```text
TODO: Verify metric.
TODO: Confirm date.
TODO: Request testimonial permission.
```

Draft tidak boleh muncul pada:

- production homepage;
- public listing;
- RSS;
- sitemap;
- static route generation.

---

## 38. AI-assisted writing

AI boleh membantu:

- grammar;
- structure;
- shortening;
- consistency;
- alternative phrasing;
- summaries;
- metadata.

AI tidak boleh mengarang:

- employers;
- metrics;
- dates;
- responsibilities;
- technologies;
- awards;
- testimonials;
- outcomes;
- personal stories.

Verifikasi seluruh fakta sebelum publish.

Avoid AI-sounding phrases:

- delve into;
- seamlessly;
- robust and scalable, without explanation;
- cutting-edge;
- in today’s digital landscape;
- game-changing;
- comprehensive solution;
- elevate;
- empower;
- unlock.

---

## 39. Preferred words

Prefer:

- built;
- improved;
- reduced;
- documented;
- tested;
- designed;
- implemented;
- maintained;
- investigated;
- migrated;
- standardized;
- measured;
- verified;
- recovered;
- published;
- processed;
- explained;
- learned.

---

## 40. Words requiring evidence

Use carefully:

- scalable;
- reliable;
- resilient;
- optimized;
- efficient;
- seamless;
- real-time;
- production-ready;
- high-performance;
- secure;
- robust.

Example:

Weak:

> A scalable architecture.

Better:

> The service separated write processing from audit-event publication so pending events could be retried independently.

---

## 41. Words to avoid

Avoid:

- passionate;
- ninja;
- guru;
- rockstar;
- wizard;
- disruptive;
- revolutionary;
- world-class;
- cutting-edge;
- magical;
- pixel-perfect;
- future-proof;
- best-in-class.

---

## 42. Before and after

### Hero

Before:

> Passionate full-stack developer crafting innovative digital experiences.

After:

> Software engineer building dependable digital products from interface to infrastructure.

### Experience

Before:

> Responsible for developing and maintaining the front end.

After:

> Developed reusable booking interfaces and introduced session-recovery behavior that preserved long-form form data after authentication expiry.

### Project

Before:

> Built a robust and scalable audit-trail system.

After:

> Stored audit events through a transactional outbox so committed workflow changes remained recoverable when the broker was unavailable.

### Article

Before:

> In this article, we will discuss how to fix Supervisor errors.

After:

> Supervisor enters BACKOFF when a process exits repeatedly before it reaches the configured running state.

### About

Before:

> I am passionate about technology and always eager to learn.

After:

> I document technical problems because writing exposes gaps in my understanding and turns one-time fixes into reusable knowledge.

---

## 43. Review checklist

### Accuracy

- [ ] Are dates correct?
- [ ] Are job titles correct?
- [ ] Are metrics verified?
- [ ] Are technologies accurate?
- [ ] Is personal contribution separated from team contribution?
- [ ] Are links valid?
- [ ] Are testimonials approved?

### Clarity

- [ ] Is the main point stated early?
- [ ] Can an outsider understand the context?
- [ ] Are technical terms explained where necessary?
- [ ] Are sentences unnecessarily long?
- [ ] Does each paragraph have one main idea?

### Tone

- [ ] Is the writing calm?
- [ ] Is it specific?
- [ ] Does it avoid exaggerated claims?
- [ ] Does it sound human?
- [ ] Does it avoid generic AI language?

### Structure

- [ ] Is the heading descriptive?
- [ ] Is metadata concise?
- [ ] Are lists used only where useful?
- [ ] Is the CTA direct?
- [ ] Is the length appropriate for the page?

### Accessibility

- [ ] Are links descriptive?
- [ ] Does the image have useful alt text?
- [ ] Are abbreviations understandable?
- [ ] Are error messages actionable?
- [ ] Does the content remain meaningful without visual context?

---

## 44. Instructions for Codex

When Codex creates or edits copy:

1. Read this document first.
2. Preserve verified facts.
3. Do not invent content.
4. Mark unknown content with explicit TODOs.
5. Follow the tone for the relevant content type.
6. Keep homepage writing concise.
7. Use deeper explanation in case studies.
8. Separate team and personal contribution.
9. Avoid generic portfolio language.
10. Run the review checklist before completion.

When wording conflicts with factual source data, factual source data wins.

When wording conflicts with `DESIGN.md`, preserve the intended hierarchy while keeping the copy clear.

---

## 45. Final principle

When choosing between two sentences, choose the one that:

1. says what happened;
2. explains why it mattered;
3. uses fewer inflated words;
4. can be defended;
5. sounds like a real person.

The website should not try to sound impressive.

It should make the work understandable enough that the reader becomes impressed.
