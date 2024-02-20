import React, { useState } from 'react';

import { Button, TextField, View } from '../../../../../atomic';
import type { AppliedCouponsProps } from './AppliedCoupons.types';

const AppliedCoupons = (props: AppliedCouponsProps) => {
  const [value, setValue] = useState('');

  const handleSubmitAddCoupon = () => {
    if (!value.trim()) {
      return setValue('');
    }
    props.addCoupon(value);
    setValue('');
  };

  return (
    <View>
      <View direction="row" paddingBottom={4} gap={4}>
        <View.Item columns={9}>
          <TextField
            name="Code"
            placeholder="Enter Promo Code"
            size="large"
            value={value}
            onChange={(e) => setValue(e.value)}
          />
        </View.Item>
        <View.Item columns={3}>
          <Button color="primary" size="large" onClick={handleSubmitAddCoupon}>
            Apply
          </Button>
        </View.Item>
      </View>
    </View>
  );
};

export default AppliedCoupons;
