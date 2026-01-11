import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showLoader: false,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    toggleLoader: (state, action) => {
        state.showLoader = action.payload;
    },
  },
});

export const { toggleLoader } = fileSlice.actions;
export default fileSlice.reducer;
