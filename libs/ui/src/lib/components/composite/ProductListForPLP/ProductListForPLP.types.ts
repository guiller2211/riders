import { Product } from "@ducati/types";
import { FormEvent } from "react";

export type ProductListForPLPProps = {
  products?: Product[];
  isLoading?: boolean;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
