import type { ImageProps } from 'reshaped';

import type { Resource } from '../resource';
import type { User } from '../user';
import type { AddressData } from '../user/address';
import type {  DeliveryCostData, PriceData } from '../price';
import { Money, ProductData } from '@riders/types';
import { CreditCardEnum, PaymentProps } from '@riders/ui';

export enum OrderStatus {
  InProcess = 'Procesando',
  Approved = 'Aprobado',
  Shipped = 'Enviado',
  Delivered = 'Entregado',
  Declined = 'Declinado',
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
  shippingMethod?: OrderShippingInfo;
  OrderStatus?: OrderStatus;
  state?: OrderState;
  paymentInfo?: CreditCardPaymentInfo;
  paymentMethod?: PaymentProps
  createdAt?: string;
  deliveryMode?: string; // DeliveryMode type
  totalDiscounts?: PriceData;
  totalItems?: number;
  subTotal?: PriceData;
  totalPriceWithTax?: PriceData;
  shippingTotal?: PriceData;
  totalPrice?: PriceData;
}

export interface OrderShippingInfo {
  id: string;
  name: string;
  price: PriceData;
  duration: string;
}

export interface OrderState {
  typeId: string;
  id: string;
}

export interface CreditCardPaymentInfo {
  type: CreditCardEnum;
  name?: string;
  ending: string;
  month?: string;
  year?: string;
  address?: string;
  expired?: boolean;
  preferred?: boolean;
  firstEights?: string;
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
