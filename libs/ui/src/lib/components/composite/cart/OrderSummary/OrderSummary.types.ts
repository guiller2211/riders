export type OrderSummaryProps = {
  showTitle?: boolean;
  showPromotion?: boolean;
  shippingTotal?: any;
  salesTax?: SalesTaxProps;
  subTotal?: any;
  total?: any;
};

type SalesTaxProps = {
  name: string;
  rate: number;
  amount: any;
};
