import { ProductData } from '@backoffice/types';
import { FormEvent } from 'react';

export type ProductsHistoryBodyProps = {
  products?: ProductData[];
  categories?: any;
  isLoading?: boolean;
  searchTerm: string;
  sendProduct: (product: ProductData) => void;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
