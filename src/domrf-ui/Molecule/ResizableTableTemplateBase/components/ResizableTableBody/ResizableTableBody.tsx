import React, { Fragment } from 'react';
import { Table as TableType } from '@tanstack/react-table';
import { TableRow, Table } from '@src/domrf-ui/index';
import { ResizableTableRow } from '../ResizableTableRow/ResizableTableRow';
import styles from './ResizableTableBody.module.scss';
import cn from 'classnames';

type PropsTypeBody<T extends Object> = {
  tableData: TableType<T>;
  wasScrolled: boolean;
  wasScrolledRight: boolean;
  onRowDoubleClick?: (id: string) => void;
  onRowClick?: (id: string) => void;
  renderSubComponent?: React.FC<{ row: TableRow<T> }>;
  renderTitleGroupComponent?: React.FC<{
    groupName: string;
    rows: TableRow<T>[];
  }>;
};

type PropsBodyWithGroup<T extends Object> = PropsTypeBody<T> & {
  groupedRows: Record<string, TableRow<T>[]>;
  noHoverStyles?: boolean;
  titleGroupClassName?: string;
};

/**
 * Возвращает строки таблицы
 */
export function ResizableTableBody<T extends Object>(props: PropsTypeBody<T>) {

  const { tableData, wasScrolled, wasScrolledRight } = props;
  return (
    <>
      {tableData.getRowModel().rows?.map((row) => (
        <ResizableTableRow
          key={row.id}
          row={row}
          wasScrolled={wasScrolled}
          wasScrolledRight={wasScrolledRight}
          {...props}
        />
      ))}
    </>
  );
}

/**
 * Возвращает строки таблицы с группировкой. По сгруппированному полю выводится строка "Заголовок"
 * и далее строки принадлежащие "Заголовку"
 */
export function ResizableTableBodyWithGroup<T extends Object>({
  groupedRows,
  wasScrolled,
  wasScrolledRight,
  noHoverStyles,
  renderTitleGroupComponent: TitleGroupComponent,
  titleGroupClassName,
  ...props
}: PropsBodyWithGroup<T>) {
  return (
    <>
      {Object.entries(groupedRows).map(([groupName, rows]) => (
        <Fragment key={groupName}>
          <Table.Tr
            key={'titleGroup ' + groupName}
            className={titleGroupClassName}
          >
            <Table.Td
              colSpan={rows?.[0]?.getVisibleCells().length}
              className={cn(styles['title-group'], {
                [styles['no-hover-styles']]: noHoverStyles,
              })}
            >
              <TitleGroupComponent groupName={groupName} rows={rows} />
            </Table.Td>
          </Table.Tr>
          {rows.map((row) => (
            <ResizableTableRow
              key={row.id}
              row={row}
              wasScrolled={wasScrolled}
              wasScrolledRight={wasScrolledRight}
              {...props}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
}
