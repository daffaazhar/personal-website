import Image from 'next/image';
import Link from 'next/link';

import { MetadataList } from '@/components/content/metadata-list';
import type { Project } from '@/lib/content/schemas';
import { formatProjectPeriod } from '@/lib/dates';
import { verifiedList, verifiedOrPending } from '@/lib/content/format';

type FeaturedProjectProps = {
  project: Project;
};

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const verifiedOutcomes = verifiedList(project.outcomes);
  const verifiedStack = verifiedList(project.stack);
  const period = project.periodLabel ?? formatProjectPeriod(project.yearStart, project.yearEnd);

  return (
    <article className="featured-project">
      <ProjectVisual
        title={project.title}
        cover={project.cover}
        label={project.cover ? project.cover.alt : 'TODO: Add final project image.'}
      />
      <div className="featured-project__body">
        <div>
          <span className="eyebrow">01 / {project.title}</span>
          <h3 className="featured-project__title">{project.summary}</h3>
          <Link className="text-link" href={`/work/${project.slug}`}>
            <span>View case study</span>
            <span className="text-link__arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
        <MetadataList
          columns={1}
          items={[
            {
              label: 'Role',
              value: verifiedOrPending(project.role[0], 'Role pending verification'),
            },
            {
              label: 'Period',
              value: period,
            },
            {
              label: 'Focus',
              value: project.disciplines.slice(0, 3).join(' · '),
            },
            {
              label: 'System',
              value:
                verifiedStack.length > 0
                  ? verifiedStack.slice(0, 3).join(' · ')
                  : 'Stack pending verification',
            },
            ...(verifiedOutcomes[0]
              ? [
                  {
                    label: 'Outcome',
                    value: verifiedOutcomes[0],
                  },
                ]
              : []),
          ]}
        />
      </div>
    </article>
  );
}

type ProjectVisualProps = {
  title: string;
  cover: Project['cover'];
  label: string;
};

export function ProjectVisual({ title, cover, label }: ProjectVisualProps) {
  if (cover) {
    return (
      <div className="project-visual" data-background={cover.background}>
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width ?? 1600}
          height={cover.height ?? 900}
          className="project-visual__image"
          sizes="(min-width: 80rem) 64rem, 100vw"
        />
      </div>
    );
  }

  return (
    <div className="project-visual" role="img" aria-label={label}>
      <div className="project-visual__grid" aria-hidden="true">
        <span>{title}</span>
        <span>Verified visual pending</span>
        <span>TODO: Add final project image</span>
      </div>
    </div>
  );
}
