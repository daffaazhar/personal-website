import Link from 'next/link';

type HeroStatementProps = {
  eyebrow: string;
  title: string;
  description: string;
  links: {
    label: string;
    href: string;
    newTab?: boolean;
  }[];
};

export function HeroStatement({ eyebrow, title, description, links }: HeroStatementProps) {
  return (
    <section className="site-container home-hero" aria-labelledby="home-title">
      <span className="eyebrow home-hero__entry">{eyebrow}</span>
      <h1 id="home-title" className="home-hero__title home-hero__entry">
        {title}
      </h1>
      <p className="home-hero__description home-hero__entry">{description}</p>
      <div className="home-hero__links home-hero__entry" aria-label="Primary homepage links">
        {links.map((link) => (
          <Link
            className="text-link"
            key={link.href}
            href={link.href}
            target={link.newTab ? '_blank' : undefined}
            rel={link.newTab ? 'noreferrer' : undefined}
          >
            <span>{link.label}</span>
            <span className="text-link__arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
