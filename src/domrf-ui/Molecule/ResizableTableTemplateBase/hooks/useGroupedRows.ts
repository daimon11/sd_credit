import { Row } from '@tanstack/react-table';

interface UseGroupedRowsProps<T> {
  rows: Row<T>[];
  groupByDataRow?: string;
}

export function useGroupedRows<T>({ rows, groupByDataRow }: UseGroupedRowsProps<T>) {
  if (!groupByDataRow) {
    return {
      groupedRows: {},
      isGroupedRowsEmpty: true,
    };
  }

  const groupedRows = rows.reduce((acc, row) => {
    const groupValue = (row.original as any)[groupByDataRow];
    const groupKey = String(groupValue || '');
    
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(row);
    
    return acc;
  }, {} as Record<string, Row<T>[]>);

  return {
    groupedRows,
    isGroupedRowsEmpty: Object.keys(groupedRows).length === 0,
  };
}
