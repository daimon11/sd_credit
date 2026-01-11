import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { bffApiUrls } from '../../apiUrls';

export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: fetchBaseQuery({ baseUrl: bffApiUrls.salary }),
  endpoints: () => ({}),
});
