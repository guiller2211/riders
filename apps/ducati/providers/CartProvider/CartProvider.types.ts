/* import type { ReactNode } from 'react';
import type { CaseReducerActions } from '@reduxjs/toolkit';
import type { Session, ShippingMethod } from '@ducati/types';

import type { slice } from './CartProvider.slice';
import { AddressData, CartEntryData, CartProps } from '@ducati/ui';

export type CaseReducers = typeof slice.caseReducers;

export type Context = CartProps & {
  actions: CaseReducerActions<CaseReducers, 'cart'>;
  addItem: (cartItem: CartEntryData) => Promise<CartEntryData>;
  deleteItem: (cartItem: CartEntryData) => Promise<CartProps>;
  setShippingAddress: (
    shippingAddress: AddressData,
  ) => Promise<ShippingMethod[] | null>;
  updateQuantity: (cartItem: CartEntryData) => Promise<CartProps>;
  setCart: (cart: CartProps) => void;
};

export type CartProviderProps = {
  children: ReactNode;
  initialState?: CartProps;
};

export type ApiResponse = {
  cart: CartProps;
  shippingMethods?: ShippingMethod[];
  session: Session;
};
 */