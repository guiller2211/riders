import { Card, View, Text } from '../../../../atomic';
import { Price } from '../../../shared';
import type { CheckoutShippingMethodCardProps } from './CheckoutShippingMethodCard.type';

const CheckoutShippingMethodCard = (props: CheckoutShippingMethodCardProps) => {
  const { shippingMethod, isSelected } = props;

  return (
    <View paddingStart={1}>
      <Card padding={0} selected={isSelected}>
        <View
          padding={7}
          backgroundColor={isSelected ? 'primary-faded' : 'white'}
        >
          <View direction="row" align="center">
            {shippingMethod.price.value &&
            shippingMethod.price.value.centsAmount > 0 ? (
              <Price
                locale={shippingMethod.price.value.currency.isocode}
                value={shippingMethod.price.value}
                text={{ variant: 'body-2', weight: 'medium' }}
              />
            ) : (
              'Envío Gratis'
            )}{' '}
            <View.Item>
              <Text variant="body-2" weight="medium">
                &nbsp;- {shippingMethod.name}
              </Text>
            </View.Item>
          </View>
        </View>
      </Card>
    </View>
  );
};
export default CheckoutShippingMethodCard;
