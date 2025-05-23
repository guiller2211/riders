import WishlistPage from '../ui/pages/my-account/wishlist.page'
import { LoaderArgs, redirect } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getwishlist, getCustomerByUid } from '../service/user.data.service';
import { AppRoutes, Customer, Meta } from '@riders/types';
import { meta } from '../root';
import { RemixUtils } from '../../framework/utils.server';

export async function loader({
  request,
  context
}: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'my-account.wishlist.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  let wishlist;
  let uid: string = '';

  if (!session.has('__session')) {
    return redirect(AppRoutes.Home);
  }
  if (session.has('__session')) {
    uid = session.get('user')['uid'];
    user = await getCustomerByUid(uid);
    if (user?.likeProduct) {
      wishlist = await getwishlist(uid)
    };
  }

  const meta: Meta = await RemixUtils.pageMeta(
    'Mi Lista de Deseo',
  );
  
  return typedjson({
    user,
    wishlist,
    uid,
    ...meta
  });
}

export default WishlistPage;
export { meta };
export { ErrorBoundary };

