import { CurrencyData } from "@backoffice/types";

export interface ShippingInfo {
  shippingMethodId?: string;
  shippingMethodTypeId?: string;
  shippingMethodName?: string;
  shippingMethodPrice?: CurrencyData;
}
