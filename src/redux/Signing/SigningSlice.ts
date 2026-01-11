import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  stagedOrganizationId: string | null;
  isSigningPayControlModalShown: boolean;
} = {
  stagedOrganizationId: null,
  isSigningPayControlModalShown: false,
};

const signingSlice = createSlice({
  name: 'signing',
  initialState,
  reducers: {
    setStagedOrganizationId: (state, action: PayloadAction<string | null>) => {
      state.stagedOrganizationId = action.payload;
    },
    setIsSigningPayControlModalShown: (state, action: PayloadAction<boolean>) => {
      state.isSigningPayControlModalShown = action.payload;
    },
  },
});

export const { setStagedOrganizationId, setIsSigningPayControlModalShown } =
  signingSlice.actions;

export const useSigningActions = () => {
  return {
    setStagedOrganizationId,
    setIsSigningPayControlModalShown,
  };
};

export default signingSlice.reducer;
