import type {
  AbstractOrderData,
  AbstractOrderEntryData,
} from './AbstractOrderData.types';

export interface CartData extends AbstractOrderData {
  promotions?: string[];
  entries: CartEntryData[];
}

export interface CartEntryData extends AbstractOrderEntryData {
  readOnly?: boolean; // FE only
}
