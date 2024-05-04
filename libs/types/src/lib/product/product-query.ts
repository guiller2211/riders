import type { ProductData } from './product';
import type { Results } from '../misc';
import { Resource } from '../resource';

export enum ProductEnum {
  GUANTES = 'guantes',
  POLERA = 'polera',
  CASCOS = 'cascos',
  ACCESORIOS = 'accesorios',
}

export interface StockData extends Resource {
  productId?: string;
  quantity: number;
  available: boolean;
};

export interface ProductResults extends Results {
  items: ProductData[];
}
