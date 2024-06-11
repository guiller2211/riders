import OrderDetailsPage from '../ui/pages/my-account/order.details.page';
import { LoaderArgs, redirect } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getCustomerByUid } from '../service/user.data.service';
import { Customer } from '@ducati/types';
import { meta } from '../root';
import { getOrderByNumOrder } from '../service/order.data.service';
import { CheckoutOverviewProp } from '@ducati/ui';

export async function loader({
  request,
  params
}: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'root.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  let order;
  let overview: CheckoutOverviewProp;

  if (!session.has('__session')) {
    redirect('/');
  }

  const uid: string = session.get('user')['uid'];
  user = await getCustomerByUid(uid);
  order = await getOrderByNumOrder(Number(params.numOrder))

  overview = {
    numOrder: order?.numOrder,
    contact: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      phone: order?.shippingInfo?.phone ?? ''
    },
    shipping: {
      address: order?.shippingInfo?.streetName ?? '',
      region: order?.shippingInfo?.region?.name,
      commune: order?.shippingInfo?.communes?.name,
    },
    method: {
      method: order?.shippingMethod?.duration ?? ''
    },
    paid: {
      name: order?.paymentInfo?.name ?? '',
      ending: order?.paymentInfo?.ending ?? '',
      type: order?.paymentInfo?.type ?? '',
    }
  }
  return typedjson({
    user,
    order,
    overview
  });
}

export default OrderDetailsPage;
export { meta };
export { ErrorBoundary };
