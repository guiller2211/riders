import type { Meta, StoryObj } from '@storybook/react';
import { CurrencySymbolPosition } from '@ducati/types';

import OrderSummary from './OrderSummary';

const meta: Meta<typeof OrderSummary> = {
  title: 'Smith Components/Cart/Order Summary',
  component: OrderSummary,
};

export default meta;
type Story = StoryObj<typeof OrderSummary>;
const currency = {
  isocode: 'USD',
  name: 'US Dollars',
  symbol: '$',
  symbolPosition: CurrencySymbolPosition.BEFORE,
  decimalPlaces: 2,
};
export const Primary: Story = {
  args: {
    showTitle: true,
    showPromotion: true,
    total: {
      locale: 'USD',
      value: {
        centsAmount: 62499,
        currency,
      },
      discount: {
        centsAmount: 12500,
        currency,
      },
      promotionMessage: 'Save 25%',
      badges: [{ color: 'critical', message: 'Buy More, Save More' }],
    },
  },
};
