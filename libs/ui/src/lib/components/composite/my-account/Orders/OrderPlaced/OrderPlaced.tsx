import { useResponsiveClientValue } from '../../../../../hooks';
import { Card, Text, View } from '../../../../atomic';
import { CreditCardIcon } from '../../../shared';
import type { OrderPlacedProps } from './OrderPlaced.types';

const OrderPlaced = (props: OrderPlacedProps) => {
  const { billed, payment, placeDate, shipping, shippingMethod, shippingOn } =
    props;


  return (
    <View direction="column" gap={6}>
      <View.Item columns={12}>
        <Text variant="featured-3">
          Colocado en {placeDate.day}/{placeDate.month}/{placeDate.year}
        </Text>
      </View.Item>
      <View.Item columns={12}>
        <View direction="row" gap={3}>

          <View.Item columns={useResponsiveClientValue({ s: 12, l: 3 })}>
            <Card>
              <View direction="column" gap={6}>
                <View.Item>
                  <Text variant="body-2" weight="bold">
                    Pago
                  </Text>
                </View.Item>
                <View.Item>
                  <View direction="column" gap={1} paddingBottom={12}>
                    <View.Item>
                      <View direction="row" gap={2}>
                        <View.Item>
                          <CreditCardIcon type={payment.type} />
                        </View.Item>
                        <View.Item>
                          <Text variant="body-3">
                            Terminado en:  {payment.ending}
                          </Text>
                        </View.Item>
                      </View>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-3">
                        Exp. {payment.month} {payment.year}
                      </Text>
                    </View.Item>
                  </View>
                </View.Item>
              </View>
            </Card>
          </View.Item>

          <View.Item columns={useResponsiveClientValue({ s: 12, l: 3 })}>
            <Card>
              <View direction="column" gap={6}>
                <View.Item>
                  <Text variant="body-2" weight="bold">
                    Envio
                  </Text>
                </View.Item>
                <View.Item>
                  <View direction="column" gap={1}>
                    <View.Item>
                      <Text variant="body-2" weight="bold">
                        {shipping.firstName} {shipping.lastName}
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-3">{shipping.line1}</Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-3">
                        {shipping.city},{shipping.state} {shipping.zipCode}
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-3">{shipping.phone}</Text>
                    </View.Item>
                  </View>
                </View.Item>
              </View>
            </Card>
          </View.Item>

          <View.Item columns={useResponsiveClientValue({ s: 12, l: 3 })}>
            <Card>
              <View direction="column" gap={6}>
                <View.Item>
                  <Text variant="body-2" weight="bold">
                    Metodo de Envio
                  </Text>
                </View.Item>
                <View.Item>
                  <View direction="column" gap={1} paddingBottom={13}>
                    {shippingMethod.price?.value && (
                      <View.Item>
                        <Text variant="body-3" weight="medium">
                          {shippingMethod.price.value.centsAmount > 0
                            ? shippingMethod.price.value.centsAmount
                            : 'Envio Gratis'}{' '}
                          -{shippingMethod.duration}{' '}
                          Días hábiles
                        </Text>
                      </View.Item>
                    )}
                    <View.Item>
                      <Text variant="body-3">
                        Envío en {shippingOn}
                      </Text>
                    </View.Item>
                  </View>
                </View.Item>
              </View>
            </Card>
          </View.Item>
        </View>
      </View.Item>
    </View>
  );
};

export default OrderPlaced;
