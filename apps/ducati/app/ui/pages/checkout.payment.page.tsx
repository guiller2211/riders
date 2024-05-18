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

import { loader } from '../../routes/checkout.payment';
import { useEffect, useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';


export default function CheckoutPaymentPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const [preferenceId, setPreferenceId] = useState<string | null | undefined>(loaderData.page?.id);
 
  useEffect(() => {
    initMercadoPago('TEST-2d94e83a-e3de-4416-847e-4c0e3499aa5c', { locale: 'es-CL' });
    setPreferenceId(loaderData.page?.id)
  }, [loaderData.page?.id]);

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
          preferenceId={preferenceId!}
          totalAmount={loaderData.cart?.totalPrice?.value.centsAmount}
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
