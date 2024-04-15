import { typedjson } from 'remix-typedjson';
import type { LoaderArgs } from '@remix-run/node';

import { meta } from '../root';
import MyAccountPage from '../ui/pages/my-account/my-account.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { getSession } from '../utils/fb.sessions.server';
import { getCustomerByUid } from '../service/user.data.service';
import { Customer } from '@ducati/types';

export async function loader({ request, context: { registry } }: LoaderArgs) {
  
  const session = await getSession(request.headers.get("Cookie"));

  const uid: string = session.get('user')['uid'];
  const user: Customer = await getCustomerByUid(uid);


  return typedjson({
    user: user,
  });
}

export default MyAccountPage;
export { meta };
export { ErrorBoundary };
