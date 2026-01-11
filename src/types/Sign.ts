import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type SignVerificationRequestBody = {
    docId: string;
    docType:
        | 'PAYMENT_ORDER'
        | 'PAYMENT_ORDE_REVOKE'
        | 'LETTER'
        | 'SBP_B2B'
        | 'SALARY_LIST';
    legalEntityId: string;
    ruleName:
        | 'PAYMENT_ORDER'
        | 'PAYMENT_ORDER_CREDIT'
        | 'PAYMENT_ORDE_REVOKE'
        | 'LETTER'
        | 'SBP_B2B'
        | 'SALARY_LIST';
    data?: string;
}[];

export type SignVerificationResponseSuccess = {
    docId: string;
    docType: string;
    electronicSignType?: 'ADES' | 'SES' | null;
    status: 200 | 400;
    message?: string;
}[];

export type SignRequestBody = {
    documents: {
        documentType: string;
        legalId: string;
        docId: string;
        docStatus: 'FOR_SIGNING';
    }[];
};

export type SigningRequestBody = SignVerificationRequestBody;

export type SigningResponseSuccess = {
    operationId?: string;
    documents: {
        docId: string;
        docType: string;
        electronicSignType: 'ADES' | 'SES';
        status: 200 | 400;
        message?: string;
    }[];
};

export type ReprocessingRequestBody = {
    id: string;
};

export type TSigningError = {
    status: number;
    data: {
        code: number;
        message: string;
    };
};

export type TCustomError = TSigningError | FetchBaseQueryError | SerializedError;
