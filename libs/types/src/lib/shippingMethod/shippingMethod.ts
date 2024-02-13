import type { Price } from '../price';

export interface ShippingMethod {
  id: string;
  name: string;
  price: Price;
  duration: string;
}
