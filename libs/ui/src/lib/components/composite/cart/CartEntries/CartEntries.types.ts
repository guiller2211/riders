import type { CartEntryData } from '../../../../types';

export type CartEntriesProps = {
  entries: CartEntryData[];
  viewCart: 'ReadOnly' | 'MiniCart' | 'RecentlyAdded' | undefined;
};
