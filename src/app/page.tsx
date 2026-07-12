import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ArticleRow } from '@/components/content/article-row';
import { ExperienceTimeline } from '@/components/content/experience-timeline';
import { FeaturedProject } from '@/components/content/featured-project';
import { HeroStatement } from '@/components/content/hero-statement';
import { ImpactStatistics } from '@/components/content/impact-statistics';
import { ProjectSplit } from '@/components/content/project-split';
import { SectionHeader } from '@/components/content/section-header';
import { TestimonialQuote } from '@/components/content/testimonial-quote';
import { Reveal } from '@/components/motion/reveal';
import { StructuredData } from '@/components/seo/structured-data';
import { getRecentExperience } from '@/lib/content/experience';
import { getImpactMetrics } from '@/lib/content/impact-metrics';
import { getFeaturedProjects } from '@/lib/content/projects';
import { getTestimonials } from '@/lib/content/testimonials';
import { getArticles, getFeaturedArticles } from '@/lib/content/writing';
import { formatDisplayDate } from '@/lib/dates';
import {
  buildPageMetadata,
  buildPersonStructuredData,
  buildWebsiteStructuredData,
} from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: '/',
});

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  const [primaryProject, ...secondaryProjects] = featuredProjects;
  const articles = await selectHomepageArticles();
  const experience = getRecentExperience(3);
  const impactMetrics = getImpactMetrics();
  const testimonials = getTestimonials()
    .filter(
      (testimonial) => testimonial.permissionApproved && testimonial.contentStatus === 'published',
    )
    .slice(0, 3);

  return (
    <>
      <StructuredData data={buildPersonStructuredData()} />
      <StructuredData data={buildWebsiteStructuredData()} />
      <HeroStatement
        eyebrow="01 / Introduction"
        title={siteConfig.description}
        description={siteConfig.heroSupport}
        links={[
          { label: 'Selected work', href: '/work' },
          { label: 'Read the journal', href: '/writing' },
          { label: 'Résumé', href: siteConfig.links.resume, newTab: true },
        ]}
      />

      <section className="home-visual site-container" aria-labelledby="featured-visual-title">
        <h2 id="featured-visual-title" className="sr-only">
          Featured visual
        </h2>
        <figure className="home-visual__stage home-hero__entry">
          <Image
            className="home-visual__image"
            src="/interface-to-infrastructure.png"
            alt="Workflow application screens connected to a transactional outbox, message broker, and audit trail infrastructure."
            fill
            priority
            sizes="(min-width: 100rem) 100rem, 100vw"
          />
          <figcaption className="home-visual__meta">
            <span>Fig. 01</span>
            <span>From product interface to dependable infrastructure.</span>
          </figcaption>
        </figure>
      </section>

      <Reveal>
        <ImpactStatistics
          heading="Engineering, measured in real outcomes"
          metrics={impactMetrics}
        />
      </Reveal>

      {primaryProject ? (
        <Reveal>
          <section className="home-section site-container" aria-labelledby="selected-work-title">
            <SectionHeader
              index="03"
              title="Selected work"
              description="Projects documented through decisions, constraints, and outcomes."
              action={{ label: 'View all work', href: '/work' }}
            />
            <div className="home-section__body">
              <FeaturedProject project={primaryProject} />
              {secondaryProjects.slice(0, 2).map((project, index) => (
                <ProjectSplit index={`0${index + 2}`} key={project.slug} project={project} />
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}

      <Reveal delay="short">
        <section className="home-section site-container" aria-labelledby="knowledge-title">
          <div className="knowledge-tile">
            <span className="eyebrow">Mental model</span>
            <h2 id="knowledge-title">
              Complex systems become easier to reason about when the model is visible.
            </h2>
            <Link className="text-link" href="/writing">
              <span>Explore selected explanations</span>
              <span className="text-link__arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </section>
      </Reveal>

      {articles.length > 0 ? (
        <Reveal>
          <section className="home-section site-container" aria-labelledby="featured-writing-title">
            <SectionHeader
              index="04"
              title="Writing"
              description="Technical explanations, mental models, and reflections from building software."
              action={{ label: 'Read the journal', href: '/writing' }}
            />
            <div className="home-section__body">
              {articles.map((article) => (
                <ArticleRow
                  key={article.slug}
                  title={article.title}
                  description={article.description}
                  href={`/writing/${article.slug}`}
                  date={formatDisplayDate(article.publishedAt)}
                  dateTime={article.publishedAt}
                  topics={article.topics}
                  readingTime={article.readingTime}
                />
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}

      {experience.length > 0 ? (
        <Reveal>
          <section className="home-section site-container" aria-labelledby="experience-title">
            <SectionHeader
              index="05"
              title="Experience"
              description="Roles connected to the work they produced."
              action={{ label: 'View complete experience', href: '/about' }}
            />
            <ExperienceTimeline items={experience} />
          </section>
        </Reveal>
      ) : null}

      {testimonials.length > 0 ? (
        <Reveal>
          <section className="home-section site-container" aria-labelledby="testimonials-title">
            <SectionHeader
              index="06"
              title="Testimonials"
              description="Specific words from people I have built with."
            />
            <div className="testimonial-grid">
              {testimonials.map((testimonial) => (
                <TestimonialQuote
                  key={`${testimonial.person}-${testimonial.role}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}

      <Reveal>
        <section className="home-section site-container" aria-labelledby="personal-note-title">
          <div className="personal-note">
            <div className="personal-note__media">
              <Image
                src="/cycling.jpeg"
                alt="Cyclists riding together on the road"
                fill
                sizes="(min-width: 48rem) 42vw, 100vw"
              />
            </div>
            <div className="personal-note__content">
              <span className="eyebrow">07 / Outside the work</span>
              <h2 id="personal-note-title">{siteConfig.personalNote}</h2>
              <Link className="text-link" href="/about">
                <span>More about me</span>
                <span className="text-link__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}

async function selectHomepageArticles() {
  const featured = await getFeaturedArticles();
  const all = await getArticles();
  const selected = new Map<string, (typeof all)[number]>();

  [...featured, ...all].forEach((article) => {
    if (selected.size < 3) {
      selected.set(article.slug, article);
    }
  });

  return Array.from(selected.values());
}
