import { PageIntro } from '@/components/content/page-intro';
import { SkeletonNote } from '@/components/content/skeleton-note';

export default function WritingPage() {
  return (
    <>
      <PageIntro
        eyebrow="03 / Writing"
        title="Technical explanations, mental models, and reflections."
        description="TODO: Add verified articles and publication metadata."
      />
      <SkeletonNote>
        TODO: Add featured article, chronological rows, topics, and RSS wiring.
      </SkeletonNote>
    </>
  );
}
