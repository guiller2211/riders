import type { FormEvent } from 'react';

export type SignUpFormProps = {
  isLoading?: boolean;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
