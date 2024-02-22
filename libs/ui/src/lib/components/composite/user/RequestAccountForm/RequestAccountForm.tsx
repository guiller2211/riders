import type { FormEvent } from 'react';
import { useState } from 'react';

import {
  Button,
  Checkbox,
  Select,
  Text,
  TextField,
  View,
  FormControl,
} from '../../../atomic';
import { ValidationUtils } from '../../../../utils';
import type { RequestAccountFormProps } from './RequestAccountForm.types';

const RequestAccountForm = (props: RequestAccountFormProps) => {
  const { sendForm } = props;
  const [isLoading] = useState(false); // FIXME
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [, setAddressLine] = useState(''); // FIXME
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [firstNameHasError, setFirstNameHasError] = useState(false);
  const [lastNameHasError, setLastNameHasError] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);
  const [companyHasError, setCompanyHasError] = useState(false);
  const [addressHasError, setAddressHasError] = useState(false);
  const [cityHasError, setCityHasError] = useState(false);
  const [stateHasError, setStateHasError] = useState(false);
  const [zipCodeHasError, setZipCodeHasError] = useState(false);
  const [agreeTermsHasError, setAgreeTermsHasError] = useState(false);

  const isStateValid = () => {
    return ValidationUtils.isOptionSelected(state);
  };

  const isFirstNameValid = () => {
    return (
      ValidationUtils.validateMinAndMaxLength(firstName, 3, 100) &&
      ValidationUtils.isFieldText(firstName)
    );
  };

  const isLastNameValid = () => {
    return (
      ValidationUtils.validateMinAndMaxLength(lastName, 3, 100) &&
      ValidationUtils.isFieldText(lastName)
    );
  };

  const isEmailValid = () => {
    return (
      ValidationUtils.validateMinAndMaxLength(email, 10, 100) &&
      ValidationUtils.validateEmailAddress(email)
    );
  };
  const isCompanyValid = () => {
    return (
      ValidationUtils.validateMinAndMaxLength(company, 10, 100) &&
      ValidationUtils.isFieldText(company)
    );
  };
  const isAddressValid = () => {
    return (
      ValidationUtils.validateMinAndMaxLength(address, 10, 100) &&
      ValidationUtils.isFieldText(address)
    );
  };
  const isCityValid = () => {
    return (
      ValidationUtils.validateMinAndMaxLength(city, 10, 100) &&
      ValidationUtils.isFieldText(city)
    );
  };
  const isZipCodeValid = () => {
    return (
      ValidationUtils.validateMinAndMaxLength(zipCode, 10, 100) &&
      ValidationUtils.isFieldText(zipCode)
    );
  };

  const isAgreeTermsValid = () => {
    return agreeTerms;
  };

  const firstNameValidation = () => {
    setFirstNameHasError(!isFirstNameValid());
  };

  const lastNameValidation = () => {
    setLastNameHasError(!isLastNameValid());
  };

  const emailValidation = () => {
    setEmailHasError(!isEmailValid());
  };
  const companyValidation = () => {
    setCompanyHasError(!isCompanyValid());
  };

  const addressValidation = () => {
    setAddressHasError(!isAddressValid());
  };

  const cityValidation = () => {
    setCityHasError(!isCityValid());
  };

  const stateValidation = () => {
    setStateHasError(!isStateValid());
  };

  const zipCodeValidation = () => {
    setZipCodeHasError(!isZipCodeValid());
  };

  const agreeTermsValidation = () => {
    setAgreeTermsHasError(!isAgreeTermsValid());
  };

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    const validForm =
      isStateValid() &&
      isFirstNameValid() &&
      isLastNameValid() &&
      isEmailValid() &&
      isCompanyValid() &&
      isAddressValid() &&
      isCityValid() &&
      isZipCodeValid() &&
      isAgreeTermsValid();

    if (!validForm) {
      isAgreeTermsValid();
      firstNameValidation();
      lastNameValidation();
      emailValidation();
      companyValidation();
      addressValidation();
      cityValidation();
      stateValidation();
      zipCodeValidation();
      agreeTermsValidation();
      e.preventDefault();
    } else {
      sendForm(true);
    }
  };
  return (
  /*   <form method="post" onSubmit={validateForm}>
      <View gap={3} direction="row">
        <View.Item columns={12}>
          <Text variant="featured-3" weight="bold">
            {translate('requestAccount.subHeading')}
          </Text>
        </View.Item>

        <View.Item columns={12}>
          <View paddingBottom={3}>
            <Text variant="body-3">
              {translate('requestAccount.description')}
            </Text>
          </View>
        </View.Item>

        <View.Item columns={12}>
          <View direction="row" gap={6}>
            <View.Item columns={6}>
              <FormControl hasError={firstNameHasError}>
                <TextField
                  name="firstName"
                  onChange={(e) => setFirstName(e.value)}
                  placeholder={translate(
                    'requestAccount.placeholders.firstName',
                  )}
                  size="xlarge"
                />
                <FormControl.Error>
                  {translate('forms.validations.required', 'layout')}
                </FormControl.Error>
              </FormControl>
            </View.Item>

            <View.Item columns={6}>
              <FormControl hasError={lastNameHasError}>
                <TextField
                  name="lastName"
                  onChange={(e) => setLastName(e.value)}
                  placeholder={translate(
                    'requestAccount.placeholders.lastName',
                  )}
                  size="xlarge"
                />
                <FormControl.Error>
                  {translate('forms.validations.required', 'layout')}
                </FormControl.Error>
              </FormControl>
            </View.Item>

            <View.Item columns={12}>
              <FormControl hasError={emailHasError}>
                <TextField
                  name="email"
                  onChange={(e) => setEmail(e.value)}
                  placeholder={translate('requestAccount.placeholders.email')}
                  size="xlarge"
                />
                <FormControl.Error>
                  {translate('forms.validations.required', 'layout')}
                </FormControl.Error>
              </FormControl>
            </View.Item>

            <View.Item columns={12}>
              <FormControl hasError={companyHasError}>
                <TextField
                  name="company"
                  onChange={(e) => setCompany(e.value)}
                  placeholder={translate('requestAccount.placeholders.company')}
                  size="xlarge"
                />
                <FormControl.Error>
                  {translate('forms.validations.required', 'layout')}
                </FormControl.Error>
              </FormControl>
            </View.Item>
            <View.Item columns={12}>
              <FormControl hasError={addressHasError}>
                <TextField
                  name="address"
                  onChange={(e) => setAddress(e.value)}
                  placeholder={translate('requestAccount.placeholders.address')}
                  size="xlarge"
                />
                <FormControl.Error>
                  {translate('forms.validations.required', 'layout')}
                </FormControl.Error>
              </FormControl>
            </View.Item>
            <View.Item columns={12}>
              <TextField
                name="address2"
                onChange={(e) => setAddressLine(e.value)}
                placeholder={translate('requestAccount.placeholders.address2')}
                size="xlarge"
              />
            </View.Item>
            <View.Item columns={6}>
              <FormControl hasError={cityHasError}>
                <TextField
                  name="city"
                  onChange={(e) => setCity(e.value)}
                  placeholder={translate('requestAccount.placeholders.city')}
                  size="xlarge"
                />
                <FormControl.Error>
                  {translate('forms.validations.required', 'layout')}
                </FormControl.Error>
              </FormControl>
            </View.Item>
            <View.Item columns={6}>
              <FormControl hasError={stateHasError}>
                <Select
                  name="state"
                  onChange={(e) => setState(e.value)}
                  placeholder={translate('requestAccount.placeholders.state')}
                  size="xlarge"
                  options={[
                    { label: 'Option 1.', value: '0' },
                    { label: 'Option 2', value: '1' },
                  ]}
                />
                <FormControl.Error>
                  {translate('forms.validations.required', 'layout')}
                </FormControl.Error>
              </FormControl>
            </View.Item>
            <View.Item columns={12}>
              <FormControl hasError={zipCodeHasError}>
                <TextField
                  name="zipCode"
                  onChange={(e) => setZipCode(e.value)}
                  placeholder={translate('requestAccount.placeholders.zipCode')}
                  size="xlarge"
                />
                <FormControl.Error>
                  {translate('forms.validations.required', 'layout')}
                </FormControl.Error>
              </FormControl>
            </View.Item>
            <View.Item columns={12}>
              <View gap={2} direction="row" paddingTop={{ l: 5 }}>
                <View.Item>
                  <FormControl hasError={agreeTermsHasError}>
                    <Checkbox
                      name="agreeTerms"
                      onChange={(e) => setAgreeTerms(e.checked)}
                    >
                      {translate('requestAccount.acceptance', undefined, {
                        termsOfService: '/terms-of-service',
                        privacyPolicy: '/privacy-policy',
                      })}
                    </Checkbox>
                    <FormControl.Error>
                      {translate('forms.validations.required', 'layout')}
                    </FormControl.Error>
                  </FormControl>
                </View.Item>
                <View.Item columns={11}>
                  <View gap={1} direction="row">
                    <View.Item>
                      <Text variant="body-1">
                    
                      </Text>
                    </View.Item>
                  </View>
                </View.Item>
              </View>
            </View.Item>

            <View.Item columns={12}>
              <View paddingTop={5}>
                <Button
                  color="primary"
                  size="xlarge"
                  loading={isLoading}
                  type="submit"
                  fullWidth
                >
                  {translate('requestAccount.submit')}
                </Button>
              </View>
            </View.Item>
          </View>
        </View.Item>
      </View>
    </form> */
    <></>
  );
};
export default RequestAccountForm;
