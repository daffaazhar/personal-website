import { siteConfig } from '@/lib/site-config';

export function StatusLine() {
  return (
    <div className="status-line" aria-label="Site status">
      <div className="site-container status-line__inner">
        <span className="status-line__item">{siteConfig.availability}</span>
        <span className="status-line__item">{siteConfig.location}</span>
        <span className="status-line__item">{siteConfig.updatedLabel}</span>
      </div>
    </div>
  );
}
