import { Cart } from '@ducati/types';
import type { CartData } from '../../types';

export type HeaderCartProps = {
  cart?: Cart;
  isCheckout?: boolean;
  open?: VoidFunction;
};
