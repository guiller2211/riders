import type { ReactNode } from 'react';
import type { CaseReducerActions } from '@reduxjs/toolkit';

import type { slice } from './UserProvider.slice';
import { AddressData, Session, UserProps } from '@ducati/types';

export type CaseReducers = typeof slice.caseReducers;

export type Context = UserProps & {
  actions: CaseReducerActions<CaseReducers, 'user'>;
  getAddressCustomer: (uid: string) => Promise<AddressData[]>;
  setAddress: (formData: FormData, customerUID: string) => Promise<AddressData[]>;
  deleteAddress: (uid: string, customerUID: string) => Promise<AddressData[]>;
};

export type UserProviderProps = {
  children: ReactNode;
  initialState?: UserProps;
};

export type ApiResponse = {
  user: UserProps;
  error: Error;
  session: Session;
};
