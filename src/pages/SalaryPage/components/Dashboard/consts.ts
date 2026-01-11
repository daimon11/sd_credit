export const columns = [
  {
    Header: 'Статус',
    accessor: 'STATUS',
    sort: false,
  },
  {
    Header: 'Номер',
    accessor: 'NUMBER',
    sort: true,
  },
  {
    Header: 'Дата импорта',
    accessor: 'DATE',
    sort: true,
  },
  {
    Header: 'Сумма, RUB',
    accessor: 'AMOUNT',
    sort: true,
  },
  {
    Header: 'Файл',
    accessor: 'FILE',
    sort: false,
  },
  {
    Header: 'Контактное лицо',
    accessor: 'CONTACT_NAME',
    sort: false,
  },
  {
    Header: 'Контактный телефон',
    accessor: 'CONTACT_PHONE',
    sort: false,
  },
] as const;

export enum SalaryTabs {
  SALARY_SHEET = 'SALARY_SHEET',
  SALARY_CARDS_ISSUE = 'SALARY_CARDS_ISSUE',
  SALARY_CARDS_UNPIN = 'SALARY_CARDS_UNPIN',
}

export const SALARY_TABS_NAMES: { [K in SalaryTabs]: string } = {
  [SalaryTabs.SALARY_SHEET]: 'Зарплатная ведомость',
  [SalaryTabs.SALARY_CARDS_ISSUE]: 'Выпуск зарплатных карт',
  [SalaryTabs.SALARY_CARDS_UNPIN]: 'Открепление зарплатных карт',
};
