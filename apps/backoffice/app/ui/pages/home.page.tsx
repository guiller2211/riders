import { loader } from '../../routes/_index';
import { useFetcher, useNavigation } from '@remix-run/react';
import { View, useResponsiveClientValue, Text, LoginView } from '@backoffice/ui';
import { FormEvent, useState } from 'react';
import { sendOTP } from '../../service/login.service';
import { Console } from 'console';
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../utils/firebase.service';

export const HomePage = () => {

  const navigation = useNavigation();
  const fetcher = useFetcher();
  const [isLoading, setIsloading] = useState(false)
  const [notification, setNotification] = useState("");
  const [showOTP, setShowOTP] = useState(false)
  const [confirmObj, setConfirmObj] = useState<ConfirmationResult | null>()

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);

    const formData = new FormData(e.currentTarget);
    const phone: string = formData.get('phone') as string;
    const otp: string = formData.get('otp') as string;
    if (phone) {
      try {

        const authResult = await sendOTP(phone);
        if(authResult){
          setConfirmObj(authResult);
          setShowOTP(true);
          setIsloading(false);
        }else{
          setNotification("Ingrese un numero valido");
          setIsloading(false);
        }

      } catch (error) {
        console.error(error)
        setNotification("Ingrese un numero valido");
        setIsloading(false);
      }
    } else {

      try {
        const confirm = await confirmObj?.confirm(otp);
        console.log(confirm?.user.getIdToken())
        if (confirm) {
          const token = await confirm?.user.getIdToken();

          await fetcher.submit({ __session: token }, { method: "post" });

        } else {
          setIsloading(false);
        }
      } catch (error) {
        console.error(error);
        setNotification("Verificacion Incorrecta");
        setIsloading(false);
      }
    }
  };

  return (
    <LoginView
      sendForm={submitForm}
      notification={notification}
      isLoading={isLoading}
      showOTP={showOTP}
    />
  );
};


