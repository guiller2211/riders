import type { PriceProps } from '../../shared';
export type OrderSummaryProps = {
  showTitle?: boolean;
  showPromotion?: boolean;
  shippingTotal?: PriceProps;
  subTotal?: PriceProps;
  total?: PriceProps;
};

type SalesTaxProps = {
  name: string;
  rate: number;
  amount: PriceProps;
};
