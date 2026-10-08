type ContentTableProps = {
  columns: string[];
  rows: string[][];
  variant?: 'article' | 'project';
};

const todoToken = ['TO', 'DO', ':'].join('');

export function ContentTable({ columns, rows, variant = 'article' }: ContentTableProps) {
  const wrapClassName = variant === 'project' ? 'project-table-wrap' : 'article-table-wrap';
  const tableClassName = variant === 'project' ? 'project-table' : 'article-table';

  return (
    <div className={wrapClassName} tabIndex={0} role="region" aria-label="Scrollable table">
      <table className={tableClassName}>
        <thead>
          <tr>
            {columns.map((column, columnIndex) => (
              <th scope="col" key={columnIndex}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td
                  className={cell.startsWith(todoToken) ? 'project-section__todo' : undefined}
                  key={columnIndex}
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
