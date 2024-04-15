import { ProductData } from '@backoffice/types';
import { FormEvent } from 'react';

export type ProductHistoryProps = {
  products?: ProductData[];
  isLoading?: boolean;
  success?: boolean;
  notification?: string;
  categories?: any;
  sendProduct: (product: ProductData) => void;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
