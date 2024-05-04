import CartPage from '../ui/pages/cart.page';
import { meta } from '../root';
import { LoaderArgs } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { LayoutProps } from '@ducati/ui';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../utils/fb.sessions.server';
import { getCustomerByUid } from '../service/user.data.service';
import { CartData, Customer } from '@ducati/types';
import { getCartById } from '../service/cart.data.service';

export async function loader({ request }: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'root.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
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
    }
  }

  return typedjson({ cart });
}


export default CartPage;
export { meta };
export { ErrorBoundary };
