import type {
  AbstractOrderData,
  AbstractOrderEntryData,
} from './AbstractOrderData.types';

export interface OrderData extends AbstractOrderData {
  createdDate?: Date;
  guestCustomer?: boolean;
  appliedPromotions?: string[];
  entries?: OrderEntryData[];
  status?: string;
}

export type OrderEntryData = AbstractOrderEntryData;
