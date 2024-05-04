import type { FormEvent } from 'react';

import type { ViewProps } from '../../../../atomic';

export type AddressFormProps = ViewProps & {
  isBilling?: boolean;
  onSubmit?: (form: FormEvent<HTMLFormElement>) => void;
};
