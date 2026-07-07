import { PageIntro } from '@/components/content/page-intro';
import { SkeletonNote } from '@/components/content/skeleton-note';

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="05 / About"
        title="A calm profile for work, learning, and selected life context."
        description="TODO: Replace with verified biography, current focus, experience, and selected interests."
      />
      <SkeletonNote>
        TODO: Add portrait or contextual image only when final assets are available.
      </SkeletonNote>
    </>
  );
}
