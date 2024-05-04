import type { ShippingMethod } from '../CheckoutShippingMethod/CheckoutShippingMethod.types';

export type CheckoutShippingMethodCardProps = {
  isSelected?: boolean;
  shippingMethod: ShippingMethod;
};
