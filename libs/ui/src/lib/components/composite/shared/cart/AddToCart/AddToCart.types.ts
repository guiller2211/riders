import { CartEntry, ProductVariant } from "@riders/types";
import { FormEvent } from "react";

export type AddToCartProps = {
  productCode: string;
  stockAvailable: number;
  quantityValue?: number;
  min?: number;
  showInPlp?: boolean;
  isLoading?: boolean;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
  result?: CartEntry;
};

