import { CartData, CartEntry } from "@ducati/types";

export type CartProps = {
  cart: CartData;
  //summary: OrderSummaryProps;
  handleAction?: (action: 'update' | 'delete', entryId: string, quantity?: number) => Promise<CartEntry | void>;
};
