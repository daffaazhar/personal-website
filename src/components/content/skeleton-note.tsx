type SkeletonNoteProps = {
  children: React.ReactNode;
};

export function SkeletonNote({ children }: SkeletonNoteProps) {
  return (
    <section className="site-container skeleton-section" aria-label="Implementation note">
      <p>{children}</p>
    </section>
  );
}
