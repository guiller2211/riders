import type { Resource } from '../resource';
import type { CategoryData } from '../category';
import type { PriceData, PriceSummaryData } from '../price';
import type { ImageData } from '../media';
import { ProductEnum, StockData } from './product-query';
import { User } from '../user';
import { Money } from '../localization';

export interface AbstractProduct extends Resource {
  name?: string;
  description?: string;
  stock?: StockData;
  image?: ImageData[];
  categories?: CategoryData;
  sku?: string;
  productId?: string;
  value?: Money;
  active?: boolean;
  validFrom?: Date;
  validUntil?: Date;
  user?: User;
}

export interface ProductData extends AbstractProduct {
  variants?: ProductVariant[];
  priceSummary?: PriceSummaryData;
}

export interface ProductVariant  {
  id: string
  name?: string;
}
export interface ProductVariantData  {
  [key: string]: string[];
}
