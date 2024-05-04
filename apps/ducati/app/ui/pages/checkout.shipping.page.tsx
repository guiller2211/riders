import {
  CheckoutShipping,
  /* getCheckoutOverview, */
  Icon,
  IconPencil,
  Link,
  Text,
  useResponsiveClientValue,
  View,
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';
import { useEffect, useMemo, useState } from 'react';
import { AddressData, AppRoutes } from '@ducati/types';

import type { loader } from '../../routes/checkout.shipping';

export default function CheckoutShippingPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { cart } = loaderData;
  const [addressProcessed, setAddressProcessed] = useState(false);
  const [linkPayment, setLinkPayment] = useState('');
  const [reviewOrder, setLinkReviewOrder] = useState('');


  /* const overview = useMemo(() => getCheckoutOverview(cart), [cart]); */


  return (
    <View.Item columns={useResponsiveClientValue({ s: 12, l: 8 })}>
      <View paddingBottom={2}>
        <CheckoutShipping addresses={loaderData.addresses} 
        checkoutShippingMethods={
          loaderData.shippingProps.checkoutShippingMethods
        } />
      </View>
      <View paddingBottom={2}>
        <Link href={AppRoutes.CheckoutPayment} color="inherit" variant="plain">
          <View
            borderRadius="small"
            borderColor="neutral"
            padding={8}
            backgroundColor="disabled"
          >
            <View.Item>
              <View direction="row" gap={4}>
                <Text variant="featured-3">1</Text>
                <Text variant="featured-3">
                  Pago
                </Text>

                <View.Item gapBefore="auto">
                  <Icon svg={IconPencil} />
                </View.Item>
              </View>
            </View.Item>
          </View>
        </Link>
      </View>
      <View paddingBottom={2}>
        <Link href={AppRoutes.CheckoutReviewOrder} color="inherit" variant="plain">
          <View
            borderRadius="small"
            borderColor="neutral"
            padding={8}
            backgroundColor="disabled"
          >
            <View.Item>
              <View direction="row" gap={4}>
                <Text variant="featured-3">1</Text>
                <Text variant="featured-3">
                  Revision Pedido
                </Text>
                <View.Item gapBefore="auto">
                  <Icon svg={IconPencil} />
                </View.Item>
              </View>
            </View.Item>
          </View>
        </Link>
      </View>
    </View.Item>
  );
}
