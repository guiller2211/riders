import { meta } from '../root';
import { LoaderArgs } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../utils/fb.sessions.server';
import { getCustomerByUid } from '../service/user.data.service';
import { AddressData, CartData, Customer, ShippingMethod } from '@ducati/types';
import { getCartById } from '../service/cart.data.service';
import CheckoutShippingPage from '../ui/pages/checkout.shipping.page';
import { CheckoutShippingProps } from '@ducati/ui';

export default CheckoutShippingPage;
export { meta };
export { ErrorBoundary };

export async function action() {

}

enum Namespaces {
  checkoutShipping = 'checkoutShipping',
  address = 'address',
  addresses = 'addresses',
}
export async function loader({ request, context: { registry } }: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'checkout.shipping.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  let shippingMethods: ShippingMethod[] = [];

  if (session.has('__session')) {
    const uid: string = session.get('user')['uid'];
    user = await getCustomerByUid(uid);

  }

  // Cart
  let cart: CartData | undefined | null = undefined;
  const cartSessionID = user?.cartId == null ? null : user.cartId;
  if (cartSessionID) {
    if (user && user.id) {
      cart = await getCartById(cartSessionID);

      if (cart?.shippingAddress) {
        shippingMethods = [];
      }
    }
  }
  const addresses: AddressData[] = [
    /*   {
        id: '1',
        key: 'key1',
        firstName: 'John',
        lastName: 'Doe',
        streetNumber: '123',
        streetName: 'Main Street',
        city: 'Cityville',
        state: {
          countryIso: 'US',
          isocode: 'CA',
          isocodeShort: 'CA',
          name: 'California',
        },
        region: {
          uid: '2',
          isocode: 'US-CA',
          name: 'Southern California',
        },
        communes: {
          uid: '3',
          idRegion: '2',
          isocode: 'US-CA-001',
          name: 'Los Angeles',
        },
        postalCode: '12345',
        country: {
          isocode: 'US',
          name: 'United States',
        },
        phone: '123-456-7890',
        email: 'john@example.com',
        shippingAddress: true,
        billingAddress: true,
        defaultShippingAddress: true,
        defaultBillingAddress: true,
      },
      {
        id: '2',
        key: 'key1',
        firstName: 'John',
        lastName: 'Doe',
        streetNumber: '123',
        streetName: 'Main Street',
        city: 'Cityville',
        state: {
          countryIso: 'US',
          isocode: 'CA',
          isocodeShort: 'CA',
          name: 'California',
        },
        region: {
          uid: '2',
          isocode: 'US-CA',
          name: 'Southern California',
        },
        communes: {
          uid: '3',
          idRegion: '2',
          isocode: 'US-CA-001',
          name: 'Los Angeles',
        },
        postalCode: '12345',
        country: {
          isocode: 'US',
          name: 'United States',
        },
        phone: '123-456-7890',
        email: 'john@example.com',
        shippingAddress: true,
        billingAddress: true,
        defaultShippingAddress: false,
        defaultBillingAddress: false,
      } */
  ];
  const shippingProps: CheckoutShippingProps = {
    checkoutShippingMethods: {
      methods: shippingMethods,
    },
    addresses,
  };

  return typedjson({ cart, shippingProps, addresses });
}
