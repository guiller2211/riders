import type { ImageProps } from 'reshaped';

import type { CartAction } from '../cart';
import type { Resource } from '../resource';
import type { User } from '../user';
import type { Address } from '../user/address';
import type { Money } from '../localization/currency';
import type { CartProductPrice, Price } from '../price';

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
  deliveryCost?: Price;
  email?: string;
  customer?: User;
  shippingAddress?: Address; // Address type
  billingAddress?: Address; // Address type
  shippingMode?: string;
  shippingInfo?: OrderShippingInfo;
  deliveryStatus?: DeliveryStatus;
  orderStatus?: string;
  state?: OrderState;
  paymentInfo?: CreditCardPaymentInfo;
  summary?: OrderSummary;
  createdAt?: string;
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

export type OrderSummary = AbstractOrderSummary;

export interface AbstractOrderSummary {
  totalDiscounts?: Price;
  totalItems?: number;
  subTotal?: Price;
  totalTax?: Price;
  totalPriceWithTax?: Price;
  shippingTotal?: Price;
}

export interface OrderEntry extends AbstractOrderEntry {
  readOnly?: boolean; // FE only
}

export interface AbstractOrderEntry extends Resource {
  entryNumber: number;
  product?: OrderProduct;
  quantity: number;
  basePrice?: Price;
  discounts?: Price;
  totalPrice?: Price;
}

export interface OrderProduct {
  image?: ImageProps;
  productUrl?: string;
  name?: string;
  sku?: string;
  brand?: string;
  price: CartProductPrice;
  stock?: number;
}

export interface OrderShippingInfo {
  shippingMethodName: string;
  price: Money;
  shippingRate: Money;
  shippingMethod?: CartShippingMethod;
  taxedPrice: CartShippingTaxedPrice;
  shippingMethodState: string;
}

export interface CartShippingMethod {
  typeId: string;
  id: string;
}

export interface CartShippingTaxedPrice {
  totalNet?: Money;
  totalGross?: Money;
  totalTax?: Money;
}

export interface CreateFromCartAction extends CartAction {
  createFromCart: CreateFromCartRequest;
}

export interface CreateFromCartRequest {
  pONumber: string;
}
