import { AddressData } from '@riders/types';
import type { FormEvent } from 'react';

import type { ViewProps } from 'reshaped';

export type AddressFormProps = ViewProps & {
  isBilling?: boolean;
  initialValues?: AddressData;
  onSubmit?: (form: FormEvent<HTMLFormElement>) => void;
  sendForm?: (form: FormEvent<HTMLFormElement>) => void;
};
