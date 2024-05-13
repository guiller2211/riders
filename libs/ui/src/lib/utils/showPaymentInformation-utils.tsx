import { Text, View } from 'reshaped';
import { CheckoutOverviewProp } from '../components/composite/order';

export const showPaymentInformation = (
  overview: CheckoutOverviewProp,
  translate: string,
) => {
  return (
    <View direction="row" align="center">
      <View.Item>
        <Text variant="body-2" weight="regular">
          {overview.paid.type ? overview.paid.type : translate}
        </Text>
      </View.Item>
    </View>
  );
};
