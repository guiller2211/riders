import PersonalDetailsPage from '../ui/pages/my-account/personal-details.page';
import { ActionArgs, LoaderArgs, json } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getCustomerByUid, updateCustomer } from '../service/user.data.service';
import { Customer } from '@ducati/types';
import { meta } from '../root';
import { Auth, User } from 'firebase/auth';

export async function loader({
  request,
  context
}: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'root.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  if (session.has('__session')) {
    const uid: string = session.get('user')['uid'];
    const useContext: string = session.get('useContext');

    user = await getCustomerByUid(uid);
  }

  return typedjson({
    customer: user
  });
}


export default PersonalDetailsPage;
export { meta };
export { ErrorBoundary };
