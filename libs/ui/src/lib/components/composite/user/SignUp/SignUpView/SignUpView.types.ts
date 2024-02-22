import type { FormEvent } from 'react';

export type SignUpViewProps = {
  isLoading?: boolean;
  success?: boolean;
  notification?: string;
  titles: any;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
