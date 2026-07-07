import { notFound } from 'next/navigation';

import { PageIntro } from '@/components/content/page-intro';
import { SkeletonNote } from '@/components/content/skeleton-note';
import { getProjectBySlug, getProjectStaticParams } from '@/lib/content/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectStaticParams();
}

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageIntro
        eyebrow="Project / Case study"
        title={project.title}
        description={project.summary}
      />
      <SkeletonNote>
        TODO: Add project metadata, figures, contribution details, and results. Current content
        status: {project.contentStatus}.
      </SkeletonNote>
    </>
  );
}
