import { CartData, CartEntry } from "@riders/types";

export type CartProps = {
  cart: CartData;
  //summary: OrderSummaryProps;
  handleAction?: (action: 'update' | 'delete', entryId: string, quantity?: number) => Promise<CartEntry | void>;
};
