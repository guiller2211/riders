import { FormEvent } from 'react';
import type { AddressData } from '../../../../../types';

export type AddressProps = {
  address: AddressData;
  canModify?: boolean;
  isDefault?: boolean;
  isSelected?: boolean;
  sendForm?: (form: FormEvent<HTMLFormElement>) => void;
  selectDefault?: (addressFormData: AddressData) => void;
  deleteAddress?: (uid: string) => void;
};
