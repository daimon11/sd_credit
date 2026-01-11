import React from 'react';

import {
  ColumnDef,
  ColumnPinningState,
  ResizableTableTemplateBase,
  RowSelectionState,
  SortingState,
  tanstackTable,
} from '@src/domrf-ui';

import { SalaryCardDataResponseSuccess } from '@src/types/SalaryCart';

export type PaymentsTableProps = {
  table: {
    heading?: ColumnDef<SalaryCardDataResponseSuccess>[];
    rows?: SalaryCardDataResponseSuccess[];
    isLoading?: boolean;
    handleRowClick?: (id: string) => void;
    sorting: SortingState;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
    rowSelection: RowSelectionState;
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
    columnPinning: ColumnPinningState;
  };
  tableWrapperClassName: string;
  noResultsComponent?: React.ReactNode;
};

const SalaryTable: React.FC<PaymentsTableProps> = ({
  table: tableData,
  tableWrapperClassName,
  noResultsComponent = null,
}) => {
  const { useReactTable, getCoreRowModel } = tanstackTable;

  const table = useReactTable({
    data: tableData.rows,
    columns: tableData.heading,
    state: {
      sorting: tableData.sorting,
      rowSelection: tableData.rowSelection,
      columnPinning: tableData.columnPinning,
    },
    getRowId: (row: SalaryCardDataResponseSuccess) => row.id,
    onSortingChange: tableData.setSorting,
    onRowSelectionChange: tableData.setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    defaultColumn: {
      minSize: 150,
    },
  });

  return (
    <ResizableTableTemplateBase
      tableData={table}
      noResultsComponent={noResultsComponent}
      isLoading={tableData?.isLoading}
      onRowClick={tableData?.handleRowClick}
      tableWrapperClassName={tableWrapperClassName}
      contentFontSize={14}
    />
  );
};

export default SalaryTable;
