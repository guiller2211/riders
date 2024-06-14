import { ProductData } from "@riders/types";

export type ProductListForPLPProps = {
  products?: ProductData[];
  sendForm?: (form: string) => void;
  isLoading?: boolean;
};
