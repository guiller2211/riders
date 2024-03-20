import { CartProps } from '@ducati/ui';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const INITIAL_STATE: CartProps = {
  cart: {
    code: '',
    entries: [],
  }
};

export const slice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    updateCart: (_, action: PayloadAction<CartProps>) => {
      return action.payload;
    },
  },
});
