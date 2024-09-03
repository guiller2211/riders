import { ProductData } from '@riders/types';
import { ButtonProps } from 'reshaped';

export type ProductCardForPLPProps = {
  product: ProductData;
  sendForm?: (form: string) => void;
  isLoading?: boolean;
  isGridView: boolean;
};
