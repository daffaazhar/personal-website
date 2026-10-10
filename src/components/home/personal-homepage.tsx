import Image from 'next/image';
import Link from 'next/link';

import { aboutIntroduction } from '@/content/about';
import { getPublishedExperience } from '@/lib/content/experience';
import { getFeaturedProjects } from '@/lib/content/projects';
import { getArticles } from '@/lib/content/writing';
import { formatDisplayDate, formatExperiencePeriod, formatProjectPeriod } from '@/lib/dates';
import { siteConfig } from '@/lib/site-config';

import { GreetingWave, PersonalAvatar } from './personal-avatar';
import { PersonalIntro } from './personal-intro';
import { SelectedWork } from './selected-work';
import styles from './personal-homepage.module.css';

export async function PersonalHomepage() {
  const [featuredProjects, publishedArticles] = await Promise.all([
    getFeaturedProjects(),
    getArticles(),
  ]);
  const projects = featuredProjects.slice(0, 3);
  const articles = publishedArticles.slice(0, 3);
  const experience = getPublishedExperience();

  return (
    <PersonalIntro>
      <div className={styles.viewportBlur} data-home-viewport-blur aria-hidden="true" />
      <section className={styles.hero} aria-labelledby="prototype-title">
        <div className={styles.identity}>
          <div className={styles.portrait} data-prototype-portrait>
            <PersonalAvatar />
          </div>
          <div>
            <p className={styles.greeting} data-prototype-greeting>
              Oh, hello. I’m Daffa.
              <GreetingWave className={styles.wave} />
            </p>
            <p className={styles.location} data-prototype-entry>
              {siteConfig.location}
            </p>
          </div>
        </div>
        <h1 id="prototype-title" data-prototype-entry>
          Software, from the interface to the infrastructure.
        </h1>
        <p className={styles.support} data-prototype-entry>
          {siteConfig.heroSupport}
        </p>
        <div className={styles.links} data-prototype-entry>
          <a href="#prototype-work">
            Take a look at my work <span aria-hidden="true">↓</span>
          </a>
          <a href="#prototype-about">
            A little about me <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <SelectedWork>
        {projects.map((project, index) => (
          <article className={styles.project} key={project.slug}>
            {project.cover ? (
              <Link
                className={styles.projectImage}
                data-work-image
                href={`/work/${project.slug}`}
                aria-label={`View ${project.title} case study`}
              >
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={project.cover.width}
                  height={project.cover.height}
                  sizes="(min-width: 58rem) 432px, (min-width: 40rem) 46vw, 100vw"
                />
              </Link>
            ) : null}
            <div className={styles.projectCopy} data-work-copy>
              <p className={styles.projectMeta}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{formatProjectPeriod(project.yearStart, project.yearEnd)}</span>
              </p>
              <h3>
                <Link href={`/work/${project.slug}`}>{project.title}</Link>
              </h3>
              <p className={styles.summary}>{project.summary}</p>
              <p className={styles.role}>{project.role.join(' · ')}</p>
              <Link className={styles.caseStudy} href={`/work/${project.slug}`}>
                Read the case study <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </SelectedWork>

      {experience.length ? (
        <section
          className={styles.continuation}
          aria-labelledby="prototype-experience-title"
          data-home-section
        >
          <div className={styles.sectionHeading}>
            <h2 id="prototype-experience-title">Experience</h2>
            <Link href="/about#experience">
              Detailed outcomes <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <ol className={styles.experienceList}>
            {experience.map((item) => (
              <li className={styles.experienceRow} key={item.slug} data-home-experience>
                <p className={styles.experiencePeriod}>
                  {formatExperiencePeriod(item.start, item.end)}
                </p>
                <div>
                  <div className={styles.experienceIdentity}>
                    {item.companyLogo ? (
                      <Image
                        className={styles.experienceLogo}
                        src={item.companyLogo.src}
                        alt={item.companyLogo.alt}
                        width={item.companyLogo.width}
                        height={item.companyLogo.height}
                        sizes="112px"
                      />
                    ) : null}
                    <div>
                      <h3>{item.company}</h3>
                      <p className={styles.experienceRole}>
                        {item.role} · {item.employmentType}
                      </p>
                      {item.engagementContext ? (
                        <p className={styles.experienceRole}>{item.engagementContext}</p>
                      ) : null}
                    </div>
                  </div>
                  <p className={styles.summary}>{item.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section
        className={styles.continuation}
        aria-labelledby="prototype-writing-title"
        data-home-section
      >
        <div className={styles.sectionHeading}>
          <h2 id="prototype-writing-title">Writing</h2>
          <div className={styles.links}>
            <Link href="/writing">
              All writing <span aria-hidden="true">↗</span>
            </Link>
            <Link href={siteConfig.links.rss}>
              RSS <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <p className={styles.sectionIntro}>
          Technical decisions, things that broke, and lessons worth keeping.
        </p>
        {articles.length ? (
          <ul className={styles.editorialList}>
            {articles.map((article) => (
              <li key={article.slug}>
                <Link className={styles.editorialRow} href={`/writing/${article.slug}`}>
                  <time dateTime={article.publishedAt}>
                    {formatDisplayDate(article.publishedAt)}
                  </time>
                  <div className={styles.editorialCopy}>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <span className={styles.editorialMeta}>
                      {article.readingTime} min read · {article.topics.join(' · ')}
                    </span>
                  </div>
                  <span className={styles.rowArrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyState}>No published writing yet.</p>
        )}
      </section>

      <section
        id="prototype-about"
        className={styles.continuation}
        aria-labelledby="prototype-about-title"
        data-home-section
      >
        <div className={styles.sectionHeading}>
          <h2 id="prototype-about-title">A little about me</h2>
          <Link href="/about">
            More about me <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.aboutCopy}>
          {aboutIntroduction.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>{siteConfig.personalNote}</p>
        </div>
      </section>

      <section
        className={styles.contact}
        aria-labelledby="prototype-contact-title"
        data-home-section
      >
        <p className={styles.contactLabel}>Contact</p>
        <h2 id="prototype-contact-title">Say hello.</h2>
        <p className={styles.contactCopy}>
          Have a question about the work, something to share, or just want to say hi? Drop me a
          line.
        </p>
        <a className={styles.contactEmail} href={`mailto:${siteConfig.email}`}>
          {siteConfig.email} <span aria-hidden="true">↗</span>
        </a>
        <div className={styles.links}>
          <a href={siteConfig.links.github}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a href={siteConfig.links.linkedin}>
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <Link href={siteConfig.links.resume}>
            Résumé <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/index">
            Index <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <div className={styles.nameClip} data-home-name aria-hidden="true">
        <span className={styles.name}>
          {Array.from('Daffa.').map((letter, index) => (
            <span className={styles.nameLetter} data-home-letter key={index}>
              {letter}
            </span>
          ))}
        </span>
      </div>
    </PersonalIntro>
  );
}
