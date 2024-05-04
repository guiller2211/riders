import { useState } from 'react';

import {
  Button,
  Checkbox,
  Icon,
  Select,
  TextField,
  View,
} from '../../../../atomic';
import {
  IconCamera,
  IconCreditCard,
  IconExclamation,
  IconInfoCircle,
} from '../../../../../icons';
import type { PaymentFormProps } from './CheckoutPaymentForm.types';
import { useResponsiveClientValue } from '../../../../../hooks';

export const CheckoutPaymentForm = (props: PaymentFormProps) => {
  const { isDefaultCheck } = props;

  const [cardNumber, setCardNumber] = useState('');
  

  const currentYear = new Date().getFullYear();
  const futureYears = Array.from(
    { length: 10 },
    (_, index) => currentYear + index + 1,
  );
  const options = [currentYear, ...futureYears];
  const months = [
    { label: '01', value: '1' },
    { label: '02', value: '2' },
    { label: '03', value: '3' },
    { label: '04', value: '4' },
    { label: '05', value: '5' },
    { label: '06', value: '6' },
    { label: '07', value: '7' },
    { label: '08', value: '8' },
    { label: '09', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];
  function validateNumeric(character: string) {
    const regexNumber = /^[0-9]+$/;
    return regexNumber.test(character);
  }

  const handleChange = (value: string) => {
    if (value) {
      const isNumeric = validateNumeric(value.substring(value.length - 1));
      if (isNumeric) {
        setCardNumber(value);
      } else {
        setCardNumber(cardNumber.substring(0, cardNumber.length));
      }
    } else {
      setCardNumber('');
    }
  };

 
  return (
    <View direction="column" gap={5}>
      <TextField
        name="card"
        placeholder='Numero de Tarjeta'
        size="xlarge"
        icon={IconCreditCard}
        endIcon={IconCamera}
        inputAttributes={{ minLength: 16, maxLength: 26 }}
        onChange={(e) => handleChange(e.value)}
        value={cardNumber}
      />

      <View direction="row" gap={6} >
        <View.Item columns={useResponsiveClientValue({ s: 12, m: 4 })}>
          <Select
            name="month"
            size="xlarge"
            placeholder='Mes Expiracion'
            options={months}
          />
        </View.Item>

        <View.Item columns={useResponsiveClientValue({ s: 12, m: 4 })}>
          <Select
            name="year"
            placeholder='Año Expiracion'
            size="xlarge"
            options={options.map((year) => ({
              value: `${year}`,
              label: `${year}`,
            }))}
          />
        </View.Item>

        <View.Item columns={useResponsiveClientValue({ s: 12, m: 4 })}>
          <TextField
            name="cvv"
            placeholder='CVV'
            size="xlarge"
            endIcon={IconInfoCircle}
          />
        </View.Item>
      </View>

      <Checkbox name="defaultPayment" defaultChecked={isDefaultCheck}>
        Tarjeta por Defecto
      </Checkbox>
    </View>
  );
};

