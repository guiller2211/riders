import type { AddressData } from '../../../../../types';
import type { ShippingMethodsProps } from '../CheckoutShippingMethod';

export type CheckoutShippingProps = {
  checkoutShippingMethods?: ShippingMethodsProps;
  addresses: AddressData[];
};
