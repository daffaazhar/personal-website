export const aboutIntroduction = {
  label: 'About',
  title: 'I build software across interface, backend, and delivery.',
  paragraphs: [
    'I’m Daffa Azhar Putra Utama, a software engineer based in Sidoarjo, Indonesia. I work on web applications, backend systems, databases, and the deployment paths that keep them running.',
    'This website is where I document selected work, technical decisions, production failures, and the lessons that remain useful after a project ends.',
  ],
  portrait: {
    src: '/profile.jpeg',
    alt: 'Portrait of Daffa Azhar Putra Utama.',
    width: 400,
    height: 400,
  },
} as const;

export const aboutNarrativeSections = [
  {
    id: 'working-philosophy',
    title: 'Working philosophy',
    paragraphs: [
      'I prefer software that stays understandable after it leaves the developer’s laptop. That means clear boundaries, observable failure states, repeatable deployment, and documentation that remains close enough to the work to stay useful.',
      'I usually start with the problem and its constraints, then choose the smallest structure that can be tested and maintained. I value explicit trade-offs and evidence over confident but vague claims.',
    ],
  },
  {
    id: 'origin-story',
    title: 'Origin story',
    paragraphs: [
      'I started with front-end development because interfaces made the relationship between a product decision and its consequence easy to see. Work on business applications, public-sector systems, and small product teams gradually pulled me deeper into APIs, databases, deployment, and system reliability.',
      'The shift was practical. Front-end quality often depended on decisions made far beyond the browser. Learning those layers helped me solve the underlying problem instead of treating each symptom in isolation.',
    ],
  },
  {
    id: 'current-focus',
    title: 'Current focus',
    paragraphs: [
      'I currently develop and maintain business software at Xposure Indonesia, contribute to an event-booking platform with PT Kasir Pintar Internasional, and am completing my applied informatics degree at Politeknik Elektronika Negeri Surabaya.',
      'My current technical focus is dependable application delivery: distributed audit trails, transactional outbox patterns, database performance, CI/CD, containerized deployment, and AI-assisted engineering workflows that still preserve review, testing, and accountability.',
    ],
  },
] as const;

export const selectedInterests = {
  title: 'Selected interests',
  introduction: 'Subjects I continue to study through projects, writing, and repeated practice.',
  items: [
    {
      title: 'Distributed reliability',
      description: 'Recoverable event delivery, audit trails, idempotency, and failure testing.',
    },
    {
      title: 'Product engineering',
      description: 'Connecting user flows, technical constraints, and maintainable delivery.',
    },
    {
      title: 'Front-end systems',
      description: 'Reusable interface patterns, performance, and resilient interaction states.',
    },
    {
      title: 'Delivery infrastructure',
      description: 'CI/CD, containers, Linux operations, and repeatable environments.',
    },
    {
      title: 'Technical writing',
      description: 'Turning project history and production failures into reusable explanations.',
    },
    {
      title: 'Cycling',
      description:
        'Long rides as a slower counterbalance to software work and a practical way to measure progress over time.',
    },
  ],
} as const;

export const capabilities = {
  title: 'Capabilities',
  introduction:
    'A compact view of the work I can take from problem definition to implementation and operation.',
  items: [
    {
      title: 'Product engineering',
      description:
        'Turning user flows and constraints into scoped features, architecture, and delivery plans.',
    },
    {
      title: 'Front-end engineering',
      description:
        'React, Next.js, TypeScript, reusable interface patterns, state management, and performance work.',
    },
    {
      title: 'Backend and data',
      description:
        'Laravel, Node.js, Go, API design, SQL tuning, queues, and asynchronous processing.',
    },
    {
      title: 'Reliability and delivery',
      description:
        'CI/CD, Docker, Linux deployment, failure recovery, audit trails, and operational documentation.',
    },
    {
      title: 'Technical communication',
      description:
        'Architecture notes, case studies, code review, and practical explanations for engineering teams.',
    },
  ],
} as const;

export const contactSection = {
  title: 'Contact',
  body: 'Have a useful problem to solve? Send me an email. I am open to selected software engineering roles, product work, and technical collaborations.',
} as const;
