import type { FormEvent } from 'react';

export type LoginFormProps = {
  isLoading?: boolean;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
