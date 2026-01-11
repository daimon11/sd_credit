export type SalaryStatuses = string;

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

export const STATUS: Record<string, { name: string; color: string }> = {
  FOR_SIGNING: { name: 'На подпись', color: 'blue' },
  SIGNED: { name: 'Подписано', color: 'green' },
  REJECTED: { name: 'Отклонено', color: 'red' },
};
