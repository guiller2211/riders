import type { ImageProps } from 'reshaped';

import type { Resource } from '../resource';
import type { User } from '../user';
import type { AddressData } from '../user/address';
import type {  DeliveryCostData, PriceData } from '../price';
import { ProductData } from '@ducati/types';

export enum DeliveryStatus {
  InProcess = 'In process',
  Approved = 'Approved',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
}

export interface Order extends AbstractOrder {
  lineItems: OrderEntry[];
}

export interface AbstractOrder extends Resource {
  poNumber?: string; // new field
  deliveryCost?: DeliveryCostData;
  email?: string;
  customer?: User;
  shippingAddress?: AddressData; // Address type
  billingAddress?: AddressData; // Address type
  shippingMode?: string;
  /* shippingInfo?: OrderShippingInfo; */
  deliveryStatus?: DeliveryStatus;
  orderStatus?: string;
  state?: OrderState;
  paymentInfo?: CreditCardPaymentInfo;
  createdAt?: string;
  deliveryMode?: string; // DeliveryMode type
  totalDiscounts?: PriceData;
  totalItems?: number;
  subTotal?: PriceData;
  totalPriceWithTax?: PriceData;
  shippingTotal?: PriceData;
  totalPrice?: PriceData;
}

export interface OrderState {
  typeId: string;
  id: string;
}

export interface CreditCardPaymentInfo {
  billingName: string;
  ccNoEnding: string;
  expMonth: string;
  expYear: string;
  type: string;
}



export interface OrderEntry extends AbstractOrderEntry {
  readOnly?: boolean; // FE only
}

export interface AbstractOrderEntry extends Resource {
  entryId?: string;
  entryNumber: number;
  product?: ProductData;
  quantity: number;
  basePrice?: PriceData;
  discounts?: PriceData;
  totalPrice?: PriceData;
}

export interface OrderProduct {
  image?: ImageProps;
  productUrl?: string;
  name?: string;
  sku?: string;
  brand?: string;
  price: PriceData;
  stock?: number;
}

export interface CartShippingMethod {
  typeId: string;
  id: string;
}
