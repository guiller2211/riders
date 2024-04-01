import type { Money } from '@ducati/types';
import type { TextProps } from 'reshaped';
import { BadgeProps } from '../../utils';

export type PriceProps = {
  locale?: string;
  value?: Money;
  discount?: Money;
  badges?: BadgeProps[];
  badgesOnTop?: boolean;
  promotionMessage?: string;
  text?: TextProps | undefined;
};
