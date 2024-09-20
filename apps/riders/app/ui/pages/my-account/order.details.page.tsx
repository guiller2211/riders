import {
  CartEntry,
  CheckoutOverview,
  OrderSummary,
  Text,
  View,
  useResponsiveClientValue,
} from '@riders/ui';
import { useTypedLoaderData } from 'remix-typedjson';

import type { loader } from '../../../routes/my-account.orders.$numOrder';

export default function OrderDetailsPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { order, overview } = loaderData;
  return (
    <View direction="column" gap={9} padding={8} backgroundColor='white' borderRadius='large'>
      <Text variant="featured-1" weight="bold">
        Orden: {overview.numOrder}
      </Text>

      <CheckoutOverview overview={overview} isOrderConfirmationPage />

      <View direction="column" gap={6}>
        <Text variant="featured-3">Productos</Text>

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
      </View>
    </View>
  );
}
