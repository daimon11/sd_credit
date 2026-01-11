import React from 'react';
import { Row } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Table } from '../../../Table/Table';
import { TableRow } from '@src/domrf-ui/index';

interface ResizableTableRowProps<T> {
  row: Row<T>;
  wasScrolled: boolean;
  wasScrolledRight: boolean;
  onRowClick?: (id: string) => void;
  onRowDoubleClick?: (id: string) => void;
  renderSubComponent?: React.FC<{ row: TableRow<T> }>;
}

export function ResizableTableRow<T>({
  row,
  wasScrolled,
  wasScrolledRight,
  onRowClick,
  onRowDoubleClick,
  renderSubComponent,
}: ResizableTableRowProps<T>) {
  return (
    <Table.Tr
      onClick={onRowClick ? () => onRowClick(row.id) : undefined}
      onDoubleClick={onRowDoubleClick ? () => onRowDoubleClick(row.id) : undefined}
      noDefaultStyle
    >
      {row.getVisibleCells().map((cell) => (
        <Table.Td key={cell.id} noDefaultStyle>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Table.Td>
      ))}
    </Table.Tr>
  );
}
