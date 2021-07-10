import { useCallback, useEffect, useState } from 'react';

interface ReturnType {
  isMobile: boolean;
  innerWidth: number;
  outerWidth: number;
}

export const useWidth = (): ReturnType => {
  const [state, setState] = useState<ReturnType>({
    innerWidth: 0,
    outerWidth: 0,
    isMobile: false,
  });

  const calc = useCallback(() => {
    setState({
      innerWidth: window.innerWidth ?? 0,
      outerWidth: window.outerWidth ?? 0,
      isMobile: (window.outerWidth ?? 0) < 992,
    });
  }, []);

  useEffect(() => {
    calc();
    window.onresize = () => calc();
    return () => window.removeEventListener('resize', calc);
  }, []);
  return state;
};
