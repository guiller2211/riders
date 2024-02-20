import type { Meta, StoryObj } from '@storybook/react';

import CartHeader from './CartHeader';

const meta: Meta<typeof CartHeader> = {
  title: 'Smith Components/Cart/CartHeader',
  component: CartHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CartHeader>;

export const Primary: Story = {
  args: {
    totalItems: 2,
  },
};
