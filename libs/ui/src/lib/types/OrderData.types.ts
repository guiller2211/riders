import { OrderStatus } from '@ducati/types';
import type {
  AbstractOrderData,
  AbstractOrderEntryData,
} from './AbstractOrderData.types';

export interface OrderData extends AbstractOrderData {
  createdDate?: Date;
  guestCustomer?: boolean;
  appliedPromotions?: string[];
  entries?: OrderEntryData[];
  status?: OrderStatus;
}

export type OrderEntryData = AbstractOrderEntryData;
