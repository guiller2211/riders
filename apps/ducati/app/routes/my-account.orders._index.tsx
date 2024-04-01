import type { LoaderArgs } from '@remix-run/node';
import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';

import { meta } from '../root';
import OrdersPage from '../ui/pages/my-account/orders.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';

enum Namespaces {
  Orders = 'orders',
}

const logger: Logger<ILogObj> = new Logger({ name: 'OrdersPage' });

export async function loader({ request, context: { registry } }: LoaderArgs) {

}

export default OrdersPage;
export { meta };
export { ErrorBoundary };
