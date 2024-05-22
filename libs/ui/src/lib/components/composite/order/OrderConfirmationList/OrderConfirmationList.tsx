import { Text, View } from 'reshaped';
import { CartEntry } from '../../cart';
import type { OrderConfirmationListProps } from './OrderConfirmationList.types';

const OrderConfirmationList = (props: OrderConfirmationListProps) => {
  return (
    <View>
      {props.showTitle && (
        <View paddingBottom={7}>
          <Text variant="featured-3">Productos</Text>
        </View>
      )}
      {props.order.entries?.map((entry: any, index: number) => (
        <View.Item columns={12} key={index}>
          <CartEntry entry={entry} viewCart="ReadOnly" />
        </View.Item>
      ))}
    </View>
  );
};

export default OrderConfirmationList;