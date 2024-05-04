import type { Meta, StoryObj } from '@storybook/react';

import CheckoutPaymentMethod from './CheckoutPaymentMethod';
import { CreditCardEnum } from '../../../shared';

const meta: Meta<typeof CheckoutPaymentMethod> = {
  title: 'Smith Components/Checkout/Checkout Payment Method',
  component: CheckoutPaymentMethod,
};

export default meta;
type Story = StoryObj<typeof CheckoutPaymentMethod>;

export const Primary: Story = {
  args: {
    methods: [
      {
        type: CreditCardEnum.Visa,
        name: 'Nancy Rollins',
        ending: '4444',
        month: '05',
        year: '29',
        address: '2201 Flint Street, Atlanta, GA 30303',
        expired: false,
        preferred: true,
      },
      {
        type: CreditCardEnum.Visa,
        name: 'George Clanton',
        ending: '8712',
        month: '01',
        year: '25',
        address: '',
        expired: false,
        preferred: false,
      },
      {
        type: CreditCardEnum.Visa,
        name: 'George Clanton',
        ending: '9932',
        month: '07',
        year: '27',
        address: '2201 Flint Street, Atlanta, GA 30303',
        expired: false,
        preferred: false,
      },
      {
        type: CreditCardEnum.Visa,
        name: 'Nancy Rollins',
        ending: '5476',
        month: '12',
        year: '202',
        address: '2201 Flint Street, Atlanta, GA 30303',
        expired: true,
        preferred: false,
      },
    ],
  },
};
