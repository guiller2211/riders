import type { AddressData } from './AddressData.types';
import type { PriceData } from './PriceData.types';
import type { ProductData } from './ProductData.types';
import type { ShippingInfo } from './ShippingInfo.types';
import type { TaxData } from './TaxData.types';
import type { UserData } from './UserData.types';

export interface AbstractOrderData {
  code: string;
  poNumber?: string;
  deliveryCost?: PriceData;
  user?: UserData;
  shippingAddress?: AddressData;
  billingAddress?: AddressData;
  shippingInfo?: ShippingInfo;
  deliveryMode?: string; // DeliveryMode type
  deliveryStatus?: string; // DeliveryStatus type
  totalDiscounts?: PriceData;
  totalItems?: number;
  subTotal?: PriceData;
  totalTax?: TaxData;
  totalPriceWithTax?: PriceData;
  shippingTotal?: PriceData;
}

export interface AbstractOrderEntryData {
  entryId: string;
  entryNumber: number;
  product?: ProductData;
  quantity: number;
  basePrice?: PriceData;
  discounts?: PriceData;
  totalPrice?: PriceData;
}
