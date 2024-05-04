import type { Meta, StoryObj } from '@storybook/react';

import CheckoutReviewOrder from './CheckoutReviewOrder';
import { CreditCardEnum } from '../../../shared';

const meta: Meta<typeof CheckoutReviewOrder> = {
  title: 'Smith Components/Checkout/Checkout Order Review',
  component: CheckoutReviewOrder,
};

export default meta;
type Story = StoryObj<typeof CheckoutReviewOrder>;

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
    overview: {
      paid: {
        month: '01',
        year: '25',
        ending: '1234',
        type: CreditCardEnum.Visa,
      },
      method: {
        method: '4-6 Business Day Standard Ground — Est Arrival Friday',
      },
      contact: { email: 'test@test.cl', firstName: 'hydra', lastName: '' },
      shipping: { address: '4499 Christie Way Billerica, MA 01862' },
    },
    cart: {
      code: '00001',
      totalPriceWithTax: {
        value: {
          centsAmount: 200.0,
          currency,
        },
      },
      entries: [
        {
          entryId: 'ad0b64a0-aa78-4e39-90cd-28a6385bc247',
          entryNumber: 0,
          quantity: 2,
          product: {
            image: {
              src: '/assets/images/product/product1.png',
              width: '100%',
            },
            productUrl: 'http://google.com',
            name: 'Sample Product Name 1',
            brand: 'Sample Brand Name 1',
            sku: 'SKU Number',
            price: {
              price: '$499.99',
              originalPrice: '$624.99',
              saving: 'Save 25%',
            },
            stock: 1000,
          },
          basePrice: {
            value: {
              centsAmount: 200.0,
              currency,
            },
          },
          totalPrice: {
            value: {
              centsAmount: 200.0,
              currency,
            },
          },
        },
        {
          entryId: 'bd0b64a0-aa78-4e39-90cd-28a6385bc247',
          entryNumber: 1,
          quantity: 2,
          product: {
            image: {
              src: '/assets/images/product/product2.png',
              width: '100%',
            },
            productUrl: 'http://google.com',
            name: 'Sample Product Name 2',
            brand: 'Sample Brand Name 2',
            sku: 'SKU Number',
            price: {
              price: '$499.99',
              originalPrice: '$624.99',
              saving: 'Save 25%',
            },
            stock: 1000,
          },
          basePrice: {
            value: {
              centsAmount: 200.0,
              currency,
            },
          },
          totalPrice: {
            value: {
              centsAmount: 200.0,
              currency,
            },
          },
        },
        {
          entryId: 'cd0b64a0-aa78-4e39-90cd-28a6385bc247',
          entryNumber: 2,
          quantity: 2,
          product: {
            image: {
              src: '/assets/images/product/product3.png',
              width: '100%',
            },
            productUrl: 'http://google.com',
            name: 'Sample Product Name 3',
            brand: 'Sample Brand Name 3',
            sku: 'SKU Number',
            price: {
              price: '$499.99',
              originalPrice: '$624.99',
              saving: 'Save 25%',
            },
            stock: 1000,
          },
          basePrice: {
            value: {
              centsAmount: 200.0,
              currency,
            },
          },
          totalPrice: {
            value: {
              centsAmount: 200.0,
              currency,
            },
          },
        },
        {
          entryId: 'dd0b64a0-aa78-4e39-90cd-28a6385bc247',
          entryNumber: 3,
          quantity: 2,
          product: {
            image: {
              src: '/assets/images/product/product4.png',
              width: '100%',
            },
            productUrl: 'http://google.com',
            name: 'Sample Product Name 4',
            brand: 'Sample Brand Name 4',
            sku: 'SKU Number',
            price: {
              price: '$499.99',
              originalPrice: '$624.99',
              saving: 'Save 25%',
            },
            stock: 1000,
          },
          basePrice: {
            value: {
              centsAmount: 200.0,
              currency,
            },
          },
          totalPrice: {
            value: {
              centsAmount: 200.0,
              currency,
            },
          },
        },
      ],
    },
    orderSummaryItems: [
      {
        title: 'Item(s) Subtotal',
        value: '$182.56',
        color: 'neutral',
      },
      {
        title: 'Shipping',
        value: 'Free',
        color: 'positive',
      },
      {
        title: 'Discounts',
        value: '$17.02',
        color: 'positive',
      },
      {
        title: 'Sales Tax (GA 4%)',
        value: '$0.00',
        color: 'neutral',
      },
    ],
  },
};
