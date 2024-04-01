import type { ProductData } from './product';
import type { Results } from '../misc';

export enum ProductEnum {
  MOTORCYCLES = 'motorcycles',
  ACCESSORIES = 'accessories',
}
export interface StockData {
  productId: string;
  quantity: number;
  available: boolean;
};

export interface ProductResults extends Results {
  items: ProductData[];
}
