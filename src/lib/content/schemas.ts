export type {
  ArticleLanguage,
  ArticleMetadata as Article,
  BaseContentMetadata,
  ContentImage,
  ContentLink,
  ContentStatus,
  EmploymentType,
  Experience,
  ImpactMetric,
  NoteMetadata as Note,
  ProjectMetadata as Project,
  ProjectStatus,
  Retrospective,
  Testimonial,
  TocItem,
} from '@/lib/content/types';

import type {
  EmploymentType,
  Experience,
  ImpactMetric,
  Retrospective,
  Testimonial,
} from '@/lib/content/types';

type ValidationIssue = {
  path: string;
  message: string;
};

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

function validateEmploymentType(value: EmploymentType, path: string, issues: ValidationIssue[]) {
  if (!['Full-time', 'Freelance', 'Internship', 'Full-time program'].includes(value)) {
    issues.push({ path, message: 'Unexpected employment type.' });
  }
}

function validateIssues(label: string, issues: ValidationIssue[]) {
  if (issues.length === 0) {
    return;
  }

  const message = issues.map((issue) => `- ${issue.path}: ${issue.message}`).join('\n');

  throw new Error(`${label} validation failed:\n${message}`);
}

export function validateImpactMetrics(metrics: ImpactMetric[]) {
  const issues: ValidationIssue[] = [];

  metrics.forEach((metric, index) => {
    const path = `impactMetrics.${index}`;
    validateText(metric.id, `${path}.id`, issues);
    validateText(metric.value, `${path}.value`, issues);
    validateText(metric.label, `${path}.label`, issues);
    validateText(metric.description, `${path}.description`, issues);

    if (metric.sourceNote) {
      validateText(metric.sourceNote, `${path}.sourceNote`, issues);
    }
  });

  validateIssues('Impact metrics', issues);
}

export function validateRetrospectives(retrospectives: Retrospective[]) {
  const issues: ValidationIssue[] = [];

  retrospectives.forEach((retrospective, index) => {
    const path = `retrospectives.${index}`;
    validateText(retrospective.title, `${path}.title`, issues);
    validateText(retrospective.slug, `${path}.slug`, issues);
    validateText(retrospective.description, `${path}.description`, issues);
    validateDate(retrospective.publishedAt, `${path}.publishedAt`, issues);
    validateText(retrospective.contentStatus, `${path}.contentStatus`, issues);
    validateTextArray(retrospective.topics, `${path}.topics`, issues);
    validateTextArray(retrospective.highlights, `${path}.highlights`, issues);

    if (retrospective.statusLabel) {
      validateText(retrospective.statusLabel, `${path}.statusLabel`, issues);
    }
  });

  validateIssues('Retrospectives', issues);
}

export function validateExperience(experience: Experience[]) {
  const issues: ValidationIssue[] = [];

  experience.forEach((item, index) => {
    const path = `experience.${index}`;
    validateText(item.slug, `${path}.slug`, issues);
    validateText(item.company, `${path}.company`, issues);
    validateText(item.role, `${path}.role`, issues);
    validateEmploymentType(item.employmentType, `${path}.employmentType`, issues);
    validateMonth(item.start, `${path}.start`, issues);
    validateText(item.summary, `${path}.summary`, issues);
    validateText(item.contentStatus, `${path}.contentStatus`, issues);
    validateTextArray(item.outcomes, `${path}.outcomes`, issues);

    if (item.end !== null) {
      validateMonth(item.end, `${path}.end`, issues);
    }

    if (item.companyLogo) {
      validateText(item.companyLogo.src, `${path}.companyLogo.src`, issues);
      validateText(item.companyLogo.alt, `${path}.companyLogo.alt`, issues);
    }

    if (item.engagementContext) {
      validateText(item.engagementContext, `${path}.engagementContext`, issues);
    }

    if (item.sourceNotes) {
      validateTextArray(item.sourceNotes, `${path}.sourceNotes`, issues);
    }
  });

  validateIssues('Experience', issues);
}

export function validateTestimonials(testimonials: Testimonial[]) {
  const issues: ValidationIssue[] = [];

  testimonials.forEach((testimonial, index) => {
    const path = `testimonials.${index}`;
    validateText(testimonial.quote, `${path}.quote`, issues);
    validateText(testimonial.person, `${path}.person`, issues);
    validateText(testimonial.role, `${path}.role`, issues);
    validateText(testimonial.contentStatus, `${path}.contentStatus`, issues);

    if (testimonial.company !== null) {
      validateText(testimonial.company, `${path}.company`, issues);
    }
  });

  validateIssues('Testimonials', issues);
}
