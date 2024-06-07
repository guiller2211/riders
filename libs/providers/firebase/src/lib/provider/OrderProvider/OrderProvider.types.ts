import type { ReactNode } from 'react';
import type { CaseReducerActions } from '@reduxjs/toolkit';

import type { slice } from './OrderProvider.slice';
import { OrderData } from '@ducati/ui';

export type CaseReducers = typeof slice.caseReducers;

export type Context = OrderData & {
  actions: CaseReducerActions<CaseReducers, 'order'>;
  getCustomerOrders: (uid: string) => Promise<OrderData[]>;
  updateStatusOrder: (status: string, uidOrder: string, uidCustomer: string) => Promise<OrderData[]>;
};

export type OrderProviderProps = {
  children: ReactNode;
  initialState?: OrderData;
};

export type ApiResponse = {
  order: OrderData;
};
