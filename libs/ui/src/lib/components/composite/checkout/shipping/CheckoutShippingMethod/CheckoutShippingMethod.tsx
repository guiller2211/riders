import { useEffect, useState, useMemo } from 'react';

import {
  CarouselItem,
  GenericCarousel,
} from '../../../shared/utils/GenericCarousel';
import { findById } from '../../../../../utils';
import { View, Text } from '../../../../atomic';
import CheckoutShippingMethodCard from '../CheckoutShippingMethodCard/CheckoutShippingMethodCard';
import type {
  ShippingMethodsProps,
} from './CheckoutShippingMethod.types';
import { ShippingMethod } from '@riders/types';


const CheckoutShippingMethod = (props: ShippingMethodsProps) => {
  const { methods, cart, onChangeShippingMethod, ...rest } = props;

  const getShippingMethod = () => {
    return methods && methods.length > 0 ? methods[0] : null;
  };

  const value = useMemo(() => {
    return getShippingMethod();
  }, [cart, methods]);

  const onChangeHandler = (method: ShippingMethod) => {
    if (onChangeShippingMethod) {
      onChangeShippingMethod(method);
    }
  };

  if (!methods?.length) return null;

  return (
    <View direction="row" paddingTop={10} paddingStart={6} width="100%">
      <View.Item columns={12}>
        <Text variant="body-2" weight="bold">
          Método de envío
        </Text>
        <GenericCarousel onChange={onChangeHandler} {...rest}>
          {methods &&
            methods.map((method) => {
              const { id } = method;
              return (
                <CarouselItem key={id} value={method}>
                  <CheckoutShippingMethodCard
                    shippingMethod={method}
                    isSelected={value?.id === method.id}
                  />
                </CarouselItem>
              );
            })}
        </GenericCarousel>
      </View.Item>
    </View>
  );
};

export default CheckoutShippingMethod;
