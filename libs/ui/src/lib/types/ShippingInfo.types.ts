import type { Money } from '@ducati/types';

export interface ShippingInfo {
  shippingMethodId?: string;
  shippingMethodTypeId?: string;
  shippingMethodName?: string;
  shippingMethodPrice?: Money;
}
