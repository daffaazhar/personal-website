type ContentTableProps = {
  columns: string[];
  rows: string[][];
  variant?: 'article' | 'project';
};

export function ContentTable({ columns, rows, variant = 'article' }: ContentTableProps) {
  const wrapClassName = variant === 'project' ? 'project-table-wrap' : 'article-table-wrap';
  const tableClassName = variant === 'project' ? 'project-table' : 'article-table';

  return (
    <div className={wrapClassName}>
      <table className={tableClassName}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th scope="col" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell) => (
                <td
                  className={cell.startsWith('TODO:') ? 'project-section__todo' : undefined}
                  key={cell}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
