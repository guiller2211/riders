import type { FormEvent } from 'react';

export type LoginViewProps = {
  isLoading?: boolean;
  notification?: string;
  showOTP?: boolean;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
