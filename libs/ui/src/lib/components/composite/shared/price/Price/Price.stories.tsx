import type { Meta, StoryObj } from '@storybook/react';

import { default as ProductPrice } from './Price';

const meta: Meta<typeof ProductPrice> = {
  title: 'Smith Components/Shared/Price',
  component: ProductPrice,
};

export default meta;
type Story = StoryObj<typeof ProductPrice>;

enum CurrencySymbolPosition {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}
const currency = {
  isocode: 'USD',
  name: 'US Dollars',
  symbol: '$',
  symbolPosition: CurrencySymbolPosition.BEFORE,
  decimalPlaces: 2,
};
export const Primary: Story = {
  args: {
    locale: 'USD',
    value: {
      centsAmount: 50772,
      currency,
    },
    discount: {
      centsAmount: 5077,
      currency,
    },
    badges: [
      {
        message: 'Buy More, Save More',
        color: 'critical',
      },
    ],
    badgesOnTop: false,
    promotionMessage: 'Save 10%',
    text: {
      color: 'neutral',
      weight: 'bold',
      variant: 'featured-2',
    },
  },
};
