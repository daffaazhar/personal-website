import type { Metadata } from 'next';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { AboutContactActions } from '@/components/content/about-contact-actions';
import { EditorialDefinitionList } from '@/components/content/editorial-definition-list';
import { ExperienceTimeline } from '@/components/content/experience-timeline';
import { RetrospectiveTimeline } from '@/components/content/retrospective-timeline';
import { Reveal } from '@/components/motion/reveal';
import { StructuredData } from '@/components/seo/structured-data';
import {
  aboutIntroduction,
  aboutNarrativeSections,
  capabilities,
  contactSection,
  selectedInterests,
} from '@/content/about';
import { getPublishedExperience } from '@/lib/content/experience';
import { getRetrospectives } from '@/lib/content/retrospectives';
import { buildAboutStructuredData, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description:
    'Software engineer working across web applications, backend systems, databases, and deployment infrastructure.',
  path: '/about',
  openGraphType: 'profile',
  image: aboutIntroduction.portrait,
  imageAlt: aboutIntroduction.portrait.alt,
});

export default function AboutPage() {
  const experience = getPublishedExperience();
  const retrospectives = getRetrospectives();

  return (
    <>
      <StructuredData data={buildAboutStructuredData()} />
      <Reveal mode="load">
        <section className="about-hero site-container" aria-labelledby="about-title">
          <div className="about-hero__copy">
            <span className="eyebrow">{aboutIntroduction.label}</span>
            <h1 id="about-title" className="about-hero__title">
              {aboutIntroduction.title}
            </h1>
            <div className="about-hero__body">
              {aboutIntroduction.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="about-hero__media">
            <div className="about-hero__portrait-frame">
              <Image
                src={aboutIntroduction.portrait.src}
                alt={aboutIntroduction.portrait.alt}
                width={aboutIntroduction.portrait.width}
                height={aboutIntroduction.portrait.height}
                className="about-hero__portrait"
                sizes="(min-width: 80rem) 27rem, (min-width: 48rem) 24rem, min(82vw, 22rem)"
                priority
              />
            </div>
          </div>
        </section>
      </Reveal>

      {aboutNarrativeSections.map((section, index) => (
        <Reveal delay={index === 0 ? 'short' : 'none'} key={section.id} mode="load">
          <AboutSection id={section.id} index={`0${index + 2}`} title={section.title}>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </AboutSection>
        </Reveal>
      ))}

      <Reveal>
        <AboutSection
          id="selected-interests"
          index="05"
          title={selectedInterests.title}
          introduction={selectedInterests.introduction}
        >
          <EditorialDefinitionList items={selectedInterests.items} />
        </AboutSection>
      </Reveal>

      <Reveal>
        <AboutSection
          id="growth-archive"
          index="06"
          title="Growth archive"
          introduction="A concise record of what changed in my work and thinking each year."
        >
          <RetrospectiveTimeline items={retrospectives} />
        </AboutSection>
      </Reveal>

      <Reveal delay="short" mode="load">
        <AboutSection
          id="experience"
          index="07"
          title="Experience"
          introduction="Roles that expanded my scope from front-end delivery to product systems, data, and deployment."
        >
          <ExperienceTimeline items={experience} showContributions />
        </AboutSection>
      </Reveal>

      <Reveal>
        <AboutSection
          id="capabilities"
          index="08"
          title={capabilities.title}
          introduction={capabilities.introduction}
        >
          <EditorialDefinitionList items={capabilities.items} />
        </AboutSection>
      </Reveal>

      <Reveal>
        <AboutSection id="contact" index="09" title={contactSection.title}>
          <p>{contactSection.body}</p>
          <AboutContactActions />
        </AboutSection>
      </Reveal>
    </>
  );
}

type AboutSectionProps = {
  id: string;
  index: string;
  title: string;
  introduction?: string;
  children: ReactNode;
};

function AboutSection({ id, index, title, introduction, children }: AboutSectionProps) {
  return (
    <section className="about-section site-container" aria-labelledby={`${id}-title`} id={id}>
      <div className="about-section__inner">
        <div className="about-section__heading">
          <span className="eyebrow about-section__eyebrow">{index}</span>
          <h2 id={`${id}-title`}>{title}</h2>
          {introduction ? <p className="about-section__introduction">{introduction}</p> : null}
        </div>
        <div className="about-section__content">{children}</div>
      </div>
    </section>
  );
}
