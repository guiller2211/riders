import { CartData, CartEntry } from "@ducati/types";

export type MiniCartProps = {
  onClose: VoidFunction;
  open: boolean;
  isAdd?: boolean;
  cart?: CartData;
  product?: CartEntry;
};
