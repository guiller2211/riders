import type { Meta, StoryObj } from '@storybook/react';

import CheckoutPayment from './CheckoutPayment';

const meta: Meta<typeof CheckoutPayment> = {
  title: 'Smith Components/Checkout/Checkout Payment',
  component: CheckoutPayment,
};

export default meta;
type Story = StoryObj<typeof CheckoutPayment>;

export const Primary: Story = {
  args: {
    isActive: false,
  },
};
