import { ProductData } from "@ducati/types";
import { FormEvent } from "react";

export type ProductListForPLPProps = {
  products?: ProductData[];
  isLoading?: boolean;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
