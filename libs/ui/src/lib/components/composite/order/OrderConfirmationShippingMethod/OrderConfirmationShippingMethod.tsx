import { Text, View } from 'reshaped';
import type { OrderConfirmationShippingMethodProps } from './OrderConfirmationShippingMethod.types';

const OrderConfirmationShippingMethod = (
  props: OrderConfirmationShippingMethodProps,
) => {
  return (
    <View>
      <Text variant="body-3">{props.method} </Text>
    </View>
  );
};
export default OrderConfirmationShippingMethod;