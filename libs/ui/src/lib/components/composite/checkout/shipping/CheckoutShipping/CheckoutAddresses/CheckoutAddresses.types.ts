import { FormEvent } from 'react';
import type { AddressData } from '../../../../../../types';
import type { GenericCarouselProps } from '../../../../shared';

export type CheckoutAddressesProps = Omit<
  GenericCarouselProps<AddressData>,
  'children'
> & {
  addresses: AddressData[];
  onChangedToForm: VoidFunction;
  cart?:any;
  onChangeAddress: (AddressData: AddressData) => void;
  sendForm?: (form: FormEvent<HTMLFormElement>) => void;
  deleteAddress?: (uid: string) => void;
};
