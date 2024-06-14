import { useState } from 'react';

import { Accordion, Button, Icon, Tabs, Text, View } from '../../../../atomic';
import { CheckoutPaymentMethod, PaymentProps } from '../..';
import { IconLockFill } from '../../../../../icons';
import type { CheckoutPaymentProps } from './CheckoutPayment.types';
import { useResponsiveClientValue } from '../../../../../hooks'
import { AppRoutes } from '@ducati/types';
import { Payment } from '@mercadopago/sdk-react';
import { CreditCardEnum } from '../../../shared';
import { useNavigate } from '@remix-run/react';

export const CheckoutPayment = (props: CheckoutPaymentProps) => {
  const { payments, cart, preferenceId, sendForm } = props;
  const [activeValue, setActiveValue] = useState(false);
  const navigate = useNavigate();

  const [isPayment, setIsPayment] = useState(payments?.length > 0);
  const isPaymentClick = (value: boolean) => {
    setIsPayment(!value);
  };
  const sendPayment = (param: any, res: any) => {
    const savePay: PaymentProps = {
      type: param.formData.payment_method_id,
      name: res.cardholderName,
      firstEights: res.bin,
      ending: res.lastFourDigits,
    }

    sendForm && sendForm(savePay)

  }
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
                {/*  {isPayment ? (
                  <CheckoutPaymentMethod
                    isPayment={isPaymentClick}
                    methods={payments}
                  />

                )
                  :
                  <>
                 
                  </>
                } */}
                <Payment
                  initialization={{
                    preferenceId: preferenceId,
                    amount: cart?.totalPrice?.value.centsAmount!,
                    payer: { email: cart?.shippingAddress?.email }
                  }}
                  onSubmit={async (param, res) => sendPayment(param, res)}
                  customization={{ paymentMethods: { creditCard: 'all', debitCard: 'all' } }}
                />
              </Tabs.Panel>

            </Tabs>
          </View>
        </Accordion.Content>
      </Accordion>
    </View>
  );
};

