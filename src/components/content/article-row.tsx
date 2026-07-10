import Link from 'next/link';

type ArticleRowProps = {
  title: string;
  description?: string;
  href: string;
  date: string;
  dateTime: string;
  topics: string[];
  readingTime?: number;
};

export function ArticleRow({
  title,
  description,
  href,
  date,
  dateTime,
  topics,
  readingTime,
}: ArticleRowProps) {
  const meta = [readingTime ? `${readingTime} min` : null, ...topics.slice(0, 2)]
    .filter(Boolean)
    .join(' · ');

  return (
    <article className="article-row">
      <time dateTime={dateTime}>{date}</time>
      <div>
        <h3 className="article-row__title">
          <Link href={href}>{title}</Link>
        </h3>
        {description ? <p>{description}</p> : null}
        {meta ? <span>{meta}</span> : null}
      </div>
      <Link className="article-row__arrow" href={href} aria-label={`Read ${title}`}>
        <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
