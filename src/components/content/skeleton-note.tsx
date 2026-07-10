import { Reveal } from '@/components/motion/reveal';

type SkeletonNoteProps = {
  children: React.ReactNode;
};

export function SkeletonNote({ children }: SkeletonNoteProps) {
  return (
    <Reveal delay="short" mode="load">
      <section className="site-container skeleton-section" aria-label="Implementation note">
        <p>{children}</p>
      </section>
    </Reveal>
  );
}
