import type { PriceData } from '../price';

export interface ShippingMethod {
  id: string;
  name: string;
  price: PriceData;
  duration: string;
}
