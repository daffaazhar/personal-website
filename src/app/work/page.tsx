import type { Metadata } from 'next';

import { FeaturedProject } from '@/components/content/featured-project';
import { PageIntro } from '@/components/content/page-intro';
import { ProjectRow } from '@/components/content/project-row';
import { Reveal } from '@/components/motion/reveal';
import { getFeaturedProjects, getProjects } from '@/lib/content/projects';
import { formatProjectPeriod } from '@/lib/dates';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Work',
  description:
    'Selected and archived projects documented through decisions, constraints, and outcomes.',
  path: '/work',
});

export default async function WorkPage() {
  const featuredProjects = await getFeaturedProjects();
  const [primaryProject, ...secondaryProjects] = featuredProjects;
  const archiveProjects = (await getProjects()).filter((project) => !project.featured);

  return (
    <>
      <PageIntro
        eyebrow="02 / Work"
        title="Selected and archived projects."
        description="Products, systems, and experiments documented through decisions, constraints, and outcomes."
      />
      <Reveal delay="short" mode="load">
        <section className="work-list site-container" aria-labelledby="selected-work-heading">
          <h2 id="selected-work-heading" className="sr-only">
            Selected work
          </h2>
          {primaryProject ? <FeaturedProject project={primaryProject} /> : null}
          <div className="work-list__rows" aria-label="Additional selected work">
            {secondaryProjects.map((project, index) => (
              <ProjectRow
                index={`0${index + 2}`}
                key={project.slug}
                title={project.title}
                label={project.label}
                summary={project.summary}
                role={project.role[0] ?? 'Role pending'}
                period={
                  project.periodLabel ?? formatProjectPeriod(project.yearStart, project.yearEnd)
                }
                href={`/work/${project.slug}`}
              />
            ))}
          </div>
        </section>
      </Reveal>
      {archiveProjects.length > 0 ? (
        <Reveal>
          <section className="work-list site-container" aria-labelledby="archived-work-heading">
            <h2 id="archived-work-heading" className="work-list__heading">
              Archived work
            </h2>
            <div className="work-list__rows">
              {archiveProjects.map((project, index) => (
                <ProjectRow
                  index={`${index + 1}`.padStart(2, '0')}
                  key={project.slug}
                  title={project.title}
                  label={project.label}
                  summary={project.summary}
                  role={project.role[0] ?? 'Role pending'}
                  period={
                    project.periodLabel ?? formatProjectPeriod(project.yearStart, project.yearEnd)
                  }
                  href={`/work/${project.slug}`}
                />
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}
    </>
  );
}
