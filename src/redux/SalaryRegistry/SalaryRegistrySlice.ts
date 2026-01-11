import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Filters {
  statusTab?: string[];
  sortField?: string;
  sortDescending?: boolean;
  pageSize?: number;
  pageNumber?: number;
  statusesFilters?: string[];
  [key: string]: any;
}

const initialState: {
  data: any[];
  filters: Filters | null;
  total: number;
} = {
  data: [],
  filters: null,
  total: 0,
};

const salaryRegistrySlice = createSlice({
  name: 'salaryRegistry',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state, action: PayloadAction<string[]>) => {
      state.filters = { statusTab: action.payload };
    },
    setPagination: (
      state,
      action: PayloadAction<{ name: 'pageSize' | 'pageNumber'; value: number }>
    ) => {
      if (state.filters) {
        state.filters[action.payload.name] = action.payload.value;
      }
    },
  },
});

export const { updateFilters, resetFilters, setPagination } = salaryRegistrySlice.actions;
export default salaryRegistrySlice.reducer;
