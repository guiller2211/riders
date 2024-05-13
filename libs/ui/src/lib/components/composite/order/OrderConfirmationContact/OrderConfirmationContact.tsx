import { Text, View } from 'reshaped';
import type { OrderConfirmationContactProps } from './OrderConfirmationContact.types';

const OrderConfirmationContact = (props: OrderConfirmationContactProps) => {
  const { email, firstName, lastName } = props;
  return (
    <View direction="row" align="center">
      <View.Item>
        <View paddingEnd={2}>
          <Text variant="body-2" weight="bold">
            {firstName} {lastName}
          </Text>
        </View>
      </View.Item>
      <View.Item>
        <Text variant="body-3"> {email}</Text>
      </View.Item>
    </View>
  );
};

export default OrderConfirmationContact;
