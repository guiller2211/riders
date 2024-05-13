import React from 'react';

import { View } from '../../../../../atomic';
import { Address } from '../../../../shared';
import type { CheckoutAddressCardProps } from './CheckoutAddressCard.types';

const CheckoutAddressCard = (props: CheckoutAddressCardProps) => {

  return (
    <View width="100%">
      <View.Item columns="auto">
        <View width={80} paddingStart={1}>
          <Address address={props.address} isSelected={props.isSelected} sendForm={props.sendForm}/>
        </View>
      </View.Item>
    </View>
  );
};
export default CheckoutAddressCard;
