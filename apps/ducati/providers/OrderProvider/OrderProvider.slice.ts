/* import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { OrderProps } from '../../components';

export const INITIAL_STATE: OrderProps = {
  order: {
    code: '',
    entries: [],
  }
};

export const slice = createSlice({
  name: 'order',
  initialState: INITIAL_STATE,
  reducers: {
    updateOrder: (_, action: PayloadAction<OrderProps>) => {
      return action.payload;
    },
  },
});
 */