
import { ActionArgs } from '@remix-run/node';
import { meta } from '../root';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { TermsConditionsPage } from '../ui/pages/terms-and-conditions.page';
import { typedjson } from 'remix-typedjson';
import { Meta } from '@riders/types';
import { RemixUtils } from '../../framework/utils.server';


export async function loader({request}: ActionArgs) {
  
  const meta: Meta = await RemixUtils.pageMeta(
    'Temrinos y Condiciones',
  );

  return typedjson({...meta})

}

export default function Index() {
  return <TermsConditionsPage />;
}

export { meta };
export { ErrorBoundary };