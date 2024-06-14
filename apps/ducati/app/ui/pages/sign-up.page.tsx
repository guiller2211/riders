import { SignUpView, View, useResponsiveClientValue } from '@ducati/ui';
import { useFetcher, useNavigation } from '@remix-run/react';
import { FormEvent, useState } from 'react';
import { createAccount } from '../../service/login.service';
import { Customer } from '@ducati/types';

export const SignUpPage = () => {
  const navigation = useNavigation();
  const fetcher = useFetcher();
  const [notification, setNotification] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsloading] = useState(false)
  
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    setIsloading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');

    const user: Customer = {
      id: '',
      email: email as string,
      firstName: firstName as string,
      lastName: lastName as string,
      anonymous: false,
      lastModifiedAt: new Date().toISOString()
    }

    const authResult = await createAccount(user, password as string);

    if (authResult && authResult.success) {
      setSuccess(authResult.success);
      await fetcher.submit({ __session: authResult.__session, "email-login": true }, { method: "post" });
    } else {
      setNotification(authResult ? authResult.error : "error");
      setIsloading(false);
    }
  };

  return (
    <View gap={10} paddingInline={useResponsiveClientValue({ s: 10, l: 20 })}>
      <SignUpView
        sendForm={submitForm}
        notification={notification}
        success={success}
        isLoading={isLoading}
      />
    </View>
  );
};
