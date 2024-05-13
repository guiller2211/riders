import { CreditCardIcon } from '../../shared';
import { View } from 'reshaped';
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
      {/*
      <View.Item>
        <View paddingEnd={1}>
          <Text variant="body-3">{props.endingIn ? props.endingIn:translate('overview.endingIn', 'checkoutReviewOrder', { num: props.ending })}</Text>
        </View>
      </View.Item>
      <View.Item>
        <Text variant="body-3">
          &ndash; {props.expiresIn ? props.expiresIn : translate('overview.expires', 'checkoutReviewOrder', { month: props.month, year: props.year })}
        </Text>
       </View.Item> */}
    </View>
  );
};

export default OrderConfirmationPaid;