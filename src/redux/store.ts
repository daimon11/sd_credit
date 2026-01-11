import { configureStore } from '@reduxjs/toolkit';
import { clientApi } from './Client/ClientApi';
import ClientSlice from './Client/ClientSlice';
import { filesApi } from './Files/FilesApi';
import FileSlice from './Files/FileSlice';
import { salaryRegistryApi } from './SalaryRegistry/SalaryRegistryApi';
import SalaryRegistrySlice from './SalaryRegistry/SalaryRegistrySlice';
import ReprocessingSlice from './Reprocessing/ReprocessingSlice';
import SigningSlice from './Signing/SigningSlice';

export const store = configureStore({
  reducer: {
    [clientApi.reducerPath]: clientApi.reducer,
    client: ClientSlice,
    [filesApi.reducerPath]: filesApi.reducer,
    file: FileSlice,
    [salaryRegistryApi?.reducerPath]: salaryRegistryApi.reducer,
    salaryRegistry: SalaryRegistrySlice,
    reprocessing: ReprocessingSlice,
    signing: SigningSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      clientApi.middleware,
      filesApi.middleware,
      salaryRegistryApi.middleware,
    ),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
