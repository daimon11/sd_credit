import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router';
import type { AppStore, RootState } from '../redux/store';
// As a basic setup, import your same slice reducers
import { clientApi } from '../redux/Client/ClientApi';
import ClientSlice from '../redux/Client/ClientSlice';
import { filesApi } from '../redux/Files/FilesApi';
import FileSlice from '../redux/Files/FileSlice';
import { salaryRegistryApi } from '../redux/SalaryRegistry/SalaryRegistryApi';
import SalaryRegistrySlice from '../redux/SalaryRegistry/SalaryRegistrySlice';
import ReprocessingSlice from '../redux/Reprocessing/ReprocessingSlice';
import SigningSlice from '@src/redux/Signing/SigningSlice';

// This type extends the default options for RTL's render function, allowing
// the user to specify `initialState` and `store`.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store: initialStore,
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  // Automatically create a store instance if no store was passed in
  const store =
    initialStore ||
    configureStore({
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
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
          clientApi.middleware,
          filesApi.middleware,
          salaryRegistryApi.middleware,
        ),
    });

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    //@ts-ignore
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
