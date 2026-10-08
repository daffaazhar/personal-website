import Image from 'next/image';

import type { CoverBackground } from '@/lib/content/types';

type ContentFigureProps = {
  alt: string;
  background?: CoverBackground;
  caption?: string;
  height: number;
  priority?: boolean;
  sizes?: string;
  src: string;
  variant?: 'article' | 'project';
  width: number;
};

export function ContentFigure({
  alt,
  background = 'white',
  caption,
  height,
  priority = false,
  sizes,
  src,
  variant = 'article',
  width,
}: ContentFigureProps) {
  const className = variant === 'project' ? 'project-figure' : 'article-figure';
  const imageClassName = variant === 'project' ? 'project-figure__image' : 'article-figure__image';

  // sizes cannot resolve CSS variables. Mirror the 58rem canvas and doubled
  // clamp(1.25rem, 3vw, 2rem) gutter; the desktop TOC uses 12rem + a 2rem gap.
  // Lazy figures use their actual slot, including narrower prose and figure grids.
  const canvasSizes = 'calc(min(100vw, 58rem) - clamp(2.5rem, 6vw, 4rem))';
  const fallbackSizes =
    variant === 'project'
      ? canvasSizes
      : `(min-width: 64rem) min(72ch, calc(min(100vw, 58rem) - clamp(2.5rem, 6vw, 4rem) - 14rem)), min(72ch, ${canvasSizes})`;

  return (
    <figure className={className} data-background={background}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imageClassName}
        sizes={sizes ?? `${priority ? '' : 'auto, '}${fallbackSizes}`}
        priority={priority}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
