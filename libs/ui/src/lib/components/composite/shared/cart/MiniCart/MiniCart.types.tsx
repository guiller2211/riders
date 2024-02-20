import type { CartData, CartEntryData } from '../../../../../types';

export type MiniCartProps = {
  onClose: VoidFunction;
  open: boolean;
  isAdd?: boolean;
  cart?: CartData;
  product?: CartEntryData;
};
