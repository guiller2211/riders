import { useFetcher, useNavigation } from '@remix-run/react';
import { LoginView, SendProductView, View, useResponsiveClientValue } from '@ducati/ui';
import { FormEvent, useState } from 'react';
import { addProduct } from '../../../service/product.data.service';
import { loginWithEmailAndPassword } from '../../../service/login.service';

export const BackofficePage = () => {
  const navigation = useNavigation();
  const fetcher = useFetcher();
  const [isLoading, setIsloading] = useState(false)
  const [notification, setNotification] = useState<string>("");

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsloading(true);

      const formData = new FormData(e.currentTarget);
      const email: string = formData.get('email') as string;
      const password: string = formData.get('password') as string;

      const authResult = await loginWithEmailAndPassword(email, password);

      if (authResult && authResult.success) {
          await fetcher.submit({ __session: authResult.__session, "email-login": true }, { method: "post" });
      } else {
          setNotification(authResult ? authResult.error : "error");
          setIsloading(false);
      }
  };

  return (
      <View gap={10} paddingInline={useResponsiveClientValue({ s: 10, l: 20 })}>
          <LoginView
              sendForm={submitForm}
              notification={notification}
              isLoading={isLoading}
          />
      </View>
  );
  /* const navigation = useNavigation();
  const fetcher = useFetcher();
  const [notification, setNotification] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);

    const formData = new FormData(e.currentTarget);

    const authResult = await addProduct(formData);

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
  ); */
};