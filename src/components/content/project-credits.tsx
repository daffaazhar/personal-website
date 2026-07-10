type ProjectCreditsProps = {
  credits: Array<{
    name: string;
    role: string;
  }>;
};

export function ProjectCredits({ credits }: ProjectCreditsProps) {
  return (
    <ul className="project-credits" aria-label="Project credits">
      {credits.map((credit) => (
        <li key={`${credit.name}-${credit.role}`}>
          <span>{credit.name}</span>
          <span>{credit.role}</span>
        </li>
      ))}
    </ul>
  );
}
