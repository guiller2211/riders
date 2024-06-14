import { CartEntry } from '@riders/types';

export type CartEntriesProps = {
  entries: CartEntry[];
  viewCart: 'ReadOnly' | 'MiniCart' | 'RecentlyAdded' | undefined;
  handleAction?: (action: 'update' | 'delete', entryId: string, quantity?: number) => Promise<CartEntry | void>;
};
