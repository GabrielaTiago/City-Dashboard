import { useCallback, useRef } from 'react';

export function useDebounce(delay: number, withoutDelay: boolean) {
  let { current: debouncing } = useRef<number>();
  let { current: isFirstTime } = useRef(withoutDelay);

  const debounce = useCallback((act: () => void) => {
    
    if(isFirstTime) {
      isFirstTime = false;
      act();
    } else {
      if(debouncing) {
        clearTimeout(debouncing)
      }      
      debouncing = setTimeout(() => act(), delay);
    }

  },[delay]);
  
  return {
    debounce
  }
}