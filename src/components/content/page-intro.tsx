import { Reveal } from '@/components/motion/reveal';

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <Reveal mode="load">
      <section className="site-container page-intro">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
      </section>
    </Reveal>
  );
}
