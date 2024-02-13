import type { CartData } from '../../types';

export type HeaderCartProps = {
  cart?: CartData;
  isCheckout?: boolean;
  open?: VoidFunction;
};
