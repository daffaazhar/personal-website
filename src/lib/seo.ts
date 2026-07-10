import type { Metadata } from 'next';

import { aboutIntroduction } from '@/content/about';
import type {
  ArticleMetadata,
  ContentImage,
  NoteMetadata,
  ProjectMetadata,
} from '@/lib/content/types';
import { siteConfig } from '@/lib/site-config';
import { getSiteOrigin, getSiteUrl, getSiteUrlObject } from '@/lib/site-url';

type BreadcrumbItem = {
  label: string;
  path: string;
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  openGraphType?: 'article' | 'profile' | 'website';
  image?: ContentImage | null;
  imageAlt?: string;
};

export function getDefaultSocialImagePath() {
  return '/opengraph-image';
}

export function getSocialImageUrl(image?: ContentImage | null) {
  return image ? getSiteUrl(image.src) : getSiteUrl(getDefaultSocialImagePath());
}

export function getSocialImageAlt(image?: ContentImage | null, fallbackAlt?: string) {
  return image?.alt ?? fallbackAlt ?? `${siteConfig.name} website preview`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  openGraphType = 'website',
  image,
  imageAlt,
}: PageMetadataInput): Metadata {
  const absoluteTitle = title === siteConfig.name ? title : `${title} · ${siteConfig.name}`;
  const socialImageUrl = getSocialImageUrl(image);
  const socialImageAlt = getSocialImageAlt(image, imageAlt);

  return {
    title,
    description,
    alternates: {
      canonical: getSiteUrl(path),
    },
    openGraph: {
      title: absoluteTitle,
      description,
      url: getSiteUrl(path),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: openGraphType,
      images: [
        {
          url: socialImageUrl,
          ...(image
            ? {
                width: image.width,
                height: image.height,
              }
            : {
                width: 1200,
                height: 630,
              }),
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle,
      description,
      images: [socialImageUrl],
    },
  };
}

export function buildProjectMetadata(project: ProjectMetadata): Metadata {
  const metadata = buildPageMetadata({
    title: project.title,
    description: project.metadataDescription ?? project.summary,
    path: `/work/${project.slug}`,
    openGraphType: 'article',
    image: project.cover,
    imageAlt: project.cover?.alt ?? `Preview for ${project.title}`,
  });

  return {
    ...metadata,
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      title: metadata.openGraph?.title ?? `${project.title} · ${siteConfig.name}`,
      description:
        metadata.openGraph?.description ?? project.metadataDescription ?? project.summary,
      url: metadata.openGraph?.url ?? getSiteUrl(`/work/${project.slug}`),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'article',
      images: metadata.openGraph?.images,
      publishedTime: project.publishedAt,
      modifiedTime: project.updatedAt,
      authors: [siteConfig.author.name],
    },
  };
}

export function buildArticleMetadata(article: ArticleMetadata): Metadata {
  const metadata = buildPageMetadata({
    title: article.title,
    description: article.description,
    path: `/writing/${article.slug}`,
    openGraphType: 'article',
    image: article.cover ?? null,
    imageAlt: article.cover?.alt ?? `Preview for ${article.title}`,
  });

  return {
    ...metadata,
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      title: metadata.openGraph?.title ?? `${article.title} · ${siteConfig.name}`,
      description: metadata.openGraph?.description ?? article.description,
      url: metadata.openGraph?.url ?? getSiteUrl(`/writing/${article.slug}`),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'article',
      images: metadata.openGraph?.images,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [siteConfig.author.name],
    },
  };
}

export function buildNoteMetadata(note: NoteMetadata): Metadata {
  return {
    ...buildPageMetadata({
      title: note.title,
      description: note.description,
      path: `/notes/${note.slug}`,
      openGraphType: 'article',
      image: null,
      imageAlt: `Preview for ${note.title}`,
    }),
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      title: `${note.title} · ${siteConfig.name}`,
      description: note.description,
      url: getSiteUrl(`/notes/${note.slug}`),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'article',
      images: [
        {
          url: getSiteUrl(getDefaultSocialImagePath()),
          width: 1200,
          height: 630,
          alt: `Preview for ${note.title}`,
        },
      ],
      publishedTime: note.publishedAt,
      modifiedTime: note.updatedAt,
      authors: [siteConfig.author.name],
    },
  };
}

export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function buildBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: getSiteUrl(item.path),
    })),
  };
}

export function buildPersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: getSiteOrigin(),
    image: getSiteUrl(aboutIntroduction.portrait.src),
    jobTitle: 'Software Engineer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sidoarjo',
      addressCountry: 'ID',
    },
    sameAs: siteConfig.social.profiles,
  };
}

export function buildWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: getSiteOrigin(),
    inLanguage: siteConfig.locale.replace('_', '-'),
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  };
}

export function buildAboutStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `About ${siteConfig.author.name}`,
    url: getSiteUrl('/about'),
    mainEntity: buildPersonStructuredData(),
  };
}

export function buildProjectStructuredData(project: ProjectMetadata) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: getSiteUrl(`/work/${project.slug}`),
    creator: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    image: project.cover ? getSiteUrl(project.cover.src) : undefined,
    datePublished: project.publishedAt,
    dateModified: project.updatedAt,
  };
}

export function buildArticleStructuredData(article: ArticleMetadata) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.description,
    url: getSiteUrl(`/writing/${article.slug}`),
    image: article.cover ? getSiteUrl(article.cover.src) : getSiteUrl(getDefaultSocialImagePath()),
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: article.language,
  };
}

export function buildNoteStructuredData(note: NoteMetadata) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: note.title,
    description: note.description,
    url: getSiteUrl(`/notes/${note.slug}`),
    image: getSiteUrl(getDefaultSocialImagePath()),
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    datePublished: note.publishedAt,
    dateModified: note.updatedAt,
  };
}

export function getMetadataBase() {
  return getSiteUrlObject('/');
}
