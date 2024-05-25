import { ProductData } from "@ducati/types";

export type ProductListForPLPProps = {
  products?: ProductData[];
  sendForm?: (form: string) => void;
  isLoading?: boolean;
};
