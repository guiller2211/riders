import type { TextProps } from 'reshaped';

import { Divider, Text, View, Accordion } from '../../../atomic';
import { Price } from '../../shared';
import Coupon from '../../shared/cart/Coupon/Coupon';
import type { OrderSummaryProps } from './OrderSummary.types';

export const OrderSummary = (props: OrderSummaryProps) => {
  const { showTitle, showPromotion, total, subTotal, shippingTotal } =
    props;

  const priceText: TextProps = {
    color: 'neutral',
    weight: 'bold',
    variant: 'featured-3',
  };


  return (
    <View>
      <Accordion defaultActive>
        <Accordion.Trigger>
          {showTitle && (
            <View paddingBottom={7}>
              <Text variant="featured-3" weight="bold">
                Resumen del Pedido
              </Text>
            </View>
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <View direction="row" paddingBottom={4}>
            <Text variant="body-3" weight="bold">
              Sub Total
            </Text>
            <View.Item columns={6} gapBefore="auto">
              <Price
                locale={subTotal?.value?.currency.isocode}
                text={priceText}
                value={subTotal?.value}
              />
            </View.Item>
          </View>

          <View direction="row" paddingBottom={4}>
            <Text variant="body-3" weight="bold">
              Envío
            </Text>
            <View.Item columns={6} gapBefore="auto">
              {shippingTotal?.value?.centsAmount &&
                shippingTotal?.value?.centsAmount > 0 ? (
                <Price
                  locale={shippingTotal?.locale}
                  text={priceText}
                  value={shippingTotal?.value}
                />
              ) : (
                'Envío Gratis'
              )}
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
          <Price
            locale={total?.value?.currency.isocode}
            text={priceText}
            value={total?.value}
          />
        </View.Item>
      </View>
    </View>
  );
};
