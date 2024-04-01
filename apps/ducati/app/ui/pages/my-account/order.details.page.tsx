import {
  CartEntry,
  I18nContext,
  Text,
  View,
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';

import type { loader } from '../../../routes/my-account.orders.$code';

export default function OrderDetailsPage() {
  const loaderData = useTypedLoaderData<typeof loader>();

  return (
      <View direction="row" gap={9}>
        <View.Item columns={12}>
          Ordenes
        </View.Item>

        <View.Item columns={12}>
        {/*   <OrderPlaced
            placeDate={loaderData?.placed}
            shippingMethod={loaderData?.shippingMethod}
            billed={loaderData?.billed}
            shipping={loaderData?.shipping}
            payment={loaderData?.payment}
            shippingOn={loaderData?.shipping.shippingOn}
          /> */}
        </View.Item>

        <View.Item columns={12}>
          <View direction="column" gap={6}>
            <View.Item>
              <Text variant="featured-3">Productos</Text>
            </View.Item>
            <View.Item>
              <View direction="row" gap={16}>
                <View.Item columns={{ s: 12, l: 8 }}>
                  {loaderData?.order.entries?.map((entry, index) => (
                    <View.Item columns={12} key={index}>
                      {/* <CartEntry entry={entry} viewCart="ReadOnly" /> */}
                    </View.Item>
                  ))}
                </View.Item>
                <View.Item columns={{ s: 12, l: 4 }}>
               {/*    <OrderSummary
                    showTitle
                    shippingTotal={loaderData?.order.shippingTotal}
                    salesTax={loaderData?.order.totalTax}
                    subTotal={loaderData?.order.subTotal}
                    total={loaderData?.order.totalPriceWithTax}
                  /> */}
                </View.Item>
              </View>
            </View.Item>
          </View>
        </View.Item>
      </View>
  );
}
