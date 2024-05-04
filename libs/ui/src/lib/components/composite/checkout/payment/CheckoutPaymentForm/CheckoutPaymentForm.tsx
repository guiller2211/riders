import { useState } from 'react';

import { AddressForm } from '../../../shared';
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
import { useTranslation } from '../../../../../hooks';
import type { PaymentFormProps } from './CheckoutPaymentForm.types';

const CheckoutPaymentForm = (props: PaymentFormProps) => {
  const { isDefaultCheck, isShippingAddress } = props;
  const translate = useTranslation();

  const [cardNumber, setCardNumber] = useState('');
  const [isBilling, setIsBilling] = useState(isShippingAddress);

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

  const handleChangeShippingAddress = () => {
    setIsBilling(!isBilling);
  };
  return (
    <View direction="row">
      <View.Item columns={12}>
        <View paddingBottom={4}>
          <TextField
            name="card"
            placeholder={translate('payment.placeholders.cardNumber')}
            size="xlarge"
            icon={IconCreditCard}
            endIcon={IconCamera}
            inputAttributes={{ minLength: 16, maxLength: 26 }}
            onChange={(e) => handleChange(e.value)}
            value={cardNumber}
          />
        </View>
      </View.Item>

      <View.Item columns={12}>
        <View direction="row" paddingBottom={8}>
          <Button variant="ghost">
            <View direction="row">
              <View.Item>
                <Icon svg={IconExclamation} />
              </View.Item>
              <View.Item columns={11}>
                <View paddingStart={1}>{translate('payment.help')}</View>
              </View.Item>
            </View>
          </Button>
        </View>
      </View.Item>

      <View.Item columns={12}>
        <View direction="row" gap={6} paddingBottom={8}>
          <View.Item columns={{ s: 12, m: 4 }}>
            <Select
              name="month"
              size="xlarge"
              placeholder={translate('payment.placeholders.expMonth')}
              options={months}
            />
          </View.Item>

          <View.Item columns={{ s: 12, m: 4 }}>
            <Select
              name="year"
              placeholder={translate('payment.placeholders.expYear')}
              size="xlarge"
              options={options.map((year) => ({
                value: `${year}`,
                label: `${year}`,
              }))}
            />
          </View.Item>

          <View.Item columns={{ s: 12, m: 4 }}>
            <TextField
              name="cvv"
              placeholder={translate('payment.placeholders.cvv')}
              size="xlarge"
              endIcon={IconInfoCircle}
            />
          </View.Item>
        </View>
      </View.Item>

      <View.Item columns={12}>
        <View direction="row" paddingBottom={5}>
          <Checkbox name="defaultPayment" defaultChecked={isDefaultCheck}>
            {translate('payment.check.default')}
          </Checkbox>
        </View>
        <View direction="row" paddingBottom={10}>
          <Checkbox
            name="shippingAddress"
            defaultChecked={isBilling}
            onChange={handleChangeShippingAddress}
          >
            {translate('payment.check.shipping')}
          </Checkbox>
        </View>
      </View.Item>

      {!isBilling && (
        <View.Item columns={12}>
          <View direction="row" paddingBottom={10}>
            <AddressForm isBilling />
          </View>
        </View.Item>
      )}
    </View>
  );
};

export default CheckoutPaymentForm;
