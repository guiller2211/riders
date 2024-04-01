import type { HeadersFunction, LoaderArgs } from '@remix-run/node';
import { CurrencySymbolPosition, DeliveryStatus } from '@ducati/types';

import { typedjson } from 'remix-typedjson';

import { meta } from '../root';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import OrderDetailsPage from '../ui/pages/my-account/order.details.page';

export const ROUTE_NAME = 'order';
export const handle = { i18n: 'product' };
const currency = {
  isocode: 'USD',
  name: 'US Dollars',
  symbol: '$',
  symbolPosition: CurrencySymbolPosition.BEFORE,
  decimalPlaces: 2,
};

function getOrder() {
  return {
    code: '654321',
    createdDate: new Date(),
    user: { firstName: 'Hydra' },
    deliveryMode: 'free',
    deliveryStatus: DeliveryStatus.InProcess,
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
            value: {
              centsAmount: 62499,
              currency,
            },
            discount: {
              centsAmount: 0,
              currency,
            },
            promotionMessage: 'Save 25%',
          },
          stock: 13,
        },
      
        totalPrice: {
       
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
          name: 'Sample Product Name 1',
          brand: 'Sample Brand Name 1',
          sku: 'SKU Number',
          price: {
            value: {
              centsAmount: 62499,
              currency,
            },
            discount: {
              centsAmount: 0,
              currency,
            },
            promotionMessage: 'Save 25%',
          },
          stock: 13,
        },
       
        totalPrice: {
         
        },
      },
    ],
    guestCustomer: false,
  
    status: 'delivery',
   
    totalItems: 3,
  

    shippingTotal: {
     /*  value: {
        centsAmount: 554,
        currency: {
          isocode: 'USD',
          name: 'US Dollar',
          symbol: '$',
          symbolPosition: CurrencySymbolPosition.BEFORE,
          decimalPlaces: 2,
        },
      }, */
    },
  };
}

function getPayment() {
  return {
    name: 'George Clanton',
    ending: '8712',
    month: '01',
    year: '25',
    address: '',
    expired: false,
    preferred: false,
  };
}



function getShippingMethod() {
  return {
    id: 'qwer',
    name: 'US Standard Cost Shipping - Free over $200',
    price: {
    },
    daysRange: '2-3',
    estimatedArrival: 'Wednesday',
    requirePhysicalAddress: true,
  };
}

function getShipping() {
  return {
    code: 'abcd',
    firstName: 'Lewis',
    lastName: 'Hamilton',
    line1: 'Street Fighter 322',
    line2: '',
    city: 'City 2',
    state: 'State 2',
    zipCode: '50092',
    phone: '+1681304922',
    defaultAddress: true,
    valid: true,
    shippingOn: 'Oct 24, 2022',
  };
}

function getBilled() {
  return {
    code: 'abcd',
    firstName: 'Lewis',
    lastName: 'Hamilton',
    line1: 'Street Fighter 322',
    line2: '',
    city: 'City 2',
    state: 'State 2',
    zipCode: '50092',
    phone: '+1681304922',
    defaultAddress: true,
    valid: true,
  };
}

function getPlaced() {
  return {
    day: '10',
    month: '10',
    year: '2022',
    date: '10/10/2022',
  };
}

export async function loader({ request, context: { registry } }: LoaderArgs) {


  const order = getOrder();
  const payment = getPayment();
  const shippingMethod = getShippingMethod();
  const shipping = getShipping();
  const billed = getBilled();
  const placed = getPlaced();

  return typedjson(
    {
      order,
      payment,
      shippingMethod,
      shipping,
      billed,
      placed,
    }
  );
}
export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { 'Cache-Control': loaderHeaders.get('Cache-Control') ?? 'no-cache' };
};
export default OrderDetailsPage;
export { meta };
export { ErrorBoundary };
