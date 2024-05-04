import type { CartData } from '../../../../../types';
import type { CheckoutOverviewProp } from '../../../order/checkoutOverview/CheckoutOverview.types';

export type CheckoutReviewOrderProps = {
  isActive: boolean;
  cart: CartData;
  overview: CheckoutOverviewProp;
};
