import { PageIntro } from '@/components/content/page-intro';
import { SkeletonNote } from '@/components/content/skeleton-note';

export default function NotesPage() {
  return (
    <>
      <PageIntro
        eyebrow="04 / Notes"
        title="Notes and fragments."
        description="Short, practical records of commands, debugging details, and small lessons worth keeping."
      />
      <SkeletonNote>
        TODO: Add grouped note rows with topics, dates, and last-tested metadata.
      </SkeletonNote>
    </>
  );
}
