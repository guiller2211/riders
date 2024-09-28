import { AddressData, Addresses, Loading, Text, View } from '@riders/ui';
import { FormEvent, useEffect, useState } from 'react';
import { deleteShippingAddress, setAddressCustomer, setDefaultAddress } from '../../../service/user.data.service';
import type { loader } from '../../../routes/my-account.address-book';
import { useLoaderData } from '@remix-run/react';

export default function AddressBookPage() {
  const loaderData = useLoaderData<typeof loader>();
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

  const selectDefault = async (addressFormData: AddressData) => {
    await handleOperation(setDefaultAddress, addressFormData, setIsloading);
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
              selectDefault={selectDefault}
            />
        }
      </View.Item>
    </View>
  );
}
