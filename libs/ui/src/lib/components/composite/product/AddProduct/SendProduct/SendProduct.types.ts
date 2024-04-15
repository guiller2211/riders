import { ProductData } from '@backoffice/types';
import type { FormEvent } from 'react';

export type SendProductProps = {
  isLoading?: boolean;
  categories?: any;
  dataProduct?: ProductData;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
