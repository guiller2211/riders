import { useState } from 'react';
import type { FormEvent } from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  Icon,
  Link,
  Select,
  Text,
  TextField,
  View,
} from '../../../atomic';
import { IconEyeFill, IconEyeSlashFill } from '../../../../icons';
import { ValidationUtils } from '../../../../utils';
import type { FormProductProps } from './FormProduct.types';

export const FormProduct = (props: FormProductProps) => {
  const { sendForm, isLoading, data } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptanceTerms, setAcceptanceTerms] = useState(false);

  const [firstNameHasError, setFirstNameHasError] = useState(false);
  const [lastNameHasError, setLastNameHasError] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [confirmPasswordHasError, setConfirmPasswordHasError] = useState(false);
  const [acceptanceTermsHasError, setAcceptanceTermsHasError] = useState(false);

  const isFirstNameValid = () =>
    ValidationUtils.validateMinAndMaxLength(firstName, 3, 100) &&
    ValidationUtils.isFieldText(firstName);
  const isLastNameValid = () =>
    ValidationUtils.validateMinAndMaxLength(lastName, 3, 100) &&
    ValidationUtils.isFieldText(lastName);
  const isEmailValid = () =>
    ValidationUtils.validateMinAndMaxLength(email, 10, 100) &&
    ValidationUtils.validateEmailAddress(email);
  const isPasswordValid = () =>
    ValidationUtils.validateMinAndMaxLength(password, 6, 30);
  const isConfirmPasswordValid = () =>
    ValidationUtils.validateMinAndMaxLength(confirmPassword, 6, 30) &&
    password === confirmPassword;
  const isAcceptanceValid = () => acceptanceTerms;

  const firstNameValidation = () => setFirstNameHasError(!isFirstNameValid());
  const lastNameValidation = () => setLastNameHasError(!isLastNameValid());
  const emailValidation = () => setEmailHasError(!isEmailValid());
  const passwordValidation = () => setPasswordHasError(!isPasswordValid());
  const confirmPasswordValidation = () =>
    setConfirmPasswordHasError(!isConfirmPasswordValid());
  const acceptanceValidation = () =>
    setAcceptanceTermsHasError(!isAcceptanceValid());

  const isValidForm = () => {
    return !!(
      isFirstNameValid() &&
      isLastNameValid() &&
      isEmailValid() &&
      isPasswordValid() &&
      isConfirmPasswordValid() &&
      isAcceptanceValid()
    );
  };

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidForm()) {
      sendForm(e);
    } else {
      firstNameValidation();
      lastNameValidation();
      emailValidation();
      passwordValidation();
      confirmPasswordValidation();
      acceptanceValidation();
      e.preventDefault();
    }
  };
  console.log(data);
  return (
    <form method="POST" onSubmit={(e) => validateForm(e)}>
      <View gap={6} direction="row">

        <View.Item columns={6}>
          <FormControl hasError={firstNameHasError}>
            <TextField
              name="name"
              placeholder='Nombre'
              onChange={(e) => setFirstName(e.value)}
              disabled={isLoading}
              size="xlarge"
              value={data.name}
              inputAttributes={{
                'aria-label': 'Nombre',
                tabIndex: 2,
                onFocus: () => setFirstNameHasError(false),
                onBlur: () => firstNameValidation(),
              }}
            />
            <FormControl.Error>
              Este campo es obligatorio
            </FormControl.Error>
          </FormControl>
        </View.Item>

{/*         <View.Item columns={6}>
          <FormControl hasError={lastNameHasError}>
            <TextField
              name="lastName"
              placeholder='Apellido'
              onChange={(e) => setLastName(e.value)}
              disabled={isLoading}
              size="xlarge"
              value={data.lastName}
              inputAttributes={{
                'aria-label': 'Apellido',
                tabIndex: 3,
                onFocus: () => setLastNameHasError(false),
                onBlur: () => lastNameValidation(),
              }}
            />
            <FormControl.Error>
              Este campo es obligatorio
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={6}>
          <FormControl hasError={emailHasError}>
            <TextField
              name="email"
              placeholder='Email'
              onChange={(e) => setEmail(e.value)}
              disabled={isLoading}
              size="xlarge"
              value={data.email}
              inputAttributes={{
                type: 'email',
                'aria-label': 'Email',
                tabIndex: 4,
                onFocus: () => setEmailHasError(false),
                onBlur: () => emailValidation(),
              }}
            />
            <FormControl.Error>
              Este campo es obligatorio
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={6}>
          <FormControl hasError={passwordHasError}>
            <View overflow="hidden">
              <TextField
                name="password"
                placeholder='Contraseña'
                onChange={(e) => setPassword(e.value)}
                disabled={isLoading}
                size="xlarge"
                inputAttributes={{
                  type: showPassword ? 'text' : 'password',
                  'aria-label': 'Contraseña',
                  tabIndex: 5,
                  onFocus: () => setPasswordHasError(false),
                  onBlur: () => passwordValidation(),
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
              Este campo es obligatorio
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={6}>
          <FormControl hasError={confirmPasswordHasError}>
            <View overflow="hidden">
              <TextField
                name="confirmPassword"
                placeholder='Confirme Contraseña'
                onChange={(e) => setConfirmPassword(e.value)}
                disabled={isLoading}
                size="xlarge"
                inputAttributes={{
                  type: showConfirmPassword ? 'text' : 'password',
                  'aria-label': 'Confirme Contraseña',
                  tabIndex: 6,
                  onFocus: () => setConfirmPasswordHasError(false),
                  onBlur: () => confirmPasswordValidation(),
                }}
              />
              <div style={{ position: 'absolute', bottom: 8, right: 16 }}>
                <Button
                  variant="ghost"
                  onClick={() => setShowConfirmPassword(!showPassword)}
                >
                  <Icon
                    svg={showConfirmPassword ? IconEyeFill : IconEyeSlashFill}
                    size={6}
                  />
                </Button>
              </div>
            </View>
            <FormControl.Error>
              No coinciden las contraseñas
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={12}>
          <View direction='row' gap={10}>
            <View.Item columns={6}>
              <Button
                color="primary"
                size="xlarge"
                loading={isLoading}
                type="submit"
                fullWidth
                attributes={{
                  'aria-label': 'Registrar',
                  tabIndex: 9,
                }}
              >
                Editar
              </Button>
            </View.Item>

            <View.Item columns={6}>
              <Button
                color="critical"
                size="xlarge"
                loading={isLoading}
                type="submit"
                fullWidth
                attributes={{
                  'aria-label': 'Registrar',
                  tabIndex: 9,
                }}
              >
                Eliminar
              </Button>
            </View.Item>
          </View>
        </View.Item> */}

      </View>
    </form>
  );
};
