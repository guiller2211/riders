import { FormEvent } from 'react';
import type { AddressData } from '../../../../../types';
import type { ShippingMethod, ShippingMethodsProps } from '../CheckoutShippingMethod';
import { CartData } from '@riders/types';

export type CheckoutShippingProps = {
  checkoutShippingMethods?: ShippingMethodsProps;
  addresses: AddressData[];
  cart: CartData;
  isLoading?: boolean;
  sendForm?: (form: FormEvent<HTMLFormElement>) => void;
  sendAddress?: (form: AddressData) => void;
  sendShippingMethod?: (form: ShippingMethod) => void;
  deleteAddress?: (uid: string) => void;
};
