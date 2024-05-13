import type { TextProps } from 'reshaped';

import type { AddressData, ShippingInfo } from '../types';
import { Price } from '../components';
import { Text, View } from 'reshaped';
import { getFormatAddressPrevious } from './formatChekout-utils';

export const showShippingInformation = (
  address?: AddressData,
  shippingInfo?: ShippingInfo,
  translate?: string,
) => {
  const addressText = address ? getFormatAddressPrevious(address) : '';
  const priceText: TextProps = {
    color: 'neutral',
    weight: 'regular',
    variant: 'body-2',
  };
  return (
    <View direction="row" align="center">
      {/*  {addressText} &nbsp;
      {shippingInfo?.shippingMethodPrice?.centsAmount &&
      shippingInfo?.shippingMethodPrice?.centsAmount > 0 ? (
        <Price
          locale={shippingInfo?.shippingMethodPrice.currency.isocode}
          text={priceText}
          value={shippingInfo?.shippingMethodPrice}
        />
      ) : (
        translate
      )}{' '}
      <View.Item>
        <Text variant="body-2" weight="regular">
          &nbsp;{shippingInfo?.shippingMethodName}
        </Text>
      </View.Item> */}
    </View>
  );
};
