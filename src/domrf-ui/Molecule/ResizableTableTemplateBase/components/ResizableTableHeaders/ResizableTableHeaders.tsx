import React from 'react';
import { HeaderGroup, Table as TableType } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Table } from '../../../Table/Table';

interface ResizableTableHeadersProps<T> {
  headerGroup: HeaderGroup<T>;
  tableData: TableType<T>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  wasScrolled: boolean;
  wasScrolledRight: boolean;
}

export function ResizableTableHeaders<T>({
  headerGroup,
  tableData,
  wrapperRef,
  wasScrolled,
  wasScrolledRight,
}: ResizableTableHeadersProps<T>) {
  return (
    <>
      {headerGroup.headers.map((header) => (
        <Table.Th key={header.id} noDefaultStyle>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </Table.Th>
      ))}
    </>
  );
}
