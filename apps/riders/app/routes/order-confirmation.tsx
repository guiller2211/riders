import { meta } from '../root';
import { LoaderArgs } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getCustomerByUid } from '../service/user.data.service';
import { CartData, Customer, Meta } from '@riders/types';
import { getCartById } from '../service/cart.data.service';
import CheckoutConfirmationPage from '../ui/pages/order-confirmation.page';
import { CheckoutOverviewProp } from '@riders/ui';
import { getOrder } from '../service/order.data.service';
import { RemixUtils } from '../../framework/utils.server';

export default CheckoutConfirmationPage;
export { meta };
export { ErrorBoundary };

export async function loader({ request, context: { registry } }: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'checkout.shipping.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  let uid: string = '';
  let overview: CheckoutOverviewProp;
  if (session.has('__session')) {
    uid = session.get('user')['uid'];
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

  const order = await getOrder(uid);
  overview = {
    numOrder: order.numOrder,
    contact: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email != '' ? user?.email! : order.shippingInfo?.email!,
      phone: order.shippingInfo?.phone ?? ''
    },
    shipping: {
      address: order.shippingInfo?.streetName ?? '',
      region: order.shippingInfo?.region?.name,
      commune: order.shippingInfo?.communes?.name,
    },
    method: {
      method: order.shippingMethod?.duration ?? ''
    },
    paid: {
      name: order.paymentInfo?.name ?? '',
      ending: order.paymentInfo?.ending ?? '',
      type: order.paymentInfo?.type ?? '',
    }
  }

  const meta: Meta = await RemixUtils.pageMeta(
    'Confirmacion de Orden',
  );
  
  return typedjson({ cart, uid, overview, order, ...meta });
}




