import { Product } from '@ducati/types';
import { FormEvent } from 'react';


export type ProductCardForPLPProps = {
  product: Product;
  isLoading?: boolean;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
