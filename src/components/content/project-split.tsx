import Link from 'next/link';

import type { Project } from '@/lib/content/schemas';
import { formatProjectPeriod } from '@/lib/dates';

type ProjectSplitProps = {
  index: string;
  project: Project;
};

export function ProjectSplit({ index, project }: ProjectSplitProps) {
  const label = project.label ?? project.disciplines.slice(0, 2).join(' · ');

  return (
    <article className="project-split">
      <span className="project-split__index">{index}</span>
      <h3 className="project-split__title">{project.title}</h3>
      <span className="project-split__label">{label}</span>
      <span className="project-split__period">
        {formatProjectPeriod(project.yearStart, project.yearEnd)}
      </span>
      <Link className="text-link project-split__link" href={`/work/${project.slug}`}>
        <span>View</span>
        <span className="text-link__arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
    </article>
  );
}
