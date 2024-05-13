import type { OrderConfirmationContactProps } from '../OrderConfirmationContact';
import type { OrderConfirmationShippingMethodProps } from '../OrderConfirmationShippingMethod';
import type { OrderConfirmationPaidProps } from '../OrderConfirmationPaid';
import { OrderConfirmationBillToShipToProps } from '../OrderConfirmationBillToShipTo';

export type CheckoutOverviewProps = {
  overview: CheckoutOverviewProp;
  isOrderConfirmationPage?: boolean;
};

export type CheckoutOverviewProp = {
  contact: OrderConfirmationContactProps;
  shipping: OrderConfirmationBillToShipToProps;
  method: OrderConfirmationShippingMethodProps;
  paid: OrderConfirmationPaidProps;
};
