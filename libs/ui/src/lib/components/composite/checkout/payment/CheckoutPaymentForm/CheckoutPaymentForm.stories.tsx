import type { Meta, StoryObj } from '@storybook/react';

import CheckoutPaymentForm from './CheckoutPaymentForm';

const meta: Meta<typeof CheckoutPaymentForm> = {
  title: 'Smith Components/Checkout/Checkout Payment Form',
  component: CheckoutPaymentForm,
};

export default meta;
type Story = StoryObj<typeof CheckoutPaymentForm>;

export const Primary: Story = {
  args: {
    isDefaultCheck: true,
    isShippingAddress: true,
  },
};
