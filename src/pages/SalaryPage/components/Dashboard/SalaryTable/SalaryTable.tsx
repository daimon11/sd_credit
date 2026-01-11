import React, { ReactNode } from 'react';

interface TableConfig {
  heading: any[];
  isLoading: boolean;
  rows: any[];
  columnPinning?: {
    left?: string[];
  };
  sorting: any;
  setSorting: (sorting: any) => void;
  rowSelection: any;
  setRowSelection: (selection: any) => void;
}

interface SalaryTableProps {
  table: TableConfig;
  tableWrapperClassName?: string;
  noResultsComponent?: ReactNode;
}

export const SalaryTable: React.FC<SalaryTableProps> = ({
  table,
  tableWrapperClassName,
  noResultsComponent,
}) => {
  return <div className={tableWrapperClassName}>SalaryTable</div>;
};
