import { Text, View } from 'reshaped';
import type { OrderConfirmationContactProps } from './OrderConfirmationContact.types';

const OrderConfirmationContact = (props: OrderConfirmationContactProps) => {
  const { email, firstName, lastName, phone } = props;
  return (
    <View direction="row" align="center" gap={4}>
      <View.Item>
        <Text variant="body-2" weight="bold">
          {firstName} {lastName}
        </Text>
      <View.Item>

      </View.Item>
        <Text variant="body-3">{email}</Text>
        <Text variant="body-3">{phone}</Text>
      </View.Item>
    </View>
  );
};

export default OrderConfirmationContact;
