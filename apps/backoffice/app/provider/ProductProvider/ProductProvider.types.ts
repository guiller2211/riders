import type { ReactNode } from 'react';
import type { CaseReducerActions } from '@reduxjs/toolkit';

import type { slice } from './ProductProvider.slice';
import { ProductData } from '@backoffice/types';

export type CaseReducers = typeof slice.caseReducers;

export type Context = ProductData & {
  actions: CaseReducerActions<CaseReducers, 'product'>;
  addProduct: (formData: FormData) => Promise<{ success: true; message: string; error?: undefined; } | { success: false; message: string; error: unknown; }>;
  deleteProduct: (uid: string) => Promise<{ success: boolean; message: string; } | undefined>;
  updateProduct: (formData: FormData) => Promise<null>;
};

export type ProductProviderProps = {
  children: ReactNode;
  initialState?: ProductData;
};


