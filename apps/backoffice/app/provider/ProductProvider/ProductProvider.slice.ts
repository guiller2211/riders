import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CurrencySymbolPosition, ProductData } from '@backoffice/types';

export const INITIAL_STATE: ProductData = {
  id: '',
  name: '',
  description: '',
  categories: {
    id: '',
    name: '',
  },
  variants: [
    {
      id: '',
      name: ''
    },
    {
      id: '',
      name: ''
    }
  ],
  value: {
    centsAmount: 0,
    currency: {
      isocode: 'CHL',
      name: 'CHL',
      symbol: 'CHL',
      symbolPosition: CurrencySymbolPosition.BEFORE,
      decimalPlaces: 2,
    }
  },
  sku: '',
  image: [{
    id: '',
    url: '',
    label: '',
    dimensions: {
      width: 350,
      height: 350
    },
    default: false
  }],
  stock: {
    productId: '',
    available: true,
    quantity: 0,
  },
  active: false
};

export const slice = createSlice({
  name: 'product',
  initialState: INITIAL_STATE,
  reducers: {
    updateCart: (_, action: PayloadAction<ProductData>) => {
      return action.payload;
    },
  },
});
