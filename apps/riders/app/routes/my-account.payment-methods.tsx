import { meta } from '../root';
import { LoaderArgs, redirect } from '@remix-run/node';
import PaymentMethodsPage from '../ui/pages/my-account/payment-methods.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { typedjson } from 'remix-typedjson';
import { getSession } from '../server/fb.sessions.server';
import { AppRoutes } from '@riders/types';

export default PaymentMethodsPage;
export { meta };
export { ErrorBoundary };

export async function loader({
  request,
  context: { registry },
}: LoaderArgs) {

  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has('__session')) {
    return redirect(AppRoutes.Home);
  }

  return typedjson({
    ...meta,
  });
}
