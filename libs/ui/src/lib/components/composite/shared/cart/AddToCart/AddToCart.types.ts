import { CartEntry, TypeVariamEnum } from "@ducati/types";
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
  variant?: Variant[];
};

export type Variant = {
  type: TypeVariamEnum;
  name: string;
}
