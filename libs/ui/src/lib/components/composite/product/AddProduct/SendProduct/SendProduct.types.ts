import type { FormEvent } from 'react';

export type SendProductProps = {
  isLoading?: boolean;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
