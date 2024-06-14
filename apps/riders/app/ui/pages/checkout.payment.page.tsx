import {
  CheckoutPayment,
  Icon,
  IconPencil,
  Link,
  Loading,
  PaymentProps,
  Text,
  View,
  useResponsiveClientValue
} from '@riders/ui';
import { useTypedLoaderData } from 'remix-typedjson';
import { AppRoutes } from '@riders/types';

import { loader } from '../../routes/checkout.payment';
import { useEffect, useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { setPayment } from '../../service/cart.data.service';
import { useNavigate } from '@remix-run/react';

export default function CheckoutPaymentPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { uid, page, cart, payment } = loaderData;
  const [preferenceId, setPreferenceId] = useState<string | null | undefined>(page?.id);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initMercadoPago('TEST-2d94e83a-e3de-4416-847e-4c0e3499aa5c', { locale: 'es-CL' });
    setPreferenceId(page?.id)
  }, [page?.id]);

  const sendPayment = async (form: PaymentProps) => {
    setIsLoading(true);
    try {
      const result = await setPayment(form, uid);
      result.success && navigate(AppRoutes.OrdenConfirmation);

    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };


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
      {
        isLoading ?
          <Loading />
          :
          <View paddingBottom={2}>
            <CheckoutPayment
              isDefaultCheck
              isShippingAddress
              payments={payment}
              preferenceId={preferenceId!}
              cart={cart}
              sendForm={sendPayment}
            />
          </View>
      }
    </View.Item>
  );
}
