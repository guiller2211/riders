import {
  CheckoutShipping,
  getCheckoutOverview,
  /* getCheckoutOverview, */
  Icon,
  IconPencil,
  Link,
  Loading,
  showPaymentInformation,
  Text,
  useResponsiveClientValue,
  View,
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { AddressData, AppRoutes, CartData, ShippingMethod } from '@ducati/types';

import type { loader } from '../../routes/checkout.shipping';
import { setAddressCustomer } from '../../service/user.data.service';
import { setShippingAddress, setShippingMethod } from '../../service/cart.data.service';

export default function CheckoutShippingPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { cart, uid, shippingProps } = loaderData;
  const [addressProcessed, setAddressProcessed] = useState(false);
  const [linkPayment, setLinkPayment] = useState('');
  const [reviewOrder, setLinkReviewOrder] = useState('');
  const [isLoading, setIsloading] = useState(false)
  const [isLoadingAddress, setIsloadingAddress] = useState(false)
  const [currentCart, setCurrentCart] = useState<CartData>(cart!);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const address = await setAddressCustomer(formData, uid);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsloading(false);

    }
  };
  const sendAddress = async (value: AddressData) => {
    setIsloadingAddress(true);
    try {
      const updatedCart = await setShippingAddress(value, uid);
      setCurrentCart(updatedCart)
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      setIsloadingAddress(false);

    }
  };
  const sendShippingMethod = async (value: ShippingMethod) => {
    setIsloadingAddress(true);
    try {
      const updatedCart = await setShippingMethod(value, uid);
      setCurrentCart(updatedCart)
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      setIsloadingAddress(false);

    }
  };

  useEffect(() => {
    setCurrentCart(cart!);
  }, [cart]);

  return (
    <View.Item columns={useResponsiveClientValue({ s: 12, l: 8 })}>
      <View paddingBottom={2}>
        {
          isLoading ?
            <Loading />
            :
            <CheckoutShipping
              addresses={shippingProps.addresses}
              checkoutShippingMethods={shippingProps.checkoutShippingMethods}
              sendForm={submitForm}
              cart={currentCart}
              sendAddress={sendAddress}
              sendShippingMethod={sendShippingMethod}
              isLoading={isLoadingAddress} />
        }
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
                {/* {showPaymentInfo} */}
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
