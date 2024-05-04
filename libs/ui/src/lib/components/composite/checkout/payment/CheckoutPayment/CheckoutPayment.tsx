import { useState } from 'react';

import { Accordion, Button, Icon, Tabs, Text, View } from '../../../../atomic';
import { CheckoutPaymentForm, CheckoutPaymentMethod } from '../..';
import { IconLockFill } from '../../../../../icons';
import type { CheckoutPaymentProps } from './CheckoutPayment.types';
import { useResponsiveClientValue } from '../../../../../hooks'
import { AppRoutes } from '@ducati/types';
export const CheckoutPayment = (props: CheckoutPaymentProps) => {
  const { payments, isDefaultCheck, isShippingAddress } = props;
  const [activeValue, setActiveValue] = useState(false);

  const [isPayment, setIsPayment] = useState(payments?.length > 0);
  const isPaymentClick = (value: boolean) => {
    setIsPayment(!value);
  };

  return (
    <View
      borderRadius="small"
      borderColor="neutral"
      padding={8}
      backgroundColor={!activeValue ? 'white' : 'disabled'}
    >
      <Accordion
        onToggle={(active: boolean) => setActiveValue(!active)}
        defaultActive
      >
        <Accordion.Trigger>
          <View direction="row" gap={4}>
            <Text variant="featured-3">2</Text>
            <Text variant="featured-3">
              Pago
            </Text>
          </View>
        </Accordion.Trigger>

        <Accordion.Content>
          <View gap={5} padding={useResponsiveClientValue({ s: 0, m: 8 })} paddingTop={useResponsiveClientValue({ s: 10 })}>
            <Tabs defaultValue="1">
              <View
                direction="row"
                paddingBottom={8}
                gap={useResponsiveClientValue({ s: 6, l: 6 })}
              >
                <View.Item columns={useResponsiveClientValue({ s: 12, l: 8 })}>
                  <Tabs.List>
                    <Tabs.Item value="1">
                      Tarjetas
                    </Tabs.Item>
                  </Tabs.List>
                </View.Item>

                <View.Item columns={useResponsiveClientValue({ s: 12, l: 4 })}>
                  <Text variant="caption-1">
                    <View
                      direction="row"
                      justify={useResponsiveClientValue({ s: 'start', l: 'end' })}
                      gap={2}
                    >
                      <Icon
                        svg={IconLockFill}
                        color="positive"
                        size={4.5}
                      />
                      <View.Item>
                        Seguro y Encriptado
                      </View.Item>
                    </View>
                  </Text>
                </View.Item>
              </View>

              <Tabs.Panel value="1">
                {isPayment ? (
                  <CheckoutPaymentMethod
                    isPayment={isPaymentClick}
                    methods={payments}
                  />
                ) : (
                  <CheckoutPaymentForm isDefaultCheck={isDefaultCheck}/>
                )}
              </Tabs.Panel>

              <View.Item columns={12}>
                <Button
                  href={AppRoutes.CheckoutReviewOrder}
                  color="primary"
                  size="xlarge"
                  fullWidth
                >
                  Continuar a Revision de Orden
                </Button>
              </View.Item>
            </Tabs>
          </View>
        </Accordion.Content>
      </Accordion>
    </View>
  );
};

