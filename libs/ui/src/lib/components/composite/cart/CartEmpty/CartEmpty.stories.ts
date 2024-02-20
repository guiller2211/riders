import type { Meta, StoryObj } from '@storybook/react';

import CartEmpty from './CartEmpty';

const meta: Meta<typeof CartEmpty> = {
  title: 'Smith Components/Cart/Cart Empty',
  component: CartEmpty,
};

export default meta;
type Story = StoryObj<typeof CartEmpty>;

export const Primary: Story = {
  args: {
    data: {
      link: { props: { href: '/' } },
      image: {
        desktop: { src: '/assets/images/cart/d_cartItems.png' },
        mobile: { src: '/assets/images/cart/m_cartItems.png' },
      },
    },
  },
};
