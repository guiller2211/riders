import {
  CheckoutPayment,
  Icon,
  IconPencil,
  Link,
  Text,
  View,
  useResponsiveClientValue
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';
import { AppRoutes } from '@ducati/types';

import type { loader } from '../../routes/checkout.payment';

export default function CheckoutPaymentPage() {
  const loaderData = useTypedLoaderData<typeof loader>();

  return (
    <View.Item columns={useResponsiveClientValue({ s: 12, l: 8 })}>
      <View paddingBottom={2}>
        <Link
          href={AppRoutes.CheckoutShipping}
          color="inherit"
          variant="plain"
        >
          <View
            borderRadius="small"
            borderColor="neutral"
            padding={8}
            backgroundColor="disabled"
          >
            <View.Item>
              <View direction="row" gap={2} align="center">
                <Text variant="featured-3">1</Text>
                <Text variant="featured-3">
                  Chequeo de Envio
                </Text>
                <Text variant="body-2" weight="regular">
                  {/* {showInfo} */}
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
        <CheckoutPayment
          isDefaultCheck
          isShippingAddress
          payments={loaderData.payment}
        />
      </View>
      <View paddingBottom={2}>
        <Link
          href={AppRoutes.CheckoutReviewOrder}
          color="inherit"
          variant="plain"
        >
          <View
            borderRadius="small"
            borderColor="neutral"
            padding={8}
            backgroundColor="disabled"
          >
            <View.Item>
              <View direction="row" gap={4}>
                <Text variant="featured-3">3</Text>
                <Text variant="featured-3">
                  Revision Pedido
                </Text>
              </View>
            </View.Item>
          </View>
        </Link>
      </View>
    </View.Item>
  );
}
