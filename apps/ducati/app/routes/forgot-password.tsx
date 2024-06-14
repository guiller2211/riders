import { meta } from '../root';
import { LoaderArgs } from '@remix-run/node';

import ForgotPasswordPage from '../ui/pages/forgot-password.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { typedjson } from 'remix-typedjson';

export async function loader({
  context: { registry },
}: LoaderArgs) {

  return typedjson({
    ...meta,
  });
}


export default ForgotPasswordPage;
export { meta };
export { ErrorBoundary };
