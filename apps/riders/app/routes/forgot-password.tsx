import { meta } from '../root';
import { LoaderArgs } from '@remix-run/node';

import ForgotPasswordPage from '../ui/pages/forgot-password.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { typedjson } from 'remix-typedjson';
import { Meta } from '@riders/types';
import { RemixUtils } from "../../framework/utils.server";

export async function loader({
  context: { registry },
}: LoaderArgs) {

  const meta: Meta = await RemixUtils.pageMeta(
    'Recuperar Clave',
  );

  return typedjson({
    ...meta,
  });
}

export default ForgotPasswordPage;
export { meta };
export { ErrorBoundary };
