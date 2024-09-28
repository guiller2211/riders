import PersonalDetailsPage from '../ui/pages/my-account/personal-details.page';
import { LoaderArgs, redirect } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getCustomerByUid, updateCustomer } from '../service/user.data.service';
import { AppRoutes, Customer, Meta } from '@riders/types';
import { meta } from '../root';
import { RemixUtils } from '../../framework/utils.server';

export async function loader({
  request,
}: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'root.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  
  if (!session.has('__session')) {
    return redirect(AppRoutes.Home);
  }
  
  let user: Customer | undefined;
  const uid: string = session.get('user')['uid'];
  const useContext: string = session.get('useContext');

  user = await getCustomerByUid(uid);

  const meta: Meta = await RemixUtils.pageMeta(
    'Detalle Perosnal',
  );

  return typedjson({
    customer: user,
    ...meta
  });
}


export default PersonalDetailsPage;
export { meta };
export { ErrorBoundary };
