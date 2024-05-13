import { FormEvent } from 'react';
import type { AddressData } from '../../../../../types';
import type { ShippingMethod, ShippingMethodsProps } from '../CheckoutShippingMethod';
import { CartData } from '@ducati/types';

export type CheckoutShippingProps = {
  checkoutShippingMethods?: ShippingMethodsProps;
  addresses: AddressData[];
  sendForm?: (form: FormEvent<HTMLFormElement>) => void;
  sendAddress?: (form: AddressData) => void;
  sendShippingMethod?: (form: ShippingMethod) => void;
  cart: CartData;
  isLoading?: boolean;
};
