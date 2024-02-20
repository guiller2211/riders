import type { OrderData } from '../../../../types';
import type { OrderSummaryProps } from '../OrderSummary';

export type OrderProps = {
  order: OrderData;
  summary: OrderSummaryProps;
};
