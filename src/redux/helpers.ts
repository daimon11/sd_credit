import { useSelector } from 'react-redux';

export const useApiSelector = <T,>(selector: (state: any) => T): T => {
    return useSelector(selector);
};
