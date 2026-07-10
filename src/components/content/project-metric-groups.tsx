type ProjectMetricGroupsProps = {
  groups: Array<{
    title: string;
    items: string[];
  }>;
};

export function ProjectMetricGroups({ groups }: ProjectMetricGroupsProps) {
  return (
    <div className="project-metric-groups">
      {groups.map((group) => (
        <section className="project-metric-group" key={group.title} aria-label={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
