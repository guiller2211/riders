import {
  CartEntry,
  CheckoutOverview,
  I18nContext,
  OrderPlaced,
  OrderSummary,
  Text,
  View,
  useResponsiveClientValue,
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';

import type { loader } from '../../../routes/my-account.orders.$numOrder';

export default function OrderDetailsPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { order, overview } = loaderData;
  return (
    <View direction="row" gap={9} padding={10} backgroundColor='white' borderRadius='large'>
      <View.Item columns={12}>
        <Text variant="featured-1" weight="bold">
          Orden: {overview.numOrder}
        </Text>
      </View.Item>

      <View.Item columns={12}>
        <CheckoutOverview overview={overview} isOrderConfirmationPage />
      </View.Item>

      <View.Item columns={12}>
        <View direction="column" gap={6}>
          <View.Item>
            <Text variant="featured-3">Productos</Text>
          </View.Item>
          <View.Item>
            <View direction="row" gap={16}>
              <View.Item columns={useResponsiveClientValue({ s: 12, l: 8 })}>
                {order?.entries?.map((entry: any, index) => (
                  <View.Item columns={12} key={index}>
                    <CartEntry entry={entry} viewCart="ReadOnly" />
                  </View.Item>
                ))}
              </View.Item>
              <View.Item columns={useResponsiveClientValue({ s: 12, l: 4 })}>
                <OrderSummary
                  showTitle
                  subTotal={order?.totalPrice}
                  total={order?.totalPrice}
                />
              </View.Item>
            </View>
          </View.Item>
        </View>
      </View.Item>
    </View>
  );
}
