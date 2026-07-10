import Link from 'next/link';

type ProjectRowProps = {
  index: string;
  title: string;
  label?: string;
  summary?: string;
  role: string;
  period: string;
  href: string;
};

export function ProjectRow({ index, title, label, summary, role, period, href }: ProjectRowProps) {
  return (
    <article className="project-row">
      <span className="project-row__index">{index}</span>
      <div>
        <h3 className="project-row__title">{title}</h3>
        {label ? <span className="project-row__label">{label}</span> : null}
        {summary ? <p>{summary}</p> : null}
      </div>
      <span>{role}</span>
      <span>{period}</span>
      <Link className="text-link" href={href}>
        <span>View</span>
        <span className="text-link__arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
    </article>
  );
}
