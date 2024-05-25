import { ProductData } from '@ducati/types';

export type ProductCardForPLPProps = {
  product: ProductData;
  sendForm?: (form: string) => void;
  isLoading?: boolean;
};
