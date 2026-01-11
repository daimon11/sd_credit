export const isErrorForOpenSigningPayControlModal = (
  error: any,
  isSigningPayControlModalShown: boolean
): boolean => {
  return error?.status === 403 && error?.data?.code === 2 && !isSigningPayControlModalShown;
};
