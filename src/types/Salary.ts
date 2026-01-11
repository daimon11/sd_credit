export type StatusInTextColors = 'gray' | 'yellow' | 'green' | 'red' | 'blue';

export type SalaryStatuses =
  | 'DRAFT'
  | 'FOR_SIGNING'
  | 'SIGNING'
  | 'PROCESSING'
  | 'EXECUTED'
  | 'REJECTED'
  | 'WAITING_PAYMENT';

export interface SalaryDataRequestQuery {
  organizationId?: string;
  statuses?: SalaryStatuses[];
  [key: string]: any;
}

export interface SalaryDataResponseSuccess {
  salaryListDtos: Array<{
    id: string;
    status: string;
    number: string;
    date: string;
    amount: number;
    fileName: string;
    contactPerson: string;
    contactPhoneNumber: string;
  }>;
}

export const STATUS: Record<SalaryStatuses, { color: StatusInTextColors; name: string }> = {
  DRAFT: { color: 'gray', name: 'Черновик' },
  FOR_SIGNING: { color: 'yellow', name: 'Готов к подписанию' },
  PROCESSING: { color: 'yellow', name: 'В обработке' },
  EXECUTED: { color: 'green', name: 'Исполнен' },
  REJECTED: { color: 'red', name: 'Отклонен' },
  WAITING_PAYMENT: { color: 'red', name: 'Ожидает платеж' },
  SIGNING: { color: 'yellow', name: 'Подписание' },
} as const;
