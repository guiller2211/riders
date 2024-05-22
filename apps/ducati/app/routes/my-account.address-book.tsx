import AddressBookPage from '../ui/pages/my-account/address-book.page';
import { LoaderArgs, ActionArgs } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getAddressCustomerById, getCustomerByUid } from '../service/user.data.service';
import { AddressData, Customer } from '@ducati/types';
import { meta } from '../root';

export async function loader({
  request,
  context
}: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'AddressBookPage.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  let addresses: AddressData[] = [];
  let uid: string = '';

  if (session.has('__session')) {
    uid = session.get('user')['uid'];
    user = await getCustomerByUid(uid);
    if (user?.addressID) {
      addresses = await getAddressCustomerById(user?.addressID)
    };
  }
  return typedjson({
    user,
    addresses,
    uid
  });
}

export default AddressBookPage;
export { meta };
export { ErrorBoundary };

