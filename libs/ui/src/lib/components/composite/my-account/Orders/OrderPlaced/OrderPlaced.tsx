import { FormatDate } from '../../../../../utils';
import { useResponsiveClientValue } from '../../../../../hooks';
import { Card, Text, View } from '../../../../atomic';
import { CreditCardIcon } from '../../../shared';
import type { OrderPlacedProps } from './OrderPlaced.types';
import { useState } from 'react';
import { communes, regions } from '@riders/types';

const OrderPlaced = (props: OrderPlacedProps) => {
  const { payment, createdDate, shippingInfo, shippingMethod } =
    props;

  const [region, setRegion] = useState(regions.find(_r => _r.uid === shippingInfo.region?.name)?.name);
  const [commune, setCommunes] = useState(communes.find(_c => _c.uid === shippingInfo.communes?.name)?.name);


  const formatDate = FormatDate.format(createdDate)
  return (
    <View direction="column" gap={6}>
      <View.Item columns={12}>
        <Text variant="featured-3">
          Creado {formatDate}
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
                        A nombre de {payment.name}
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
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-3">{shippingInfo.streetName}</Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-3">
                        {region},{commune} {shippingInfo.postalCode}
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-3">{shippingInfo.phone}</Text>
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
                          {shippingMethod.duration}{' '}
                        </Text>
                      </View.Item>
                    )}
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
