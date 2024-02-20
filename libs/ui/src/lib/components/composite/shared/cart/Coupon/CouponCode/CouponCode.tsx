import { useEffect, useState } from 'react';

import { Link, View } from '../../../../../atomic';
import type { CouponCodeProps } from './CouponCode.types';
import { IconLess } from '../../../../../../icons';

const CouponCode = (props: CouponCodeProps) => {
  const [coupons, setCoupons] = useState(props.couponItems || []);

  useEffect(() => {
    if (props.couponItems) {
      setCoupons(props.couponItems);
    }
  }, [props.couponItems]);

  const removeCoupon = (index: number) => {
    setCoupons(coupons.filter((_, i) => i !== index));
    props.removeCoupon(index);
  };

  return (
    <View>
      {coupons?.map((item, index) => (
        <View paddingBottom={3} key={item.coupon}>
          {props.isReadOnly ? (
            <Link color="primary">{item.coupon}</Link>
          ) : (
            <Link
              color="primary"
              icon={IconLess}
              onClick={() => removeCoupon(index)}
            >
              {item.coupon}
            </Link>
          )}
        </View>
      ))}
    </View>
  );
};

export default CouponCode;
