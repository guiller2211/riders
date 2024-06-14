import { CartData, CartEntry } from '@riders/types';

export type HeaderCartProps = {
  cart?: CartData;
  isCheckout?: boolean;
  open?: VoidFunction;
  handleAction?: (action: 'update' | 'delete', entryId: string, quantity?: number) => Promise<CartEntry | void>;
};
