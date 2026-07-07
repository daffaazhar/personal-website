import { PageIntro } from '@/components/content/page-intro';
import { SkeletonNote } from '@/components/content/skeleton-note';

export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="02 / Work"
        title="Selected and archived projects."
        description="Products, systems, and experiments documented through decisions, constraints, and outcomes."
      />
      <SkeletonNote>TODO: Add verified project content and case-study summaries.</SkeletonNote>
    </>
  );
}
