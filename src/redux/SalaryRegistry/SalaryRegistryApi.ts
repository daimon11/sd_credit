import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { bffApiUrls } from '../../apiUrls';
import { SalaryDataRequestQuery } from '@src/types/Salary';
import { SignVerificationRequestBody } from '@src/types/Sign';

export const salaryRegistryApi = createApi({
  reducerPath: 'salaryRegistryApi',
  baseQuery: fetchBaseQuery({ baseUrl: bffApiUrls.salary }),
  endpoints: (builder) => ({
    getRegistry: builder.query<any, { registryFilters: any; organizationId: string }>({
      query: (params) => ({
        url: '/registry',
        params: { ...params.registryFilters, organizationId: params.organizationId },
      }),
    }),
    signVerification: builder.query<any, SignVerificationRequestBody[]>({
      query: (body) => ({
        url: '/sign-verification',
        method: 'POST',
        body,
      }),
    }),
    getStatusesCount: builder.query<any, { organizationId: string }>({
      query: (params) => ({
        url: '/statuses-count',
        params,
      }),
    }),
  }),
});

export const {
  useGetRegistryQuery,
  useSignVerificationQuery,
  useGetStatusesCountQuery,
} = salaryRegistryApi;

