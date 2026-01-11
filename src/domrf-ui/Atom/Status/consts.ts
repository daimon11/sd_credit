import { STATUS as SalarySTATUS, StatusInTextColors as SalaryStatusInTextColors } from '@src/types/Salary';

export type StatusColors = 'gray' | 'yellow' | 'green' | 'red' | 'blue';
export type StatusInTextColors = SalaryStatusInTextColors;
export type StatusPriority = 'main' | 'secondary';
export type StatusSize = 'small' | 'medium' | 'large';

export const STATUS = SalarySTATUS;
