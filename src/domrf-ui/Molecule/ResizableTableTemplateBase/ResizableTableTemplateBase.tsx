import React, { useState, useRef, useEffect } from 'react';
import styles from './ResizableTableTemplateBase.module.scss';
import {
  flexRender,
  Header,
  HeaderGroup,
  Table as TableType,
  Row
} from '@tanstack/react-table';
import cn from 'classnames';
import { Sort, Table, TableRow } from '@src/domrf-ui/index';
import {
  ResizableTableBody,
  ResizableTableBodyWithGroup,
} from './components/ResizableTableBody/ResizableTableBody';
import { useGroupedRows } from './hooks/useGroupedRows';
import { getClassNameByColumnsFromMeta } from './helper/getDataFromMeta';

type ResizableTableTemplateBaseProps<T extends Object> = {
  tableData: TableType<T>;
  isLoading?: boolean;
  noResultsComponent?: React.ReactNode;
  onRowDoubleClick?: (id: string) => void;
  onRowClick?: (id: string) => void;
  minTableHeight?: number;
  tableWrapperClassName?: string;
  renderSubComponent?: ({ row }: { row: TableRow<T> }) => React.ReactElement;
  contentFontSize?: number;

  groupByDataRow?: string;
  renderTitleGroupComponent?: ({
    groupName,
    rows,
  }: {
    groupName: string;
    rows: Row<T>[];
  }) => React.ReactElement;
  noHoverTitleGroupStyles?: boolean;
  titleGroupClassName?: string;
};

export function ResizableTableTemplateBase<T extends Object>(
  props: ResizableTableTemplateBaseProps<T>
): JSX.Element {
  const { tableData, isLoading = false, groupByDataRow } = props;

  const tableRows = tableData.getRowModel().rows;
  const { groupedRows, isGroupedRowsEmpty } = useGroupedRows({
    rows: tableRows,
    groupByDataRow,
  });

  // Блок определения ширины враппера таблицы
  const [fullWidth, setFullWidth] = useState(0);
  const [wasScrolled, setWasScrolled] = useState(false);
  const [wasScrolledRight, setWasScrolledRight] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (wrapperRef.current) {
      setFullWidth(wrapperRef.current.offsetWidth);
    }
  }, [wrapperRef.current]);

  const wrapperClassName = cn(
    styles['table-wrapper'],
    props?.tableWrapperClassName,
    {
      [styles[`font-size-${props?.contentFontSize}`]]: props?.contentFontSize,
      [styles['loading']]: isLoading,
      [styles['with-result']]: tableRows.length > 0,
    }
  );

  const handleScrollWrapper = () => {
    if (!wrapperRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;

    // левая тень
    setWasScrolled(scrollLeft > 0);
    // правая тень
    setWasScrolledRight(scrollLeft < maxScrollLeft);
  };

  useEffect(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current;

    const handleResize = () => {
      requestAnimationFrame(() => {
        setFullWidth(el?.offsetWidth);
        handleScrollWrapper();
      });
    };

    setFullWidth(el?.offsetWidth);
    handleScrollWrapper();

    el?.addEventListener('scroll', handleScrollWrapper);

    const observer = new ResizeObserver(handleResize);
    observer.observe(el);

    return () => {
      el?.removeEventListener('scroll', handleScrollWrapper);
      observer.disconnect();
    };
  }, [handleScrollWrapper, tableData, tableRows?.length]);

  const width = Math.max(fullWidth, tableData.getTotalSize());

  return (
    <div
      className={wrapperClassName}
      ref={wrapperRef}
      onScroll={handleScrollWrapper}
      style={{ minHeight: props?.minTableHeight }}
    >
      <Table
        style={{
          width: !isNaN(width) ? width : null,
        }}
        noDefaultStyle
        className={styles['resizable-template']}
      >
        <Table.Head noDefaultStyle>
          <Table.Tr noDefaultStyle>
            {tableData.getHeaderGroups().map((headerGroup) => (
              <ResizableTableHeaders
                key={headerGroup.id}
                headerGroup={headerGroup}
                tableData={tableData}
                wrapperRef={wrapperRef}
                wasScrolled={wasScrolled}
                wasScrolledRight={wasScrolledRight}
              />
            ))}
          </Table.Tr>
        </Table.Head>
        <Table.Body noDefaultStyle>
          {!isGroupedRowsEmpty && props.renderTitleGroupComponent ? (
            <ResizableTableBodyWithGroup
              groupedRows={groupedRows}
              wasScrolled={wasScrolled}
              wasScrolledRight={wasScrolledRight}
              noHoverStyles={props.noHoverTitleGroupStyles}
              {...props}
            />
          ) : (
            <ResizableTableBody
              tableData={tableData}
              wasScrolled={wasScrolled}
              wasScrolledRight={wasScrolledRight}
              {...props}
            />
          )}

          {tableRows.length === 0 &&
            props?.noResultsComponent &&
            props?.noResultsComponent}
        </Table.Body>
      </Table>
    </div>
  );
}

export function ResizableTableHeaders<T>(props: {
  headerGroup: HeaderGroup<T>;
  tableData: TableType<T>;
  wasScrolled: boolean;
  wasScrolledRight: boolean;
  wrapperRef?: React.MutableRefObject<HTMLDivElement>;
}): JSX.Element {
  // Определение ширины последнего столбца таблицы, если ширина всех столбцов меньше шир
  const getLastColumnWidth = (columnSize: number) => {
    const tableTotalSize = props.tableData.getTotalSize();
    const wrapperWidth = props?.wrapperRef?.current?.clientWidth;

    return tableTotalSize >= wrapperWidth
      ? columnSize
      : columnSize + (wrapperWidth - tableTotalSize);
  };

  // Определение ширины столбца
  const getColumnWidth = (isLastCoumn: boolean, columnSize: number) =>
    isLastCoumn ? getLastColumnWidth(columnSize) : columnSize;

  // Определение направления сортировки
  const getIsDesc = (header: Header<T, unknown>) => {
    return props.tableData.getState().sorting[0].id === header.column.id
      ? !props.tableData.getState().sorting[0].desc
      : header.column.getFirstSortDir() === 'desc';
  };

  useEffect(() => {
    props.tableData.getAllColumns().forEach((col) => {
      if (!col.getIsVisible()) {
        col.resetSize();
      }
    });
  }, [props.headerGroup.headers.length]);

  return (
    <>
      {props.headerGroup.headers.map((header, i, array) => {
        const isPinnedLeft = header.column.getIsPinned() === 'left';
        const isPinnedRight = header.column.getIsPinned() === 'right';

        const isAnyPinnedRight =
          props.tableData.getRightHeaderGroups()[0].headers.length > 0;

        const isLastColumn =
          isPinnedLeft || (!header.column.getIsPinned() && isAnyPinnedRight)
            ? false
            : array.length - 1 === i;

        const headerDivider = cn(styles['resizable-th-divider'], {
          [styles['resizable-th-divider_active']]: header.column.getCanResize(),
          [styles['resizable-th-divider_none']]: isLastColumn,
        });

        const classNameFromMeta = getClassNameByColumnsFromMeta(header.column);

        const headerClassName = cn(styles['resizable-th'], {
          [styles['resizable-th_sticky-left']]: isPinnedLeft,
          [styles['resizable-th_sticky-right']]: isPinnedRight,
          [styles['resizable-th_sticky-left_shadow-right']]:
            isPinnedLeft && props.wasScrolled,
          [styles['resizable-th_sticky-right_shadow-left']]:
            isPinnedRight && props.wasScrolledRight,
          [classNameFromMeta]: classNameFromMeta,
        });

        const headerWidth = getColumnWidth(isLastColumn, header.getSize());

        return (
          <Table.Th
            key={header.id}
            style={{
              width: !isNaN(headerWidth) ? headerWidth : null,
              minWidth: !isNaN(headerWidth) ? headerWidth : null,
              maxWidth: !isNaN(headerWidth) ? headerWidth : null,
            }}
            className={headerClassName}
            data-testid="resizable-th"
            noDefaultStyle
          >
            <div
              className={styles['resizable-th-wrapper']}
              onClick={
                header.column.getCanSort()
                  ? () => {
                    header.column.toggleSorting(getIsDesc(header))
                  }
                  : undefined
              }
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getCanSort() && (
                <Sort
                  type={header.column.getIsSorted() ?? null}
                />
              )}
            </div>
            <svg
              className={headerDivider}
              width="6"
              height="24"
              viewBox="0 0 6 24"
              data-testid={
                header.column.getCanResize()
                  ? 'resizable-th-divider_active'
                  : 'resizable-th-divider'
              }
              onMouseDown={
                header.column.getCanResize()
                  ? header.getResizeHandler()
                  : undefined
              }
            >
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="24"
                style={{ stroke: '#e4e4e4', strokeWidth: '1px' }}
              />
            </svg>
          </Table.Th>
        );
      })}
    </>
  );
}
