export type MetadataItem = {
  label: string;
  value: React.ReactNode;
};

type MetadataListProps = {
  items: MetadataItem[];
  columns?: 1 | 2 | 3 | 4;
};

export function MetadataList({ items, columns = 2 }: MetadataListProps) {
  return (
    <dl className="metadata-list" data-columns={columns}>
      {items.map((item) => (
        <div className="metadata-list__item" key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
