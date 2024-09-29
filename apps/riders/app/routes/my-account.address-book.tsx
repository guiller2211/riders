import AddressBookPage from '../ui/pages/my-account/address-book.page';
import { LoaderArgs, redirect } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getAddressCustomerById, getCustomerByUid } from '../service/user.data.service';
import { AddressData, AppRoutes, Customer, Meta } from '@riders/types';
import { meta } from '../root';
import { RemixUtils } from '../../framework/utils.server';

export async function loader({
  request,
}: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'AddressBookPage.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  let addresses: AddressData[] = [];
  let uid: string = '';

  if (!session.has('__session')) {
    return redirect(AppRoutes.Home);
  }

  uid = session.get('user')['uid'];
  user = await getCustomerByUid(uid);
  if (user?.addressID) {
    addresses = await getAddressCustomerById(user?.addressID)
  };

  const meta: Meta = await RemixUtils.pageMeta(
    'Mis Direcciones',
  );

  return typedjson({
    user,
    addresses,
    uid,
    ...meta
  });
}

export default AddressBookPage;
export { meta };
export { ErrorBoundary };

