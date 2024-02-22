import type { FormEvent } from 'react';

export type SignUpFormProps = {
  titles: any[]; // TO DO: Change to Type.
  isLoading?: boolean;
  sendForm: (form: FormEvent<HTMLFormElement>) => void;
};
