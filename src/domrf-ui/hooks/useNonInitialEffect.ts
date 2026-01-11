import { useEffect, useRef } from 'react';

export const useNonInitialEffect = (effect: () => void, deps: any[]) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    effect();
  }, deps);
};
