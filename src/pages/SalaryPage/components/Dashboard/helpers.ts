export const getMappedTabsArray = (statusesInfoArray: any[]): any[] => {
  return statusesInfoArray || [];
};

export const filtersCountReducer = (filters: any): number => {
  if (!filters) return 0;
  let count = 0;
  Object.keys(filters).forEach((key) => {
    if (filters[key] && key !== 'statusTab') {
      count++;
    }
  });
  return count;
};
