import { CreditCardPaymentInfo, Resource, ShippingMethod } from '@ducati/types';
import type { AddressData } from './AddressData.types';
import type { PriceData } from './PriceData.types';
import type { ProductData } from './ProductData.types';
import type { ShippingInfo } from './ShippingInfo.types';
import type { UserData } from './UserData.types';
import { PaymentProps } from '../components';

export interface AbstractOrderData  extends Resource {
  code?: string;
  poNumber?: string;
  numOrder?: string;
  deliveryCost?: PriceData;
  user?: UserData;
  shippingAddress?: AddressData;
  billingAddress?: AddressData;
  shippingInfo?: ShippingInfo;
  deliveryMode?: string; // DeliveryMode type
  OrderStatus?: string; // OrderStatus type
  totalDiscounts?: PriceData;
  totalItems?: number;
  subTotal?: PriceData;
  totalPriceWithTax?: PriceData;
  shippingTotal?: PriceData;
  paymentInfo?: CreditCardPaymentInfo;
  shippingMethod?: ShippingMethod;
  paymentMethod?: PaymentProps
  totalPrice?: PriceData;
}

export interface OrderStatus {
  name: string;
  data: OrderStatusData;
}

export interface OrderStatusData {
  badgeColor: 'primary' | 'positive' | 'critical' | undefined;
}

export interface AbstractOrderEntryData {
  entryId?: string;
  entryNumber: number;
  product?: ProductData;
  quantity: number;
  basePrice?: PriceData;
  discounts?: PriceData;
  totalPrice?: PriceData;
}
