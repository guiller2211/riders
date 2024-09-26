import { View, Text } from '../../../atomic';
import { CreditCardIcon } from '../../shared';
import type { OrderConfirmationPaidProps } from './OrderConfirmationPaid.types';

const OrderConfirmationPaid = (props: OrderConfirmationPaidProps) => {
  const { type } = props;
  return (
    <View direction="row">
      {type ? (
        <View.Item>
          <View paddingEnd={2}>
            <CreditCardIcon type={type} />
          </View>
        </View.Item>
      ) : (
        <View.Item>
          <View paddingEnd={2}>
            A cuenta
          </View>
        </View.Item>
      )}
      <View direction='column' gap={1}>
        <Text variant="body-3">Terminado en: {props.ending}</Text>
        <Text variant="body-3">
          A nombre de {props.name}
        </Text>
      </View>
    </View>
  );
};

export default OrderConfirmationPaid;