import { useState, useCallback } from 'react';

export const useOpenState = () => {
  const [open, setOpenState] = useState(false);

  const setClose = useCallback(() => {
    setOpenState(false);
  }, []);

  const setOpen = useCallback(() => {
    setOpenState(true);
  }, []);

  return [open, setOpen, setClose] as [boolean, VoidFunction, VoidFunction];
};
