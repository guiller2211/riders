import type { LoaderArgs } from '@remix-run/node';
import { meta } from '../root';
import MyAccountPage from '../ui/pages/my-account/my-account.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getCustomerByUid } from '../service/user.data.service';
import { CartData, Customer } from '@ducati/types';
import { getCartById } from '../service/cart.data.service';



export async function loader({
  request,
  context
}: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'root.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  if (session.has('__session')) {
    const uid: string = session.get('user')['uid'];
    user = await getCustomerByUid(uid);

  }
  return typedjson({
    user
  });
}
export default MyAccountPage;
export { meta };
export { ErrorBoundary };
