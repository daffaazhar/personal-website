import Link from 'next/link';

type BreadcrumbsProps = {
  items: Array<{
    label: string;
    href?: string;
  }>;
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li className="breadcrumbs__item" key={`${item.label}-${index}`}>
              {item.href && !isCurrent ? (
                <Link className="breadcrumbs__link" href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isCurrent ? 'page' : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
