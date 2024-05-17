import type { PaymentProps } from '../..';

export type CheckoutPaymentProps = {
  isDefaultCheck: boolean;
  isShippingAddress: boolean;
  payments: PaymentProps[];
  preferenceId?: string;
  totalAmount?: number;
};
