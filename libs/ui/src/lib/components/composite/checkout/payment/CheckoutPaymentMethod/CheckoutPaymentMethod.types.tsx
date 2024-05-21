import type { CreditCardEnum } from '../../../shared/payment/CreditCardIcon';

export type ChekcoutPaymentMethodProps = {
  methods: PaymentProps[];
  isPayment: (value: boolean) => void;
};

export type PaymentProps = {
  type: CreditCardEnum | string;
  name?: string;
  ending: string;
  month?: string;
  year?: string;
  address?: string;
  expired?: boolean;
  preferred?: boolean;
  firstEights?: string;
};
