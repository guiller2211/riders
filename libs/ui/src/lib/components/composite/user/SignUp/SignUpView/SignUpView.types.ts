import type { FormEvent } from 'react';

export type SignUpViewProps = {
  isLoading?: boolean;
  success?: boolean;
  notification?: string;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
