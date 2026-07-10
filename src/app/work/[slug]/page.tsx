import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ContentFigure } from '@/components/content/content-figure';
import { MetadataList } from '@/components/content/metadata-list';
import { ProjectToc } from '@/components/content/project-toc';
import { Reveal } from '@/components/motion/reveal';
import {
  getAdjacentProjects,
  getProjectBySlug,
  getProjectStaticParams,
} from '@/lib/content/projects';
import { formatProjectPeriod } from '@/lib/dates';
import { siteConfig } from '@/lib/site-config';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getProjectStaticParams();
}

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projectEntry = await getProjectBySlug(slug);

  if (!projectEntry) {
    return {};
  }

  const project = projectEntry.metadata;
  const description = project.metadataDescription ?? project.summary;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} · ${siteConfig.name}`,
      description,
      url: `/work/${project.slug}`,
      siteName: siteConfig.name,
      type: 'article',
      ...(project.cover
        ? {
            images: [
              {
                url: project.cover.src,
                width: project.cover.width,
                height: project.cover.height,
                alt: project.cover.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} · ${siteConfig.name}`,
      description,
      ...(project.cover ? { images: [project.cover.src] } : {}),
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const projectEntry = await getProjectBySlug(slug);

  if (!projectEntry) {
    notFound();
  }

  const project = projectEntry.metadata;
  const { Content, toc } = projectEntry;
  const period = project.periodLabel ?? formatProjectPeriod(project.yearStart, project.yearEnd);
  const adjacentProjects = await getAdjacentProjects(project.slug);

  return (
    <article className="project-case">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createProjectStructuredData(project)) }}
      />
      <Reveal mode="load">
        <header className="project-case__hero site-container">
          <div className="project-case__hero-copy">
            <span className="eyebrow">Project / Case study</span>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
          {project.cover ? (
            <ContentFigure
              alt={project.cover.alt}
              background={project.cover.background}
              caption={project.coverCaption ?? `FIG 01 — ${project.cover.alt}`}
              height={project.cover.height}
              priority
              src={project.cover.src}
              variant="project"
              width={project.cover.width}
            />
          ) : null}
          <MetadataList
            columns={4}
            items={[
              { label: 'Role', value: project.role.join(' · ') },
              { label: 'Period', value: period },
              {
                label: 'Team',
                value: project.teamSize ? `${project.teamSize} people` : 'Team size pending',
              },
              { label: 'Platform', value: project.platform ?? project.location },
              { label: 'Disciplines', value: project.disciplines.join(' · ') },
              { label: 'Stack', value: project.stack.join(' · ') },
              { label: 'Outcome', value: project.outcomes[0] },
            ]}
          />
          <div className="project-case__inline-toc">
            <ProjectToc items={toc} variant="inline" />
          </div>
        </header>
      </Reveal>

      <div className="project-case__layout site-container">
        <div className="project-case__content">
          <Reveal>
            <div className="project-section project-section--mdx">
              <Content />
            </div>
          </Reveal>
          <Reveal>
            <ProjectPagination
              nextProject={adjacentProjects.next}
              previousProject={adjacentProjects.previous}
            />
          </Reveal>
        </div>
        <aside className="project-case__toc-rail" aria-label="Table of contents">
          <ProjectToc items={toc} variant="rail" />
        </aside>
      </div>
    </article>
  );
}

type AdjacentProject = Awaited<ReturnType<typeof getAdjacentProjects>>['previous'];

function ProjectPagination({
  previousProject,
  nextProject,
}: {
  previousProject: AdjacentProject;
  nextProject: AdjacentProject;
}) {
  if (!previousProject && !nextProject) {
    return null;
  }

  return (
    <nav className="project-pagination" aria-label="Case study navigation">
      {previousProject ? (
        <Link className="project-pagination__item" href={`/work/${previousProject.slug}`}>
          <span className="project-pagination__label">Previous</span>
          <span className="project-pagination__title">{previousProject.title}</span>
        </Link>
      ) : (
        <span className="project-pagination__item project-pagination__item--empty" />
      )}
      {nextProject ? (
        <Link className="project-pagination__item" href={`/work/${nextProject.slug}`}>
          <span className="project-pagination__label">Next</span>
          <span className="project-pagination__title">{nextProject.title}</span>
        </Link>
      ) : (
        <span className="project-pagination__item project-pagination__item--empty" />
      )}
    </nav>
  );
}

function createProjectStructuredData(
  project: NonNullable<Awaited<ReturnType<typeof getProjectBySlug>>>['metadata'],
) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/work/${project.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url,
    creator: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    datePublished: project.publishedAt,
    dateModified: project.updatedAt,
  };
}
