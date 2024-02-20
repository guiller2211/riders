import type { TextProps } from 'reshaped';

import { Divider, Text, View, Accordion } from '../../../atomic';
import { useTranslation } from '../../../../hooks';
import Coupon from '../../shared/cart/Coupon/Coupon';
import type { OrderSummaryProps } from './OrderSummary.types';

const OrderSummary = (props: OrderSummaryProps) => {
  const { showTitle, showPromotion, salesTax, total, subTotal, shippingTotal } =
    props;

  const priceText: TextProps = {
    color: 'neutral',
    weight: 'bold',
    variant: 'featured-3',
  };

  const translate = useTranslation();

  return (
    <View>
      <Accordion defaultActive>
        <Accordion.Trigger>
          {showTitle && (
            <View paddingBottom={7}>
              <Text variant="featured-3" weight="bold">
                {translate('summary.orderSummary', 'order')}
              </Text>
            </View>
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <View direction="row" paddingBottom={4}>
            <Text variant="body-3" weight="bold">
              {translate('summary.itemsSubtotal', 'order')}
            </Text>
            <View.Item columns={6} gapBefore="auto">
              $1000.000
            </View.Item>
          </View>

          <View direction="row" paddingBottom={4}>
            <Text variant="body-3" weight="bold">
              {translate('summary.shipping', 'order')}
            </Text>
            <View.Item columns={6} gapBefore="auto">
              {shippingTotal?.value?.centsAmount &&
                shippingTotal?.value?.centsAmount > 0 ? (
                "$1000.000"
              ) : (
                translate('summary.free', 'order')
              )}
            </View.Item>
          </View>

          <View direction="row" paddingBottom={4}>
            {salesTax && (
              <Text variant="body-3" weight="bold">
                {translate('summary.salesTax', 'order', {
                  name: salesTax.name,
                  percentage: salesTax.rate.toString(),
                })}
              </Text>
            )}
            <View.Item columns={6} gapBefore="auto">
              $1000.000
            </View.Item>
          </View>

          {showPromotion && (
            <View>
              <Coupon />
            </View>
          )}
        </Accordion.Content>
      </Accordion>

      <Divider />

      <View direction="row" paddingTop={7}>
        <Text variant="featured-3" weight="bold">
          Total
        </Text>
        <View.Item columns={6} gapBefore="auto">
          $1000.000
        </View.Item>
      </View>
    </View>
  );
};

export default OrderSummary;
