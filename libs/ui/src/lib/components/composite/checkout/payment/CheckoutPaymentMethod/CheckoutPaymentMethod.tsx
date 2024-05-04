import React, { useEffect, useRef, useState } from 'react';
import type { InstanceRef } from 'reshaped/components/Carousel/Carousel.types';

import {
  Button,
  Card,
  Carousel,
  Icon,
  Tabs,
  Text,
  View,
} from '../../../../atomic';
import {
  IconArrowLeft,
  IconArrowRight,
  IconPencil,
  IconSquareFill,
} from '../../../../../icons';
import type {
  ChekcoutPaymentMethodProps,
  PaymentProps,
} from './CheckoutPaymentMethod.types';
import { CreditCardIcon } from '../../../shared';

export const CheckoutPaymentMethod = (props: ChekcoutPaymentMethodProps) => {

  const carouselRef = useRef<InstanceRef>();
  const [value, setValue] = React.useState('0');
  const [previousValue, setPreviousValue] = React.useState('0');
  const [isPayment, setIsPayment] = useState(true);

  const updateCarouselFocus = () => {
    if (+value > +previousValue) carouselRef.current?.navigateForward();
    else if (+value < +previousValue) carouselRef.current?.navigateBack();
  };
  const navigateForward = (step: string) => {
    if (+step > 0) setValue((+step - 1).toString());

    carouselRef.current?.navigateBack();
  };
  const navigateBack = (step: string) => {
    if (props.methods && +step < props.methods.length - 1)
      setValue((+step + 1).toString());

    carouselRef.current?.navigateForward();
  };
  useEffect(() => {
    setPreviousValue(value);
    updateCarouselFocus();
  }, [value]);

  return (
    <View direction="row" paddingStart={6} width="100%">
      <View.Item columns={12}>
        <Carousel instanceRef={carouselRef} navigationDisplay="hidden">
          <Tabs value={value} onChange={({ value }) => setValue(value)}>
            <Tabs.List>
              {props.methods?.map(
                (paymentMethod: PaymentProps, index: number) => (
                  <Tabs.Item value={`${index}`} key={index}>
                    <View paddingStart={1}>
                      <Card padding={0} selected={value === `${index}`}>
                        <View
                          paddingBlock={2}
                          paddingInline={6}
                          backgroundColor={
                            value === `${index}` ? 'primary-faded' : 'white'
                          }
                        >
                          <View direction="row" paddingBottom={10}>
                            <CreditCardIcon type={paymentMethod.type} />
                            <View.Item gapBefore="auto">
                              <Button icon={IconPencil} variant="ghost" />
                            </View.Item>
                          </View>
                          <View direction="row">
                            <Text variant="featured-3" weight="bold">
                              {paymentMethod.name}
                            </Text>
                          </View>
                          <View direction="row">
                            <View.Item>
                              <Text variant="body-3">
                                Temrinado en {paymentMethod.ending}
                              </Text>
                            </View.Item>
                            <View.Item>
                              <Text variant="body-3">
                                &ndash;{' '}
                                Expirado en {paymentMethod.month} {paymentMethod.year}
                              </Text>
                            </View.Item>
                          </View>
                        </View>
                      </Card>
                    </View>
                  </Tabs.Item>
                ),
              )}
            </Tabs.List>
            <View.Item columns={12}>
              <Button
                icon={IconSquareFill}
                variant="ghost"
                color="primary"
                onClick={() => props.isPayment(isPayment)}
              >
                Agregar Nueva Direccion
              </Button>
            </View.Item>
          </Tabs>
        </Carousel>

        <View
          gap={3}
          align="end"
          justify="end"
          direction="row"
          width="100%"
          paddingTop={5}
        >
          <Button
            size="xlarge"
            rounded
            color={+value === 0 ? 'neutral' : 'primary'}
            variant="outline"
            onClick={() => navigateForward(value)}
          >
            <Icon autoWidth svg={IconArrowLeft} />
          </Button>
          <Button
            size="xlarge"
            rounded
            color={+value === props.methods?.length ? 'neutral' : 'primary'}
            variant="outline"
            onClick={() => navigateBack(value)}
          >
            <Icon autoWidth svg={IconArrowRight} />
          </Button>
        </View>
      </View.Item>
    </View>
  );
};
