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

const CheckoutShipping = (props: CheckoutShippingProps) => {
  const { addresses, checkoutShippingMethods } = props;

  const navigate = useNavigate();

  const [activeValue, setActiveValue] = useState(false);
  const [agreed, toggleAgreed] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(addresses?.length > 0);
  const [isLoading, setIsLoading] = useState(false);
  const [addressProcessed, setAddressProcessed] = useState(false);
  const [shippingMethod, setLocalShippingMethod] = useState<ShippingMethod[]>(
    checkoutShippingMethods?.methods || [],
  );
  const [selectedAddress, setSelectedAddress] = useState<AddressData>();
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<CartProps>();

  const onChangeAddress = async (value: AddressData) => {
    
  };
/* 
  useEffect(() => {
    const defaultAddress = getDefault('defaultShippingAddress', addresses);

    if (
      cart.shippingAddress &&
      cart.shippingInfo?.shippingMethodId &&
      !addressProcessed
    ) {
      setSelectedAddress(cart.shippingAddress);
      setSelectedShippingMethod(cart as unknown as CartProps);
      setAddressProcessed(true);
      toggleAgreed(true);
    }

    if (defaultAddress && !addressProcessed) {
      onChangeAddress(defaultAddress);
      setAddressProcessed(true);
    }
  }, [cart, addresses, onChangeAddress]); */

  const onChangeShippingMethod = (value: ShippingMethod) => {
   
  };

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedAddress && selectedShippingMethod) {
      navigate('/checkout/payment');
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
            <form method="POST" onSubmit={(e) => validateForm(e)}>
              <View padding={{ s: 0, m: 8 }}>
                <View direction="row">
                  <View.Item columns={12}>
                    {showAddressForm ? (
                      <CheckoutAddresses
                        onChangedToForm={onChangedToForm}
                        onChangeAddress={onChangeAddress}
                        addresses={addresses}
                      />
                    ) : (
                      <GenericActionCard
                        cardLabel='Agregar Direccion'
                        drawerTitle='Agregar Direccion'
                      >
                        <AddressForm />
                      </GenericActionCard>
                    )}
                  </View.Item>

                  {isLoading ? (
                    <Loader />
                  ) : (
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
                            >
                              Continuar al pago
                            </Button>
                          </View>
                        </View.Item>
                      </>
                    )
                  )}
                </View>
              </View>
            </form>
          </Accordion.Content>
        </Accordion>
      </View.Item>
    </View>
  );
};
export default CheckoutShipping;
