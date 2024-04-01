import { LoaderArgs } from '@remix-run/node';

import AccountOverviewPage from '../ui/pages/my-account/account-overview.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';

export async function loader({
  params,
}: LoaderArgs) {

}

export default AccountOverviewPage;
export { ErrorBoundary };
