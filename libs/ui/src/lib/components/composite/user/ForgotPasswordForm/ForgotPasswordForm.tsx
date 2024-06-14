import type { FormEvent } from 'react';
import { useState } from 'react';

import {
  Button,
  FormControl,
  Link,
  Text,
  TextField,
  View,
} from '../../../atomic';
import { ValidationUtils } from '../../../../utils';
import type { ForgotPasswordFormProps } from './ForgotPasswordForm.types';
import { useResponsiveClientValue } from '../../../../hooks';
import { AppRoutes } from '@riders/types';

const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
  const { sendForm } = props;

  const [email, setEmail] = useState('');
  const [emailHasError, setEmailHasError] = useState(false);
  const [isLoading] = useState(false); // FIXME

  const isEmailValid = () => {
    return (
      ValidationUtils.validateMinAndMaxLength(email, 10, 100) &&
      ValidationUtils.validateEmailAddress(email)
    );
  };
  const emailValidation = () => {
    setEmailHasError(!isEmailValid());
  };
  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    const validForm = isEmailValid();

    if (!validForm) {
      emailValidation();
      e.preventDefault();
    } else {
      sendForm(email);
    }
  };
  return (
    <form method="POST" onSubmit={validateForm}>
      <View
        align="center"
        paddingTop={4}>
        <View
          gap={6}
          direction="row"
          backgroundColor='white'
          padding={10}
          borderRadius='large'>
          <View.Item columns={12}>
            <View paddingBottom={useResponsiveClientValue({ l: 3, s: 4 })}>
              <Text variant="featured-1">
                Recuperar clave
              </Text>
            </View>
          </View.Item>

          <View.Item columns={12}>
            <FormControl hasError={emailHasError}>
              <TextField
                onChange={(e) => setEmail(e.value)}
                name="email"
                placeholder="Ingrese email"
                size="xlarge"
              />
              <FormControl.Error>
                email invalido
              </FormControl.Error>
            </FormControl>
          </View.Item>

          <View.Item columns={12}>
            <View paddingTop={5}>
              <Button
                fullWidth
                color="primary"
                size="xlarge"
                loading={isLoading}
                type="submit"
              >
                Recuperar
              </Button>
            </View>
          </View.Item>

          <View.Item columns={12}>
            <View
              direction='column'
              align='center'
              gap={1}
              paddingTop={5}
            >
              <Link color="primary" href={AppRoutes.Login}>
                <Text variant="body-2" weight="medium">
                  Ir al Login
                </Text>
              </Link>
            </View>
          </View.Item>
        </View>
      </View>
    </form>
  );
};
export default ForgotPasswordForm;
