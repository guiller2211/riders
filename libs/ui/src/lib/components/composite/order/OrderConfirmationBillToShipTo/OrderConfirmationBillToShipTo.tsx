import { Text, View } from 'reshaped';
import type { OrderConfirmationBillToShipToProps } from './OrderConfirmationBillToShipTo.types';
import { useState } from 'react';
import { communes, regions } from '@ducati/types';

const OrderConfirmationBillToShipTo = (
  props: OrderConfirmationBillToShipToProps,
) => {
  const [region, setRegion] = useState(regions.find(_r => _r.uid === props.region)?.name);
  const [commune, setCommunes] = useState(communes.find(_c => _c.uid === props.commune)?.name);

  return (
    <View>
      <Text variant="body-3">{props.address}, </Text>
      <Text variant="body-3">{region}, </Text>
      <Text variant="body-3">{commune} </Text>
    </View>
  );
};

export default OrderConfirmationBillToShipTo;