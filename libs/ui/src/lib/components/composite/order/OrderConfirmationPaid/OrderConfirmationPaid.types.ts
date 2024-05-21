import type { CreditCardEnum } from '../../shared';

export type OrderConfirmationPaidProps = {
  name: string;
  month?: string;
  year?: string;
  type: CreditCardEnum | string;
  ending: string;
  endingIn?: string;
  expiresIn?: string;
};
