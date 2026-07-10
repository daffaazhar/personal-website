import Link from 'next/link';

type SectionHeaderProps = {
  index: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
};

export function SectionHeader({ index, title, description, action }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div>
        <span className="eyebrow">
          {index} / {title}
        </span>
        {description ? <p className="section-header__description">{description}</p> : null}
      </div>
      {action ? (
        <Link className="text-link section-header__action" href={action.href}>
          <span>{action.label}</span>
          <span className="text-link__arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      ) : null}
    </div>
  );
}
