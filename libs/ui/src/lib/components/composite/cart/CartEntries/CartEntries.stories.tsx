import type { Meta, StoryObj } from '@storybook/react';

import CartEntries from './CartEntries';

const meta: Meta<typeof CartEntries> = {
  title: 'Smith Components/Cart/Cart Entries',
  component: CartEntries,
};

export default meta;
type Story = StoryObj<typeof CartEntries>;

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
};
