import { CartEntry } from "@ducati/types";

export type CartEntryProps = {
  entry: CartEntry;
  viewCart: 'ReadOnly' | 'MiniCart' | 'RecentlyAdded' | undefined;
};
