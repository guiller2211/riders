import { redirect, type LoaderArgs } from '@remix-run/node';
import { meta } from '../root';
import MyAccountPage from '../ui/pages/my-account/my-account.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getCustomerByUid } from '../service/user.data.service';
import { Customer, Meta } from '@riders/types';
import { RemixUtils } from '../..//framework/utils.server';



export async function loader({
  request,
  context
}: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'root.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;

  if (!session.has('__session')) {
    redirect('/');
  }

  const uid: string = session.get('user')['uid'];
  user = await getCustomerByUid(uid);

  const meta: Meta = await RemixUtils.pageMeta(
    'Mi Cuenta',
  );

  return typedjson({
    user,
    ...meta
  });
}
export default MyAccountPage;
export { meta };
export { ErrorBoundary };
