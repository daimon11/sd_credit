export type StatusInTextColors = 'gray' | 'yellow' | 'green' | 'red' | 'blue';

export type SalaryCartStatuses =
    | 'DRAFT'
    | 'FOR_SIGNING'
    | 'SIGNING'
    | 'PARTIALLY_SIGNED'
    | 'PROCESSING'
    | 'EXECUTED'
    | 'PARTIALLY_EXECUTED'
    | 'REJECTED';

export type SalaryCartDeliveryType = 'ORGANIZATION' | 'BANK_OFFICE';

export type TariffPlanType = 'NAMED' | 'UNNAMED' | 'PREMIUM';

export type SalaryCardDeliveryMethedsDataType = {
    delivery_type: SalaryCartDeliveryType;
    delivery_office?: null | string;
    delivery_city?: null | string;
};

export type SalaryCardType = {
    payment_system: 'MIR';
    tariff_plan: TariffPlanType;
};

export const TARIFF: Record<TariffPlanType, string> = {
    NAMED: 'Именная',
    UNNAMED: 'Неименная',
    PREMIUM: 'Премиум',
};

export const DELIVERY: Record<SalaryCartDeliveryType, string> = {
    ORGANIZATION: 'В организацию',
    BANK_OFFICE: 'В банк',
};

export const STATUS: Record<
    SalaryCartStatuses,
    { color: StatusInTextColors; name: string }
> = {
    DRAFT: { color: 'gray', name: 'Черновик' },
    FOR_SIGNING: { color: 'yellow', name: 'Готов к подписанию' },
    SIGNING: { color: 'yellow', name: 'Подписание' },
    PARTIALLY_SIGNED: { color: 'yellow', name: 'Частично подписана' },
    PROCESSING: { color: 'yellow', name: 'Частично подписана' },
    EXECUTED: { color: 'green', name: 'Исполнен' },
    PARTIALLY_EXECUTED: { color: 'green', name: 'Частично исполнена' },
    REJECTED: { color: 'red', name: 'Отклонен' },
};

export type ContactPerson = {
    fullName: string;
    phone: string;
};

export type SalaryCardDataResponseSuccess = {
    id: string;
    organizationId: string;
    status: SalaryCartStatuses;
    registerNumber: string;
    salaryAgreement: string;
    sendDate?: string | null;
    cardsCount: number;
    cardType: SalaryCardType;
    deliveryMethod: SalaryCardDeliveryMethedsDataType;
    contactPerson: ContactPerson;
    bankComment?: string | null;
    processingDate?: string | null;
};
