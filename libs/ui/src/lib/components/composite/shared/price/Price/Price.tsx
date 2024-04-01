import type { PriceProps } from './Price.types';
import { View, Text } from '../../../../atomic';
import { FormatUtils } from '../../../../../utils';
import { Badges } from '../../utils';

const Price = (props: PriceProps) => {
  const {
    badges,
    badgesOnTop,
    discount,
    locale,
    promotionMessage,
    text,
    value,
  } = props;
  let newValue;
  let oldValue: number | undefined;
  let oldFormmatedValue: string | undefined;
  const discountedPrice =
    discount && discount.centsAmount > 0 ? discount.centsAmount : 0;
  let discountPercentage = 0;

  if (discountedPrice) {
    newValue = discountedPrice;
    oldValue = value?.centsAmount && value.centsAmount;
    oldFormmatedValue = FormatUtils.formatCurrency(
      oldValue,
      value?.currency.isocode,
      locale,
      value?.currency.decimalPlaces,
    );
    discountPercentage = oldValue
      ? Math.round(((oldValue - newValue) / oldValue) * 100)
      : 0;
  } else {
    newValue = value?.centsAmount;
  }
  const newFormmatedValue = FormatUtils.formatCurrency(
    newValue,
    value?.currency.isocode,
    locale,
    value?.currency.decimalPlaces,
  );

  return (
    <View gap={2} direction="row">
      {badges && badgesOnTop && (
        <View.Item columns={12}>
          <Badges badges={badges} />
        </View.Item>
      )}
      <View.Item columns={12}>
        <View gap={2} direction="row" align="center">
          {newFormmatedValue && (
            <Text
              color={text?.color}
              variant={text?.variant}
              weight={text?.weight}
            >
              {newFormmatedValue}
            </Text>
          )}
        </View>
        <View gap={2} direction="row" align="center">
          {oldValue && (
            <Text color="neutral-faded" decoration="line-through">
              {oldFormmatedValue}
            </Text>
          )}
          {discountedPrice && (
            <Text color="positive" variant="body-3" weight="bold">
              (Saved {discountPercentage}%)
            </Text>
          )}
          {promotionMessage && (
            <Text color="positive" variant="body-3" weight="bold">
              {promotionMessage}
            </Text>
          )}
        </View>
      </View.Item>
      {badges && !badgesOnTop && (
        <View.Item columns={12}>
          <Badges badges={badges} />
        </View.Item>
      )}
    </View>
  );
};
export default Price;

/**
 *
    color: priceTextProps?.color ? priceTextcolor : 'neutral',
    variant: priceTextProps?.variant ? priceTextvariant : 'featured-2',
  )
 */
