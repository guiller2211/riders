import { Cart, Session } from '@ducati/types';

import type { CartEntryData } from '../../../../types';

export type CartEntryProps = {
  entry: CartEntryData;
  viewCart: 'ReadOnly' | 'MiniCart' | 'RecentlyAdded' | undefined;
};
