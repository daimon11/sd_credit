import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fio: '',
    phone: '',
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    updateFio: (state, action) => {
        state.fio = action.payload;
    },
    updatePhone: (state, action) => {
        state.phone = action.payload;
    },
  },
});

export const { updateFio, updatePhone } = clientSlice.actions;
export default clientSlice.reducer;
