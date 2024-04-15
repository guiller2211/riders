import { LoaderArgs, redirect } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { CustomersPage } from '../ui/pages/backoffice/customers.page';
import { LayoutUtils } from '../../framework/layout.server';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { meta } from '../root';
import { getCustomer } from '../service/user.data.service';
import { getSession } from '../utils/fb.sessions.server';

export async function loader({ request }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const Customers = await getCustomer();

  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has('__session')) {
    return redirect('/');
  }


  return typedjson({
    layout,
    Customers,
  });
}

export default function Index() {
  return <CustomersPage />;
}

export { meta };
export { ErrorBoundary };
