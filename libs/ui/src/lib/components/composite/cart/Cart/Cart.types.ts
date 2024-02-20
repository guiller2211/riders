import type { CartData } from '../../../../types';
import type { OrderSummaryProps } from '../OrderSummary';

export type CartProps = {
  cart: CartData;
  summary: OrderSummaryProps;
};
