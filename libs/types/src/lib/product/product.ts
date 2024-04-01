import type { Resource } from '../resource';
import type { CategoryData } from '../category';
import type { PriceData } from '../price';
import type { ImageData } from '../media';
import { ProductEnum, StockData } from './product-query';

export interface AbstractProduct extends Resource {
  name?: string;
  description?: string;
  stock?: StockData;
  image?: ImageData[];
  categories?: CategoryData;
  price?: PriceData;
  sku?: string;
  type?: ProductEnum;
}

export interface ProductData extends AbstractProduct {}
