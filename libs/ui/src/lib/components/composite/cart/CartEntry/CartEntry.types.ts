import { CartEntry } from "@riders/types";

export type CartEntryProps = {
  entry: CartEntry;
  viewCart: 'ReadOnly' | 'MiniCart' | 'RecentlyAdded' | undefined;
  handleAction?: (action: 'update' | 'delete', entryId: string, quantity?: number) => Promise<CartEntry | void>;
};


export type CartActionsProps = {
  entry: CartEntry;
  handleAction?: (action: 'update' | 'delete', entryId: string, quantity?: number) => Promise<CartEntry | void>;
}