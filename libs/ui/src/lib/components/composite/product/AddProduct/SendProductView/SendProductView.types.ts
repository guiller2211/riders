import type { FormEvent } from 'react';

export type SendProductViewProps = {
  isLoading?: boolean;
  success?: boolean;
  notification?: string;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
