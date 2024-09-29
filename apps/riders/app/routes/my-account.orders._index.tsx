import OrdersPage from '../ui/pages/my-account/orders.page';
import { LoaderArgs, redirect } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getCustomerByUid } from '../service/user.data.service';
import { AppRoutes, Customer, Meta } from '@riders/types';
import { meta } from '../root';
import { getOrders } from '../service/order.data.service';
import { RemixUtils } from '../../framework/utils.server';
import { OrderData } from '@riders/ui';
export interface LoaderData {
  user: Customer;
  orders: OrderData[];
}
export async function loader({
  request,
}: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'root.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  let orders;

  if (!session.has('__session')) {
    return redirect(AppRoutes.Login); 
  }

  const uid: string = session.get('user')['uid'];
  user = await getCustomerByUid(uid);
  orders = await getOrders(uid)

  const meta: Meta = await RemixUtils.pageMeta(
    'Mis Ordenes',
  );

  return typedjson({
    user:user,
    orders:orders,
    ...meta
  });
}

export default OrdersPage;
export { meta };
export { ErrorBoundary };
