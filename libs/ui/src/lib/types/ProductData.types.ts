import { Money } from '@ducati/types';
import type { ImageProps, TextProps, BadgeProps } from 'reshaped';


export type ProductData = {
  image?: ImageProps;
  productUrl?: string;
  name?: string;
  sku?: string;
  brand?: string;
  price: PriceProps;
  stock?: number;
};

export type PriceProps = {
  locale?: string;
  value?: Money;
  discount?: Money;
  badges?: BadgeProps[];
  badgesOnTop?: boolean;
  promotionMessage?: string;
  text?: TextProps | undefined;
};