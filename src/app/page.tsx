import { PageIntro } from '@/components/content/page-intro';
import { SkeletonNote } from '@/components/content/skeleton-note';

export default function HomePage() {
  return (
    <>
      <PageIntro
        eyebrow="01 / Introduction"
        title="Software engineer building dependable digital products from interface to infrastructure."
        description="TODO: Replace with verified positioning, selected work, writing, and personal context."
      />
      <SkeletonNote>
        Phase 1-2 skeleton. Homepage implementation starts after content models and verified project
        material are available.
      </SkeletonNote>
    </>
  );
}
