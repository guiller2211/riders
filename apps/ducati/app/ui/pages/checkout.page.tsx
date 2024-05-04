import { Card, OrderSummary, View, useResponsiveClientValue } from '@ducati/ui';
import { Outlet } from '@remix-run/react';
import { useTypedLoaderData } from 'remix-typedjson';

import { loader } from '../../routes/checkout';
import { useState } from 'react';

export default function CheckoutPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const [getCart, setCart] = useState(loaderData.cart);

  return (
    <View
      direction={useResponsiveClientValue({ s: 'column', l: 'row' })}
      paddingBlock={12}
      paddingInline={6}
      gap={useResponsiveClientValue({ s: 12, l: 18 })}

    >
      <Outlet />
      <View.Item columns={useResponsiveClientValue({ s: 12, l: 4 })}>
        <Card padding={8}>

          <OrderSummary
            subTotal={getCart?.totalPrice}
            total={getCart?.totalPrice}
            showTitle
          />
        </Card>
      </View.Item>
    </View>
  );
}
