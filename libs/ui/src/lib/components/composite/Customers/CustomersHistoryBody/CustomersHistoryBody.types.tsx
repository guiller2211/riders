import { Customer } from '@backoffice/types';
import { FormEvent } from 'react';

export type CustomersHistoryBodyProps = {
  users?: Customer[];
  searchTerm: string;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
