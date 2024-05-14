
import type { DeliveryStatus } from '@ducati/types';

import type { PaymentProps, ShippingMethod } from '../../../checkout';
import { OrderEntryData } from '../../../../../types/OrderData.types';
import { OrderStatus } from '../../../../../types/AbstractOrderData.types';

export type OrderPlacedProps = {
  code?: string;
  placeDate: PlaceDateProps;
  entries?: OrderEntryData[];
  billed: BilledProps;
  shipping: ShippingProps;
  shippingMethod: ShippingMethod;
  payment: PaymentProps;
  shippingOn: string;
  deliveryStatus?: DeliveryStatus;
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
