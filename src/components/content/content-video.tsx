import Link from 'next/link';

import { YouTubeEmbed } from '@/components/content/youtube-embed';

type ContentVideoProps = {
  title: string;
  url?: string | null;
  videoId: string;
};

export function ContentVideo({ title, url, videoId }: ContentVideoProps) {
  return (
    <div className="project-demo">
      <YouTubeEmbed title={title} videoId={videoId} />
      {url ? (
        <Link className="text-link" href={url} target="_blank" rel="noreferrer noopener">
          <span>Open the video on YouTube</span>
          <span className="text-link__arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      ) : null}
    </div>
  );
}
