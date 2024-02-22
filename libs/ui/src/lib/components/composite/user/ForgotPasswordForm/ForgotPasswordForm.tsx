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
      sendForm(true);
    }
  };
  return (
    <form method="POST" onSubmit={validateForm}>
      <View align="center" paddingTop={{ l: 4 }}>
        <View width={{ l: 160 }}>
          <View gap={6} direction="row">
            <View.Item columns={12}>
              <View paddingBottom={{ l: 3, s: 4 }}>
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
                  reiniciar
                </Button>
              </View>
            </View.Item>

            <View.Item columns={12}>
              <View
                direction={{ l: 'row', s: 'column' }}
                align={{ l: 'start', s: 'center' }}
                gap={{ l: 1, s: 0 }}
                paddingTop={5}
              >
                <Text variant="body-3">
                  click
                </Text>
                <Link color="primary" href="./login">
                  <Text variant="body-2" weight="medium">
                    click
                  </Text>
                </Link>
              </View>
            </View.Item>
          </View>
        </View>
      </View>
    </form>
  );
};
export default ForgotPasswordForm;
