import { ProductData, } from '@riders/types';

export type ProductCardForPLPProps = {
  product: ProductData;
  sendForm?: (form: string) => void;
  isLoading?: boolean;
  isGridView: boolean;
};
