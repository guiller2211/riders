import { CartEntry } from '@ducati/types';

export type CartEntriesProps = {
  entries: CartEntry[];
  viewCart: 'ReadOnly' | 'MiniCart' | 'RecentlyAdded' | undefined;
};
