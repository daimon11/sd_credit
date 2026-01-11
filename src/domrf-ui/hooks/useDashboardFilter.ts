export const useDashboardFilter = <T,>(options: { fieldLocalStorage: string }) => {
  const filters = localStorage.getItem(options.fieldLocalStorage)
    ? JSON.parse(localStorage.getItem(options.fieldLocalStorage) || 'null')
    : null;

  const saveFilterInLocalStorage = (filters: T) => {
    localStorage.setItem(options.fieldLocalStorage, JSON.stringify(filters));
  };

  return {
    filters,
    saveFilterInLocalStorage,
  };
};
