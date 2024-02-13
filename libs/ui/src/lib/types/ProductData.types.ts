import type { ImageProps } from 'reshaped';


export type ProductData = {
  image?: ImageProps;
  productUrl?: string;
  name?: string;
  sku?: string;
  brand?: string;
  stock?: number;
};
