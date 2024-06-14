import { FormEvent } from 'react';
import type { PaymentProps } from '../..';
import { CartData } from '@riders/types';

export type CheckoutPaymentProps = {
  isDefaultCheck: boolean;
  isShippingAddress: boolean;
  payments: PaymentProps[];
  preferenceId?: string;
  cart?: CartData;
  sendForm?: (form: PaymentProps) => void;
};
