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

  return (
    <figure className={className} data-background={background}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imageClassName}
        sizes={
          sizes ??
          (variant === 'project'
            ? '(min-width: 80rem) 64rem, (min-width: 48rem) calc(100vw - 4rem), calc(100vw - 2rem)'
            : '(min-width: 80rem) 64rem, (min-width: 48rem) calc(100vw - 6rem), calc(100vw - 2rem)')
        }
        priority={priority}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
