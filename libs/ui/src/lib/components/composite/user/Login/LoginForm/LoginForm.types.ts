import type { FormEvent } from 'react';

export type LoginFormProps = {
  isLoading?: boolean;
  showOTP?: boolean;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
