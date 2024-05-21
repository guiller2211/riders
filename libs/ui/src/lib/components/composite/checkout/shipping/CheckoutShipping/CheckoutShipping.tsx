import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';

import { Accordion, Button, Loader, Text, View } from '../../../../atomic';
import { AddressForm, GenericActionCard } from '../../../shared';
import { getDefault } from '../../../../../utils';
import CheckoutAddresses from './CheckoutAddresses';
import CheckoutShippingMethod from '../CheckoutShippingMethod';
import type { AddressData, ShippingInfo } from '../../../../../types';
import type { CartProps } from '../../../cart';
import type { CheckoutShippingProps } from './CheckoutShipping.types';
import type { ShippingMethod } from '../CheckoutShippingMethod';
import { useResponsiveClientValue } from 'libs/ui/src/lib/hooks';
import { AppRoutes } from '@ducati/types';

const CheckoutShipping = (props: CheckoutShippingProps) => {
  const { addresses,
    checkoutShippingMethods,
    sendForm,
    cart,
    sendAddress,
    sendShippingMethod,
    isLoading,
    deleteAddress } = props;

  const navigate = useNavigate();

  const [activeValue, setActiveValue] = useState(false);
  const [agreed, toggleAgreed] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(addresses?.length > 0);

  const [addressProcessed, setAddressProcessed] = useState(false);
  const [shippingMethod, setLocalShippingMethod] = useState<ShippingMethod[]>(
    checkoutShippingMethods?.methods || [],
  );
  const [selectedAddress, setSelectedAddress] = useState<AddressData>();
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<CartProps>();

  const onChangeAddress = (value: AddressData) => {
    if (sendAddress) {
      sendAddress(value)
    };
  };

  const onChangeShippingMethod = (value: ShippingMethod) => {
    if (sendShippingMethod) {
      sendShippingMethod(value);
    };
  };

  useEffect(() => {
    const defaultAddress = getDefault('defaultShippingAddress', addresses);

    if (
      cart?.shippingAddress &&
      cart.shippingMethod &&
      !addressProcessed
    ) {
      setSelectedAddress(cart?.shippingAddress);
      setSelectedShippingMethod(cart as unknown as CartProps);
      setAddressProcessed(true);
      toggleAgreed(true);
    }

    if (defaultAddress && !addressProcessed) {
      onChangeAddress(defaultAddress);
    }
  }, [cart, addresses, onChangeAddress]);



  const validateForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedAddress && selectedShippingMethod) {
      navigate(AppRoutes.CheckoutPayment);
    }
  };

  const onChangedToForm = () => setShowAddressForm(!showAddressForm);

  return (
    <View
      borderRadius="small"
      borderColor="neutral"
      padding={8}
      backgroundColor={!activeValue ? 'white' : 'disabled'}
    >
      <View.Item>
        <Accordion
          defaultActive
          onToggle={(active: boolean) => setActiveValue(!active)}
        >
          <Accordion.Trigger>
            <View direction="row" gap={4}>
              <Text variant="featured-3">1</Text>
              <Text variant="featured-3">
                Chequeo de Envio
              </Text>
            </View>
          </Accordion.Trigger>

          <Accordion.Content>
              <View padding={useResponsiveClientValue({ s: 0, m: 8 })}>
                <View direction="row">
                  <View.Item columns={12}>
                    {addresses.length > 0 ? (
                      <>
                        <View width="100%">
                          <View.Item columns="auto">
                            <View width={80} paddingStart={1}>
                              <GenericActionCard
                                cardLabel='Agregar Direccion'
                                drawerTitle='Agregar Direccion'
                              >
                                <AddressForm sendForm={sendForm} />
                              </GenericActionCard>
                            </View>
                          </View.Item>
                        </View>
                        <CheckoutAddresses
                          onChangedToForm={onChangedToForm}
                          onChangeAddress={onChangeAddress}
                          addresses={addresses}
                          sendForm={sendForm}
                          deleteAddress={deleteAddress}
                        />
                      </>
                    ) : (
                      <GenericActionCard
                        cardLabel='Agregar Direccion'
                        drawerTitle='Agregar Direccion'
                      >
                        <AddressForm sendForm={sendForm} />
                      </GenericActionCard>
                    )}
                  </View.Item>

                  {
                    checkoutShippingMethods && (
                      <>
                        <View.Item columns={12}>
                          <CheckoutShippingMethod
                            methods={shippingMethod}
                            onChangeShippingMethod={onChangeShippingMethod}
                          />
                        </View.Item>
                        <View.Item columns={12}>
                          <View paddingTop={11}>
                            <Button
                              fullWidth
                              size="xlarge"
                              color="primary"
                              type="submit"
                              disabled={!agreed}
                              loading={isLoading}
                              href={AppRoutes.CheckoutPayment}
                            >
                              Continuar al pago
                            </Button>
                          </View>
                        </View.Item>
                      </>
                    )
                  }
                </View>
              </View>
          </Accordion.Content>
        </Accordion>
      </View.Item>
    </View>
  );
};
export default CheckoutShipping;
