import type { FormEvent } from 'react';

export type LoginViewProps = {
  isLoading?: boolean;
  notification?: string;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
