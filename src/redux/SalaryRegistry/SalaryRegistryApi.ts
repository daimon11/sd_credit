import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { bffApiUrls } from '../../apiUrls';

export const salaryRegistryApi = createApi({
  reducerPath: 'salaryRegistryApi',
  baseQuery: fetchBaseQuery({ baseUrl: bffApiUrls.salary }),
  endpoints: () => ({}),
});
