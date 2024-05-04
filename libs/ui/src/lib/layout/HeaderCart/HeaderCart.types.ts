import { CartData, CartEntry } from '@ducati/types';

export type HeaderCartProps = {
  cart?: CartData;
  isCheckout?: boolean;
  open?: VoidFunction;
  handleAction?: (action: 'update' | 'delete', entryId: string, quantity?: number) => Promise<CartEntry | void>;
};
