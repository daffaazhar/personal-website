export type ContentStatus = 'draft' | 'published';
export type ProjectStatus = 'concept' | 'in-progress' | 'completed' | 'archived';
export type CoverBackground = 'white' | 'subtle' | 'inverse';
export type ArticleLanguage = 'en' | 'id';

export type ContentLink = {
  live: string | null;
  repository: string | null;
};

export type ContentCover = {
  src: string;
  alt: string;
  background: CoverBackground;
};

export type ContentSection = {
  title: string;
  body: string[];
};

export type Project = {
  title: string;
  slug: string;
  summary: string;
  yearStart: number;
  yearEnd: number | null;
  status: ProjectStatus;
  contentStatus: ContentStatus;
  featured: boolean;
  featuredOrder: number | null;
  role: string[];
  disciplines: string[];
  stack: string[];
  teamSize: number | null;
  company: string | null;
  location: string;
  links: ContentLink;
  outcomes: string[];
  cover: ContentCover | null;
  publishedAt: string;
  updatedAt: string;
  sections: ContentSection[];
  relatedWriting: string[];
};

export type Article = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  language: ArticleLanguage;
  readingTime: number;
  featured: boolean;
  contentStatus: ContentStatus;
  topics: string[];
  relatedProjects: string[];
  body: ContentSection[];
};

export type Note = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  lastTestedAt: string;
  contentStatus: ContentStatus;
  topics: string[];
  environment: string[];
  body: string[];
  expectedResult: string | null;
  caveat: string | null;
  references: string[];
  relatedArticle: string | null;
};

export type Retrospective = {
  title: string;
  slug: string;
  year: number;
  description: string;
  publishedAt: string;
  contentStatus: ContentStatus;
  topics: string[];
  highlights: string[];
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string | null;
  summary: string;
  contentStatus: ContentStatus;
  outcomes: string[];
  relatedProjects: string[];
};

export type Testimonial = {
  quote: string;
  person: string;
  role: string;
  company: string | null;
  permissionApproved: boolean;
  contentStatus: ContentStatus;
};

type ValidationIssue = {
  path: string;
  message: string;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const monthPattern = /^\d{4}-\d{2}$/;

function hasText(value: string) {
  return value.trim().length > 0;
}

function validateText(value: string, path: string, issues: ValidationIssue[]) {
  if (!hasText(value)) {
    issues.push({ path, message: 'Expected non-empty text.' });
  }
}

function validateTextArray(value: string[], path: string, issues: ValidationIssue[]) {
  if (value.length === 0) {
    issues.push({ path, message: 'Expected at least one item.' });
  }

  value.forEach((item, index) => validateText(item, `${path}.${index}`, issues));
}

function validateSlug(value: string, path: string, issues: ValidationIssue[]) {
  validateText(value, path, issues);

  if (!slugPattern.test(value)) {
    issues.push({ path, message: 'Expected a URL-safe kebab-case slug.' });
  }
}

function validateDate(value: string, path: string, issues: ValidationIssue[]) {
  if (!datePattern.test(value)) {
    issues.push({ path, message: 'Expected date in YYYY-MM-DD format.' });
  }
}

function validateMonth(value: string, path: string, issues: ValidationIssue[]) {
  if (!monthPattern.test(value)) {
    issues.push({ path, message: 'Expected month in YYYY-MM format.' });
  }
}

function validateCover(value: ContentCover | null, path: string, issues: ValidationIssue[]) {
  if (!value) {
    return;
  }

  validateText(value.src, `${path}.src`, issues);
  validateText(value.alt, `${path}.alt`, issues);

  if (!['white', 'subtle', 'inverse'].includes(value.background)) {
    issues.push({ path: `${path}.background`, message: 'Expected a supported cover background.' });
  }
}

function validateSections(value: ContentSection[], path: string, issues: ValidationIssue[]) {
  if (value.length === 0) {
    issues.push({ path, message: 'Expected at least one section.' });
  }

  value.forEach((section, index) => {
    validateText(section.title, `${path}.${index}.title`, issues);
    validateTextArray(section.body, `${path}.${index}.body`, issues);
  });
}

function throwIfInvalid(collection: string, issues: ValidationIssue[]) {
  if (issues.length === 0) {
    return;
  }

  const details = issues.map((issue) => `${issue.path}: ${issue.message}`).join('\n');
  throw new Error(`Invalid ${collection} content:\n${details}`);
}

export function validateProjects(projects: Project[]) {
  const issues: ValidationIssue[] = [];
  const slugs = new Set<string>();

  projects.forEach((project, index) => {
    const path = `projects.${index}`;
    validateText(project.title, `${path}.title`, issues);
    validateSlug(project.slug, `${path}.slug`, issues);
    validateText(project.summary, `${path}.summary`, issues);
    validateTextArray(project.role, `${path}.role`, issues);
    validateTextArray(project.disciplines, `${path}.disciplines`, issues);
    validateTextArray(project.stack, `${path}.stack`, issues);
    validateText(project.location, `${path}.location`, issues);
    validateTextArray(project.outcomes, `${path}.outcomes`, issues);
    validateCover(project.cover, `${path}.cover`, issues);
    validateDate(project.publishedAt, `${path}.publishedAt`, issues);
    validateDate(project.updatedAt, `${path}.updatedAt`, issues);
    validateSections(project.sections, `${path}.sections`, issues);

    if (project.yearEnd !== null && project.yearEnd < project.yearStart) {
      issues.push({ path: `${path}.yearEnd`, message: 'Expected yearEnd to be after yearStart.' });
    }

    if (project.teamSize !== null && project.teamSize < 1) {
      issues.push({ path: `${path}.teamSize`, message: 'Expected a positive team size.' });
    }

    if (project.featured && project.featuredOrder === null) {
      issues.push({ path: `${path}.featuredOrder`, message: 'Featured projects need an order.' });
    }

    if (slugs.has(project.slug)) {
      issues.push({ path: `${path}.slug`, message: 'Duplicate slug.' });
    }

    slugs.add(project.slug);
  });

  throwIfInvalid('projects', issues);
}

export function validateArticles(articles: Article[]) {
  const issues: ValidationIssue[] = [];
  const slugs = new Set<string>();

  articles.forEach((article, index) => {
    const path = `articles.${index}`;
    validateText(article.title, `${path}.title`, issues);
    validateSlug(article.slug, `${path}.slug`, issues);
    validateText(article.description, `${path}.description`, issues);
    validateDate(article.publishedAt, `${path}.publishedAt`, issues);
    validateDate(article.updatedAt, `${path}.updatedAt`, issues);
    validateTextArray(article.topics, `${path}.topics`, issues);
    validateSections(article.body, `${path}.body`, issues);

    if (article.readingTime < 1) {
      issues.push({
        path: `${path}.readingTime`,
        message: 'Expected reading time to be positive.',
      });
    }

    if (slugs.has(article.slug)) {
      issues.push({ path: `${path}.slug`, message: 'Duplicate slug.' });
    }

    slugs.add(article.slug);
  });

  throwIfInvalid('articles', issues);
}

export function validateNotes(notes: Note[]) {
  const issues: ValidationIssue[] = [];
  const slugs = new Set<string>();

  notes.forEach((note, index) => {
    const path = `notes.${index}`;
    validateText(note.title, `${path}.title`, issues);
    validateSlug(note.slug, `${path}.slug`, issues);
    validateText(note.description, `${path}.description`, issues);
    validateDate(note.publishedAt, `${path}.publishedAt`, issues);
    validateDate(note.updatedAt, `${path}.updatedAt`, issues);
    validateDate(note.lastTestedAt, `${path}.lastTestedAt`, issues);
    validateTextArray(note.topics, `${path}.topics`, issues);
    validateTextArray(note.environment, `${path}.environment`, issues);
    validateTextArray(note.body, `${path}.body`, issues);
    note.references.forEach((reference, referenceIndex) => {
      validateText(reference, `${path}.references.${referenceIndex}`, issues);
    });

    if (slugs.has(note.slug)) {
      issues.push({ path: `${path}.slug`, message: 'Duplicate slug.' });
    }

    slugs.add(note.slug);
  });

  throwIfInvalid('notes', issues);
}

export function validateRetrospectives(retrospectives: Retrospective[]) {
  const issues: ValidationIssue[] = [];
  const slugs = new Set<string>();

  retrospectives.forEach((retrospective, index) => {
    const path = `retrospectives.${index}`;
    validateText(retrospective.title, `${path}.title`, issues);
    validateSlug(retrospective.slug, `${path}.slug`, issues);
    validateText(retrospective.description, `${path}.description`, issues);
    validateDate(retrospective.publishedAt, `${path}.publishedAt`, issues);
    validateTextArray(retrospective.topics, `${path}.topics`, issues);
    validateTextArray(retrospective.highlights, `${path}.highlights`, issues);

    if (slugs.has(retrospective.slug)) {
      issues.push({ path: `${path}.slug`, message: 'Duplicate slug.' });
    }

    slugs.add(retrospective.slug);
  });

  throwIfInvalid('retrospectives', issues);
}

export function validateExperience(experience: Experience[]) {
  const issues: ValidationIssue[] = [];

  experience.forEach((item, index) => {
    const path = `experience.${index}`;
    validateText(item.company, `${path}.company`, issues);
    validateText(item.role, `${path}.role`, issues);
    validateText(item.location, `${path}.location`, issues);
    validateMonth(item.start, `${path}.start`, issues);
    validateText(item.summary, `${path}.summary`, issues);
    validateTextArray(item.outcomes, `${path}.outcomes`, issues);

    if (item.end !== null) {
      validateMonth(item.end, `${path}.end`, issues);
    }
  });

  throwIfInvalid('experience', issues);
}

export function validateTestimonials(testimonials: Testimonial[]) {
  const issues: ValidationIssue[] = [];

  testimonials.forEach((testimonial, index) => {
    const path = `testimonials.${index}`;
    validateText(testimonial.quote, `${path}.quote`, issues);
    validateText(testimonial.person, `${path}.person`, issues);
    validateText(testimonial.role, `${path}.role`, issues);
  });

  throwIfInvalid('testimonials', issues);
}
