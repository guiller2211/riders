import React, { useState } from 'react';

import type { CouponProps } from './Coupon.types';
import { View } from '../../../../atomic';
import AppliedCoupons from './AppliedCoupons';
import CouponCode from './CouponCode';

const Coupon = (props: CouponProps) => {
  const [coupons, setCoupons] = useState(Coupons());

  const addCoupon = (coupon: string) => {
    const newCoupon = {
      coupon: coupon.trim(),
      isReadOnly: true,
    };
    setCoupons([...coupons, newCoupon]);
  };

  const removeCoupon = (index: number) => {
    setCoupons(coupons.filter((_, i) => i !== index));
  };

  return (
    <View>
      <CouponCode
        isReadOnly={props.isReadOnly}
        couponItems={coupons}
        removeCoupon={removeCoupon}
      />
      {!props.isReadOnly && <AppliedCoupons addCoupon={addCoupon} />}
    </View>
  );
};

function Coupons(): CouponProps[] {
  return [
    {
      coupon: 'Promo Code One',
    },
    {
      coupon: 'Promo Code Two',
    },
  ];
}
export default Coupon;
