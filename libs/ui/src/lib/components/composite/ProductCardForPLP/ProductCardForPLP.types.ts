import { ProductData } from '@ducati/types';
import { FormEvent } from 'react';


export type ProductCardForPLPProps = {
  product: ProductData;
  isLoading?: boolean;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
