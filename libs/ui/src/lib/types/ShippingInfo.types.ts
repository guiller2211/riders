import { CurrencyData } from "@ducati/types";

export interface ShippingInfo {
  shippingMethodId?: string;
  shippingMethodTypeId?: string;
  shippingMethodName?: string;
  shippingMethodPrice?: CurrencyData;
}
