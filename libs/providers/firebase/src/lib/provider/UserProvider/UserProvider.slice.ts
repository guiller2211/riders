import { UserProps } from '@riders/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export const INITIAL_STATE: UserProps = {
  user: {
    addressID: '',
  },
};

export const slice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    updateUser: (_, action: PayloadAction<UserProps>) => {
      return action.payload;
    },
  },
});
