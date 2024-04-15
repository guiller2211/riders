import type { CouponProps } from '../Coupon.types';

export type CouponCodeProps = {
  couponItems?: CouponProps[];
  isReadOnly?: boolean;
  removeCoupon: (value: number) => void;
};
