import {
  Addresses,
  AlertNotification,
  AlertNotificationEnum,
  I18nContext,
  Text,
  View,
} from '@ducati/ui';
import { FormEvent, useState } from 'react';
import { useTypedActionData, useTypedLoaderData } from 'remix-typedjson';
import { deleteShippingAddress, setAddressCustomer } from '../../../service/user.data.service';
import type { action, loader } from '../../../routes/my-account.address-book';

export default function AddressBookPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { uid } = loaderData;
  const { result } = useTypedActionData<typeof action>() ?? {};
  const [showAlert, setShowAlert] = useState(true);
  const [linkPayment, setLinkPayment] = useState('');
  const [reviewOrder, setLinkReviewOrder] = useState('');
  const [isLoading, setIsloading] = useState(false)
  const [isLoadingAddress, setIsloadingAddress] = useState(false)

  const handleOperation = async (
    operation: (value: any, uid: string) => Promise<any>,
    value: any,
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
    try {
      await operation(value, uid);
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
    console.log(value)
    await handleOperation(deleteShippingAddress, value, setIsloadingAddress);
  };


  return (
    <View direction="row" gap={12}  backgroundColor='white'
    padding={10}
    borderRadius='large'>
      <View.Item columns={12}>
        <Text variant="featured-1">Direcciones</Text>
      </View.Item>
      {result && showAlert && (
        <View.Item columns={12}>
          <AlertNotification
            type={
              result.success
                ? AlertNotificationEnum.Success
                : AlertNotificationEnum.Error
            }
            message={result.message}
            close={() => setShowAlert(false)}
          />
        </View.Item>
      )}
      <View.Item columns={12}>
        <Addresses
          addresses={loaderData.addresses}
          sendForm={submitForm}
          deleteAddress={deleteAddress}
        />
      </View.Item>
    </View>
  );
}
