import { useState } from 'react';

import { Accordion, Button, Icon, Tabs, Text, View } from '../../../../atomic';
import { CheckoutPaymentForm, CheckoutPaymentMethod } from '../..';
import { IconLockFill } from '../../../../../icons';
import { useTranslation } from '../../../../../hooks';
import type { CheckoutPaymentProps } from './CheckoutPayment.types';

const CheckoutPayment = (props: CheckoutPaymentProps) => {
  const { payments, isDefaultCheck, isShippingAddress } = props;
  const translate = useTranslation();
  const [activeValue, setActiveValue] = useState(false);

  // PCA-81: Why do we need state for payment?
  const [isPayment, setIsPayment] = useState(payments?.length > 0);
  const isPaymentClick = (value: boolean) => {
    setIsPayment(!value);
  };

  // PCA-81: A form should submit a HTTP POST to /checkout/payment - See comment in checkout-actions.tsx
  // PCA-81: Upon successful response, update the cart summary state via setCartSummary

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
              {translate('payment.title', 'checkoutPayment')}
            </Text>
          </View>
        </Accordion.Trigger>

        <Accordion.Content>
          <View padding={{ s: 0, m: 8 }} paddingTop={{ s: 10 }}>
            <View direction="row">
              <View.Item columns={12}>
                <View paddingBottom={6}>
                  <Tabs defaultValue="1">
                    <View
                      direction="row"
                      paddingBottom={8}
                      gap={{ s: 6, l: 0 }}
                    >
                      <View.Item columns={{ s: 12, l: 8 }}>
                        <Tabs.List>
                          <Tabs.Item value="1">
                            {translate(
                              'payment.tabs.invoice',
                              'checkoutPayment',
                            )}
                          </Tabs.Item>
                          {/* <Tabs.Item value="2">{translate('payment.tabs.creditCard')}</Tabs.Item> */}
                        </Tabs.List>
                      </View.Item>

                      <View.Item columns={{ s: 12, l: 4 }}>
                        <Text variant="caption-1">
                          <View
                            direction="row"
                            justify={{ s: 'start', l: 'end' }}
                            gap={2}
                          >
                            <Icon
                              svg={IconLockFill}
                              color="positive"
                              size={4.5}
                            />
                            <View.Item>
                              {translate('payment.secure', 'checkoutPayment')}
                            </View.Item>
                          </View>
                        </Text>
                      </View.Item>
                    </View>

                    <Tabs.Panel value="1">
                      <View direction="row" paddingBottom={10}>
                        <View.Item columns={12}>
                          <Text>
                            {translate(
                              'payment.accountWithClient',
                              'checkoutPayment',
                            )}
                          </Text>
                        </View.Item>
                      </View>
                    </Tabs.Panel>

                    <Tabs.Panel value="2">
                      {isPayment ? (
                        <View direction="row" paddingBottom={10}>
                          <CheckoutPaymentMethod
                            isPayment={isPaymentClick}
                            methods={payments}
                          />
                        </View>
                      ) : (
                        <CheckoutPaymentForm
                          isDefaultCheck={isDefaultCheck}
                          isShippingAddress={isShippingAddress}
                        />
                      )}
                    </Tabs.Panel>

                    <View.Item columns={12}>
                      <View direction="row">
                        <Button
                          href="/checkout/review-order"
                          color="primary"
                          size="xlarge"
                          fullWidth
                        >
                          {translate(
                            'payment.action.continue',
                            'checkoutPayment',
                          )}
                        </Button>
                      </View>
                    </View.Item>
                  </Tabs>
                </View>
              </View.Item>
            </View>
          </View>
        </Accordion.Content>
      </Accordion>
    </View>
  );
};

export default CheckoutPayment;
