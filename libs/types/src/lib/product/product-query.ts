import type { ProductData, ProductVariant } from './product';
import type { Results } from '../misc';

export enum ProductEnum {
  GUANTES = 'guantes',
  POLERA = 'polera',
  CASCOS = 'cascos',
  ACCESORIOS = 'accesorios',
}

export interface StockData {
  productId: string;
  quantity: number;
  available: boolean;
};

export interface ProductResults extends Results {
  items: ProductData[];
}
