import type { ComponentType } from 'react';

export type ContentStatus = 'draft' | 'published';
export type ProjectStatus = 'concept' | 'in-progress' | 'completed' | 'archived';
export type CoverBackground = 'white' | 'subtle' | 'inverse';
export type ArticleLanguage = 'en' | 'id';
export type EmploymentType = 'Full-time' | 'Freelance' | 'Internship' | 'Full-time program';

export type ContentLink = {
  live: string | null;
  repository: string | null;
};

export type ContentImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  background?: CoverBackground;
};

export type BaseContentMetadata = {
  title: string;
  slug: string;
  contentStatus: ContentStatus;
  publishedAt: string;
  updatedAt: string;
};

export type ProjectMetadata = BaseContentMetadata & {
  label?: string;
  summary: string;
  yearStart: number;
  yearEnd: number | null;
  periodLabel?: string;
  status: ProjectStatus;
  featured: boolean;
  featuredOrder: number | null;
  role: string[];
  disciplines: string[];
  stack: string[];
  teamSize: number | null;
  company: string | null;
  location: string;
  platform?: string;
  links: ContentLink;
  outcomes: string[];
  cover: ContentImage | null;
  coverCaption?: string;
  metadataDescription?: string;
  relatedWriting: string[];
};

export type ArticleMetadata = BaseContentMetadata & {
  description: string;
  language: ArticleLanguage;
  readingTime: number;
  featured: boolean;
  topics: string[];
  relatedProjects: string[];
  cover?: ContentImage | null;
};

export type NoteMetadata = BaseContentMetadata & {
  description: string;
  lastTestedAt: string;
  topics: string[];
  environment: string[];
  expectedResult: string | null;
  caveat: string | null;
  references: string[];
  relatedArticle: string | null;
};

export type Experience = {
  slug: string;
  company: string;
  companyLogo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  role: string;
  employmentType: EmploymentType;
  start: string;
  end: string | null;
  engagementContext?: string;
  summary: string;
  contentStatus: ContentStatus;
  verified: boolean;
  outcomes: string[];
  relatedProjects: string[];
  sourceNotes?: string[];
};

export type Testimonial = {
  quote: string;
  person: string;
  role: string;
  company: string | null;
  permissionApproved: boolean;
  contentStatus: ContentStatus;
};

export type ImpactMetric = {
  id: string;
  value: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  sourceNote?: string;
  featured?: boolean;
};

export type TocItem = {
  id: string;
  title: string;
  depth: 2 | 3;
};

export type MdxModule = {
  default: ComponentType<{ components?: Record<string, unknown> }>;
  metadata: unknown;
};

export type LoadedContentEntry<TMetadata> = {
  Content: ComponentType<{ components?: Record<string, unknown> }>;
  metadata: TMetadata;
  sourcePath: string;
  toc: TocItem[];
};
