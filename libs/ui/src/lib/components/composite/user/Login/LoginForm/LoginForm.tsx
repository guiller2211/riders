import type { FormEvent } from 'react';
import { useState } from 'react';

import {
  Button,
  TextField,
  View,
} from '../../../../atomic';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import type { LoginFormProps } from './LoginForm.types';
import OtpInput from 'react-otp-input'
import { useResponsiveClientValue } from '../../../../../hooks';

const LoginForm = (props: LoginFormProps) => {
  const { sendForm, isLoading, showOTP } = props;
  const [otp, setOtp] = useState('');
  const [value, setValue] = useState('+56')

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendForm(e);
  };

  return (
    <>
      {
        showOTP ?
          <form method="POST" onSubmit={(e) => validateForm(e)}>
            <View gap={6} direction="column">
              <TextField
                name="otp"
                placeholder="Ingrese Codigo"
                size="xlarge"
                onChange={(e) => setOtp(e.value)}
              />
              <Button
                color="black"
                fullWidth={useResponsiveClientValue({ l: false, s: true })}
                loading={isLoading}
                size="xlarge"
                type="submit"
                attributes={{
                  'aria-label': "Verificar Codigo",
                  tabIndex: 4,
                }}
              >
                Verificar Codigo
              </Button>
            </View>
          </form>
          :
          <form method="POST" onSubmit={(e) => validateForm(e)}>
            <View gap={6} direction="column">
              <PhoneInput
                inputProps={{ name: 'phone' }}
                placeholder="Ingrese Su Número"
                value={value}
                onChange={setValue}
                inputStyle={{ height: 50, borderRadius: 10 }}
                enableSearch
              />
              <div id="recaptcha-container"></div>
              <Button
                color="black"
                fullWidth={useResponsiveClientValue({ l: false, s: true })}
                loading={isLoading}
                size="xlarge"
                type="submit"
                attributes={{
                  'aria-label': "Verificar Codigo",
                  tabIndex: 4,
                }}
              >
                Enviar OTP
              </Button>
            </View>
          </form >
      }
    </>

  );
};
export default LoginForm;
