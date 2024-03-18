import type { FormEvent } from 'react';
import { useState } from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  Icon,
  Link,
  Text,
  TextField,
  View,
} from '../../../../atomic';
import { IconEyeFill, IconEyeSlashFill } from '../../../../../icons';
import { ValidationUtils } from '../../../../../utils';
import type { LoginFormProps } from './LoginForm.types';

const LoginForm = (props: LoginFormProps) => {
  const { sendForm, isLoading } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredentials, setInvalidCredentialsError] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = () =>
    ValidationUtils.validateMinLength(email, 6) &&
    ValidationUtils.validateEmailAddress(email);
  const isPasswordValid = () => ValidationUtils.validateMinLength(password, 6);

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmailValid() && isPasswordValid()) {
      sendForm(e);
    } else {
      setInvalidEmail(!isEmailValid());
      setInvalidPassword(!isPasswordValid());
    }
  };

  return (
    <form method="POST" onSubmit={(e) => validateForm(e)}>
      <View gap={6} direction="row">
        <View.Item columns={12}>
          <FormControl hasError={invalidEmail || invalidPassword}>
            <FormControl.Error>
              Credenciales Invalidas
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={12}>
          <FormControl hasError={invalidCredentials || invalidEmail}>
            <TextField
              name="email"
              placeholder="Ingrese su Email"
              size="xlarge"
              disabled={isLoading}
              onChange={(e) => setEmail(e.value)}
              inputAttributes={{
                autoComplete: 'email',
                type: 'email',
                'aria-label': "Ingrese su Email",
                tabIndex: 1,
                onBlur: () => setInvalidEmail(!isEmailValid()),
              }}
            />
            <FormControl.Error>
              Error de correo
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={12}>
          <FormControl hasError={invalidCredentials || invalidPassword}>
            <View overflow="hidden">
              <TextField
                name="password"
                placeholder={"Ingrese su Contraseña"}
                size="xlarge"
                disabled={isLoading}
                onChange={(e) => setPassword(e.value)}
                inputAttributes={{
                  autoComplete: 'current-password',
                  type: showPassword ? 'text' : 'password',
                  'aria-label': "Ingrese su Contraseña",
                  tabIndex: 2,
                  onBlur: () => setInvalidPassword(!isPasswordValid()),
                }}
              />
              <div style={{ position: 'absolute', bottom: 8, right: 16 }}>
                <Button
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    svg={showPassword ? IconEyeFill : IconEyeSlashFill}
                    size={6}
                  />
                </Button>
              </div>
            </View>
            <FormControl.Error>
              Error de contraseña
            </FormControl.Error>
          </FormControl>
          <View paddingTop={1}>
            <Link
              color="primary"
              href="/forgot-password"
              disabled={isLoading}
            >
              Recuperar Clave
            </Link>
          </View>
        </View.Item>

        <View.Item columns={12}>
          <View
            gap={{ l: 0, s: 6 }}
            align="center"
            direction="row"
            paddingTop={{ l: 5 }}
          >
            <View.Item columns={{ l: 6, s: 12 }}>
              <View direction="row" justify="start">
                <Checkbox
                  name="keepSignedIn"
                  disabled={isLoading}
                  inputAttributes={{
                    'aria-label': "Recordar Clave",
                    tabIndex: 3,
                  }}
                >
                  <View paddingStart={1}>
                    <Text variant="body-3">
                      Recordar Clave
                    </Text>
                  </View>
                </Checkbox>
              </View>
            </View.Item>

            <View.Item columns={{ l: 6, s: 12 }}>
              <View align="end">
                <Button
                  color="black"
                  fullWidth={{ l: false, s: true }}
                  loading={isLoading}
                  size="xlarge"
                  type="submit"
                  attributes={{
                    'aria-label': "Iniciar Sesion",
                    tabIndex: 4,
                  }}
                >
                  Iniciar Sesion
                </Button>
              </View>
            </View.Item>
          </View>
        </View.Item>

        <View.Item columns={12}>
          <View
            direction={{ l: 'row', s: 'column' }}
            align={{ l: 'start', s: 'center' }}
            gap={{ l: 1, s: 0 }}
            paddingTop={{ l: 11 }}
          >
            <Link color="primary" href="./sign-up" disabled={isLoading}>
              <Text variant="body-2" weight="medium">
                Crear Cuenta
              </Text>
            </Link>
          </View>
        </View.Item>
      </View>
    </form>
  );
};
export default LoginForm;
