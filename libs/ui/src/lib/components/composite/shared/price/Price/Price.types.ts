import type { Money } from '@ducati/types';
import type { TextProps } from 'reshaped';

export type PriceProps = {
  locale?: string;
  value?: Money;
  discount?: Money;
  badgesOnTop?: boolean;
  promotionMessage?: string;
  text?: TextProps | undefined;
};
