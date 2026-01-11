import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { bffApiUrls } from '../../apiUrls';

export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({ baseUrl: bffApiUrls.salary }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<any, void>({
      query: () => '/user-info',
    }),
  }),
});

export const { useGetUserInfoQuery } = clientApi;
