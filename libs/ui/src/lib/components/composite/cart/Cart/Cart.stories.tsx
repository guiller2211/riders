import type { Meta, StoryObj } from '@storybook/react';

import Cart from './Cart';

const meta: Meta<typeof Cart> = {
  title: 'Smith Components/Cart/Cart',
  component: Cart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Cart>;

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
    cart: {
      code: '1',
      entries: [
        {
          entryId: '1',
          entryNumber: 1,
          product: {
            price: {
              value: {
                centsAmount: 199.98,
                currency,
              },
            },
          },
          quantity: 1,
          basePrice: {
            value: {
              centsAmount: 199.98,
              currency,
            },
          },
          totalPrice: {
            value: {
              centsAmount: 199.98,
              currency,
            },
          },
        },
      ],
      totalPriceWithTax: {
        value: {
          centsAmount: 199.98,
          currency,
        },
      },
      subTotal: {
        value: {
          centsAmount: 199.98,
          currency,
        },
      },
      totalDiscounts: {
        value: {
          centsAmount: 0,
          currency,
        },
      },
      totalTax: {
        value: {
          centsAmount: 0,
          currency,
        },
      },
    },
    summary: {
      showTitle: true,
      showPromotion: true,
      total: {
        value: {
          centsAmount: 199.98,
          currency,
        },
      },
      orderSummaryItems: [
        {
          title: 'Test product',
          value: {
            value: {
              centsAmount: 199.98,
              currency,
            },
          },
          render: () => {
            return <></>;
          },
        },
      ],
    },
  },
};
