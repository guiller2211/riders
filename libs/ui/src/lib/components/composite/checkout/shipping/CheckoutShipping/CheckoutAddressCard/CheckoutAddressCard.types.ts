import { FormEvent } from 'react';
import type { AddressData } from '../../../../../../types';

export type CheckoutAddressCardProps = {
  address: AddressData;
  isSelected?: boolean;
  sendForm?: (form: FormEvent<HTMLFormElement>) => void;
  deleteAddress?: (uid: string) => void;
};
