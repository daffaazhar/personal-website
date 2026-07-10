type EditorialDefinitionListProps = {
  items: ReadonlyArray<{
    title: string;
    description: string;
  }>;
};

export function EditorialDefinitionList({ items }: EditorialDefinitionListProps) {
  return (
    <dl className="editorial-definition-list">
      {items.map((item) => (
        <div className="editorial-definition-list__row" key={item.title}>
          <dt>{item.title}</dt>
          <dd>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}
