import { CartData } from '@ducati/types';

export type HeaderCartProps = {
  cart?: CartData;
  isCheckout?: boolean;
  open?: VoidFunction;
};
