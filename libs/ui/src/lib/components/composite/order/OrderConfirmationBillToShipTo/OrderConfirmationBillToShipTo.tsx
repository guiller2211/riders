import { Text, View } from 'reshaped';
import type { OrderConfirmationBillToShipToProps } from './OrderConfirmationBillToShipTo.types';

const OrderConfirmationBillToShipTo = (
  props: OrderConfirmationBillToShipToProps,
) => {
  return (
    <View>
      <Text variant="body-3">{props.address} </Text>
      <Text variant="body-3">{props.address2} </Text>
    </View>
  );
};

export default OrderConfirmationBillToShipTo;