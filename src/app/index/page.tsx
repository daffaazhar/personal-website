import { PageIntro } from '@/components/content/page-intro';
import { SkeletonNote } from '@/components/content/skeleton-note';

export default function IndexPage() {
  return (
    <>
      <PageIntro
        eyebrow="06 / Index"
        title="The full archive."
        description="Everything on this site in one text-first list: work, writing, notes, and future archive sections."
      />
      <SkeletonNote>
        TODO: Add dense archive groups after typed content collections exist.
      </SkeletonNote>
    </>
  );
}
