import type { Retrospective } from '@/lib/content/schemas';

type RetrospectiveTimelineProps = {
  items: Retrospective[];
  showHighlights?: boolean;
};

export function RetrospectiveTimeline({
  items,
  showHighlights = false,
}: RetrospectiveTimelineProps) {
  return (
    <div className="timeline-list">
      {items.map((item) => (
        <article className="timeline-row" key={item.slug}>
          <span className="timeline-row__marker">{item.year}</span>
          <div>
            <div className="timeline-row__header">
              <h3 className="timeline-row__title">{item.title}</h3>
              {item.statusLabel ? (
                <span className="timeline-row__status">{item.statusLabel}</span>
              ) : null}
            </div>
            <p>{item.description}</p>
            {showHighlights && item.highlights.length > 0 ? (
              <span>{item.highlights.slice(0, 2).join(' · ')}</span>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
