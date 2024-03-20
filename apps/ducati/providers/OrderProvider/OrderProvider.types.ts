/* import type { ReactNode } from 'react';
import type { CaseReducerActions } from '@reduxjs/toolkit';
import type { Session } from '@ducati/types';

import type { slice } from './OrderProvider.slice';
import type { CartProps, OrderProps } from '../../components';

export type CaseReducers = typeof slice.caseReducers;

export type Context = OrderProps & {
  actions: CaseReducerActions<CaseReducers, 'order'>;
  createFromCart: (pONumber: string) => Promise<OrderProps>;
};

export type OrderProviderProps = {
  children: ReactNode;
  initialState?: OrderProps;
};

export type ApiResponse = {
  order: OrderProps;
  cart: CartProps;
  session: Session;
};
 */