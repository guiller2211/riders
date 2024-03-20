import { useFetcher, useNavigation, useSubmit } from '@remix-run/react';
import { LoginView, SendProductView, View, useResponsiveClientValue } from '@ducati/ui';
import { FormEvent, useState } from 'react';
import { addProduct } from '../../service/product.data.service';
import { Product } from '@ducati/types';

export const AdminPage = () => {
  const navigation = useNavigation();
  const fetcher = useFetcher();
  const [notification, setNotification] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    const formData = new FormData(e.currentTarget);

    const type = formData.get('type');
    const category = formData.get('category');
    const image = formData.get('image') as File;
    const price = formData.get('price');
    const description = formData.get('description');
    const productName = formData.get('productName');

    const authResult = await addProduct(type as string,
      category as string,
      image,
      price as string,
      description as string,
      productName as string);

    if (authResult && authResult.success) {
      setSuccess(authResult.success);
      setIsloading(false);
    } else {
      setNotification(authResult ? authResult.message : "error");
      setIsloading(false);
    }
  };

  return (
    <View gap={10} paddingInline={useResponsiveClientValue({ s: 10, l: 20 })}>
      <SendProductView
        sendForm={submitForm}
        notification={notification}
        success={success}
        isLoading={isLoading}
      />
    </View>
  );
};