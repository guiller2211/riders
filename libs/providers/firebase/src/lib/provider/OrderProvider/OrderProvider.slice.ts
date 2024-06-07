import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OrderData } from '../../../../../../ui/src';


export const INITIAL_STATE: OrderData = {
  entries: [],
};

export const slice = createSlice({
  name: 'order',
  initialState: INITIAL_STATE,
  reducers: {
    updateOrder: (_, action: PayloadAction<OrderData>) => {
      return action.payload;
    },
  },
});
