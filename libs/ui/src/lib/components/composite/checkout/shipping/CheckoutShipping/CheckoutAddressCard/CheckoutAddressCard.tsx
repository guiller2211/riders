import React from 'react';

import { View } from '../../../../../atomic';
import { Address } from '../../../../shared';
import type { CheckoutAddressCardProps } from './CheckoutAddressCard.types';

const CheckoutAddressCard = (props: CheckoutAddressCardProps) => {
  const { address, deleteAddress, isSelected, sendForm } = props;
  return (
    <View width="100%">
      <View.Item columns="auto">
        <View width={80} paddingStart={1}>
          <Address
            address={address}
            isSelected={isSelected}
            sendForm={sendForm}
            deleteAddress={deleteAddress} />
        </View>
      </View.Item>
    </View>
  );
};
export default CheckoutAddressCard;
