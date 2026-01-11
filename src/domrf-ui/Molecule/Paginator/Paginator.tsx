import React from 'react';

interface PageSizeButton {
  title: string;
  pageSize: number;
}

interface PaginatorProps {
  totalCount?: number;
  pageSize?: number;
  setPageSize?: (value: number) => void;
  pageNumber?: number;
  setPageNumber?: (value: number) => void;
  hideBtnAll?: boolean;
  pageSizeButtons?: PageSizeButton[];
}

export const Paginator: React.FC<PaginatorProps> = ({
  totalCount,
  pageSize,
  setPageSize,
  pageNumber,
  setPageNumber,
  hideBtnAll,
  pageSizeButtons,
}) => {
  return <div>Paginator</div>;
};
