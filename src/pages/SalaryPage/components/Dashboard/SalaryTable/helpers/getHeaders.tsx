import React from 'react';
import { format, isValid } from 'date-fns';
import { AmountRUB, Checkbox, ColumnDef, Status } from '@src/domrf-ui';
import styles from '../SalaryTable.module.scss';
// import { File } from '../File/File';
import { STATUS, SalaryDataResponseSuccess } from '@src/types/Salary';

type SalaryItemDto = SalaryDataResponseSuccess['salaryListDtos'][number];

export function getHeaders(): ColumnDef<SalaryItemDto>[] {
  return [
    {
      Header: ({ table }) => (
          <Checkbox
            value=""
            checked={table.getIsAllRowsSelected()}
            onClick={() => table.toggleAllRowsSelected()}
          />
      ),
      cell: ({ row }) => (
        <Checkbox
          value=""
          checked={row.getIsSelected()}
          onClick={(ev) => {
            ev.stopPropagation();
            row.toggleSelected();
          }}
        />
      ),
      size: 56,
      minSize: 56,
      enableSorting: false,
      enableResizing: false,
      id: 'select-col',
    },
    {
      accessorKey: 'status',
      header: 'Статус',
      cell: (props) => {
        const { status } = props.row.original;
        return (
          <div className={styles['status_content']}>
            <Status
              name={STATUS[status]?.name}
              color={STATUS[status]?.color}
              size="large"
              textInStatus
            />
          </div>
        );
      },
      size: 250,
      minSize: 250,
      id: 'status',
      enableSorting: false,
    },
    {
      accessorKey: 'number',
      header: 'Номер',
      cell: (props) => props.getValue(),
      size: 96,
      minSize: 96,
      id: 'NUMBER',
      sortDescFirst: true,
    },
    {
      accessorKey: 'date',
      header: 'Дата импорта',
      cell: (props) => {
        const { date } = props.row.original;
        const dateValue = new Date(date);

        return (
          <span className={styles['page_table']}>
            {isValid(dateValue) ? format(dateValue, 'dd.MM.yyyy') : 'Ошибка парсинга даты'}
          </span>
        );
      },
      size: 134,
      minSize: 134,
      id: 'DATE',
      sortDescFirst: true,
    },
    {
      accessorKey: 'amount',
      header: 'Сумма, RUB',
      cell: (props) => {
        const { amount } = props.row.original;
        return (
          <AmountRUB
            number={amount || 0}
            currencyDisplay="symbol"
            noColorDecor
            noSign
          />
        );
      },
      size: 172,
      minSize: 172,
      id: 'AMOUNT',
      sortDescFirst: true,
    },
    {
      accessorKey: 'fileName',
      header: 'Файл',
      cell: (props) => {
        const { fileName, id } = props.row.original;
        // return <span filename={fileName} id={id} />;
        return <span>fileName</span>
      },
      size: 400,
      minSize: 400,
      id: 'document.file',
      enableSorting: false,
    },
    {
      accessorKey: 'contactPerson',
      header: 'Контактное лицо',
      cell: (props) => props.getValue(),
      size: 400,
      minSize: 400,
      id: 'document.contactName',
      enableSorting: false,
    },
    {
      accessorKey: 'contactPhoneNumber',
      header: 'Контактный телефон',
      cell: (props) => props.getValue(),
      size: 186,
      minSize: 186,
      id: 'document.contactPhone',
      enableSorting: false,
    },
  ];
}
