import { CartData, CartEntry } from "@riders/types";

export type MiniCartProps = {
  onClose: VoidFunction;
  open: boolean;
  isAdd?: boolean;
  cart?: CartData;
  product?: CartEntry;
  handleAction?: (action: 'update' | 'delete', entryId: string, quantity?: number) => Promise<CartEntry | void>;
};
