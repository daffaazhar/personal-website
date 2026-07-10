import { ImpactNetworkCanvas } from '@/components/motion/impact-network-canvas';
import type { ImpactMetric } from '@/lib/content/schemas';

type ImpactStatisticsProps = {
  heading: string;
  metrics: ImpactMetric[];
};

export function ImpactStatistics({ heading, metrics }: ImpactStatisticsProps) {
  return (
    <section className="impact-statistics" aria-labelledby="impact-statistics-title">
      <div className="site-container impact-statistics__inner">
        <div className="impact-statistics__heading">
          <span className="eyebrow">02 / Impact statistics</span>
          <h2 id="impact-statistics-title">{heading}</h2>
        </div>

        <div className="impact-statistics__metrics" role="list">
          {metrics.map((metric) => (
            <ImpactMetricItem key={metric.id} metric={metric} />
          ))}
        </div>

        <div className="impact-statistics__visual">
          <p id="impact-network-description" className="sr-only">
            An abstract system map representing interfaces, services, events, data processing, and
            reliability.
          </p>
          <ImpactNetworkCanvas describedBy="impact-network-description" />
        </div>
      </div>
    </section>
  );
}

function ImpactMetricItem({ metric }: { metric: ImpactMetric }) {
  return (
    <article
      className="impact-metric"
      role="listitem"
      aria-label={`${metric.value} ${metric.label}. ${metric.description}`}
    >
      <p className="impact-metric__value" aria-hidden="true">
        <span>{metric.value}</span>
        <span className="impact-metric__label">{metric.label}</span>
      </p>
      <p className="impact-metric__description">{metric.description}</p>
    </article>
  );
}
