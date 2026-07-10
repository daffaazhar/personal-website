import { impactMetrics } from '@/content/impact-metrics';
import { type ImpactMetric, validateImpactMetrics } from '@/lib/content/schemas';

validateImpactMetrics(impactMetrics);

export function getImpactMetrics(): ImpactMetric[] {
  return [...impactMetrics];
}
