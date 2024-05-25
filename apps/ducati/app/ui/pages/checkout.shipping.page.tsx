import {
  CheckoutShipping,
  Icon,
  IconPencil,
  Link,
  Loading,
  Text,
  useResponsiveClientValue,
  View,
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';
import { FormEvent, useEffect, useState } from 'react';
import { AddressData, AppRoutes, CartData, ShippingMethod } from '@ducati/types';

import type { loader } from '../../routes/checkout.shipping';
import { deleteShippingAddress, setAddressCustomer } from '../../service/user.data.service';
import { setShippingAddress, setShippingMethod } from '../../service/cart.data.service';

export default function CheckoutShippingPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { cart, uid, shippingProps } = loaderData;
  const [isLoading, setIsloading] = useState(false)
  const [isLoadingAddress, setIsloadingAddress] = useState(false)
  const [addresses, setAddresses] = useState(shippingProps.addresses)
  const [currentCart, setCurrentCart] = useState<CartData>(cart!);

  const handleOperation = async (
    operation: (value: any, uid: string) => Promise<any>,
    value: any,
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
    try {
      const result = await operation(value, uid);
      setCurrentCart(result);
      if(result && result.addressesData){
        setAddresses(result.addressesData)
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleOperation(setAddressCustomer, formData, setIsloading);
  };

  const sendAddress = async (value: AddressData) => {
    await handleOperation(setShippingAddress, value, setIsloadingAddress);
  };

  const sendShippingMethod = async (value: ShippingMethod) => {
    await handleOperation(setShippingMethod, value, setIsloadingAddress);
  };

  const deleteAddress = async (value: string) => {
    await handleOperation(deleteShippingAddress, value, setIsloadingAddress);
  };

  useEffect(() => {
    setCurrentCart(cart!);
    setAddresses(shippingProps.addresses);
  }, [cart, shippingProps.addresses]);

  console.log(addresses)
  return (
    <View.Item columns={useResponsiveClientValue({ s: 12, l: 8 })}>
      <View paddingBottom={2}>
        {
          isLoading ?
            <Loading />
            :
            <CheckoutShipping
              addresses={addresses}
              checkoutShippingMethods={shippingProps.checkoutShippingMethods}
              sendForm={submitForm}
              cart={currentCart}
              sendAddress={sendAddress}
              sendShippingMethod={sendShippingMethod}
              isLoading={isLoadingAddress}
              deleteAddress={deleteAddress} />
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
                <Text variant="featured-3">2</Text>
                <Text variant="featured-3">
                  Pago
                </Text>
                {/* {cart?.paymentInfo ?? ''} */}
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
