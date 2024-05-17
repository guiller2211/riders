import { meta } from '../root';
import { LoaderArgs } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getAddressCustomerById, getCustomerByUid } from '../service/user.data.service';
import { AddressData, CartData, Customer, ShippingMethod } from '@ducati/types';
import { getAvailableShippingMethods, getCartById } from '../service/cart.data.service';
import CheckoutShippingPage from '../ui/pages/checkout.shipping.page';
import { CheckoutShippingProps } from '@ducati/ui';

export default CheckoutShippingPage;
export { meta };
export { ErrorBoundary };

export async function loader({ request, context: { registry } }: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'checkout.shipping.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  let shippingMethods: ShippingMethod[] = [];
  let uid: string = '';
  if (session.has('__session')) {
    uid = session.get('user')['uid'];
    user = await getCustomerByUid(uid);

  }

  // Cart
  let cart: CartData | undefined | null = undefined;
  const cartSessionID = user?.cartId == null ? null : user.cartId;
  let addresses: AddressData[] = [];
  if (cartSessionID) {
    if (user && user.id) {
      cart = await getCartById(cartSessionID);
      if (user?.addressID) {
        addresses = await getAddressCustomerById(user?.addressID)
      };
        shippingMethods = await getAvailableShippingMethods();
    }
  }

  const shippingProps: CheckoutShippingProps = {
    checkoutShippingMethods: {
      methods: shippingMethods,
    },
    addresses,
    cart: cart!
  };

  return typedjson({ cart, shippingProps, uid });
}