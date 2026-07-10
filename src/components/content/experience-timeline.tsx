import Image from 'next/image';
import Link from 'next/link';

import type { Experience } from '@/lib/content/schemas';
import { verifiedOrPending } from '@/lib/content/format';
import { formatExperiencePeriod } from '@/lib/dates';

type ExperienceTimelineProps = {
  items: Experience[];
  showContributions?: boolean;
};

export function ExperienceTimeline({ items, showContributions = false }: ExperienceTimelineProps) {
  return (
    <div className="experience-list">
      {items.map((item) => (
        <article className="experience-row" key={item.slug}>
          <time dateTime={item.end === null ? item.start : `${item.start}/${item.end}`}>
            {formatExperiencePeriod(item.start, item.end)}
          </time>
          <div>
            {item.companyLogo ? (
              <div className="experience-row__logo">
                <Image
                  src={item.companyLogo.src}
                  alt={item.companyLogo.alt}
                  width={item.companyLogo.width}
                  height={item.companyLogo.height}
                  className="experience-row__logo-image"
                />
              </div>
            ) : null}
            <h3 className="experience-row__title">
              {verifiedOrPending(item.role, 'Role pending verification')}
            </h3>
            <p className="experience-row__org">
              {verifiedOrPending(item.company, 'Organization pending verification')} ·{' '}
              {item.employmentType}
            </p>
            {item.engagementContext ? (
              <p className="experience-row__context">{item.engagementContext}</p>
            ) : null}
            <ul className="experience-row__description">
              <li>{verifiedOrPending(item.summary, 'Role summary pending verification.')}</li>
            </ul>
            {showContributions ? (
              <ul className="experience-row__outcomes">
                {item.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            ) : null}
            {item.relatedProjects.length > 0
              ? item.relatedProjects.map((project) => (
                  <Link className="text-link" href={`/work/${project}`} key={project}>
                    <span>Related project</span>
                    <span className="text-link__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                ))
              : null}
          </div>
        </article>
      ))}
    </div>
  );
}
