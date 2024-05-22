
import type { CreditCardPaymentInfo, OrderStatus, ShippingMethod } from '@ducati/types';


import { OrderEntryData } from '../../../../../types/OrderData.types';
import { ShippingInfo } from '../../../../../types';

export type OrderPlacedProps = {
  code?: string;
  createdDate: Date;
  entries?: OrderEntryData[];
  shippingInfo: ShippingInfo;
  shippingMethod: ShippingMethod;
  payment: CreditCardPaymentInfo;
  OrderStatus?: OrderStatus;
  orderStatus?: OrderStatus;
};

export type PlaceDateProps = {
  day: string;
  month: string;
  year: string;
};

export type BilledProps = {
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  defaultAddress: boolean;
  valid: boolean;
};

export type ShippingProps = {
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  defaultAddress: boolean;
  valid: boolean;
};
