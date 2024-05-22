import { Addresses, Loading, Text, View } from '@ducati/ui';
import { FormEvent, useEffect, useState } from 'react';
import { useTypedLoaderData } from 'remix-typedjson';
import { deleteShippingAddress, setAddressCustomer } from '../../../service/user.data.service';
import type { loader } from '../../../routes/my-account.address-book';

export default function AddressBookPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { uid, addresses } = loaderData;
  const [address, setAddress] = useState(addresses)
  const [isLoading, setIsloading] = useState(false)

  const handleOperation = async (
    operation: (value: any, uid: string) => Promise<any>,
    value: any,
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
    try {
      const result = await operation(value, uid);
      if (result && result.addressesData) {
        setAddress(result.addressesData)
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
  const deleteAddress = async (value: string) => {
    await handleOperation(deleteShippingAddress, value, setIsloading);
  };

  useEffect(() => {
    setAddress(loaderData.addresses);
  }, [loaderData.addresses]);

  return (
    <View direction="row" gap={12} backgroundColor='white'
      padding={10}
      borderRadius='large'>
      <View.Item columns={12}>
        <Text variant="featured-1">Direcciones</Text>
      </View.Item>
      <View.Item columns={12}>
        {
          isLoading ?
            <Loading />
            :
            <Addresses
              addresses={address}
              sendForm={submitForm}
              deleteAddress={deleteAddress}

            />
        }
      </View.Item>
    </View>
  );
}
