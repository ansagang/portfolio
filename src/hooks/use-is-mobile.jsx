"use client"

import { useLayoutEffect, useState } from 'react';
import useDebounce from './use-debounce';

const useIsMobile = (endpoint) => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < endpoint);
    };
    window.addEventListener('resize', updateSize);
    // updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};

export default useIsMobile;
