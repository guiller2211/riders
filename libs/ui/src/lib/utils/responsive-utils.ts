import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setIsMobile(window.innerWidth <= 768);
      }

      handleResize(); 
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }

    return undefined;
  }, []);

  return isMobile;
}
