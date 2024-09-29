import { OrderStatus } from '@riders/types';
import type {
  AbstractOrderData,
  AbstractOrderEntryData,
} from './AbstractOrderData.types';

export interface OrderData extends AbstractOrderData {
  createdDate?: Timestamp;
  guestCustomer?: boolean;
  appliedPromotions?: string[];
  entries?: OrderEntryData[];
  status?: OrderStatus;
}
interface Timestamp {
  seconds: number;
  nanoseconds: number;
}
export type OrderEntryData = AbstractOrderEntryData;
