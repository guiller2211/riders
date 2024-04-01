import type { LoaderArgs } from '@remix-run/node';

import { typedjson } from 'remix-typedjson';

import PersonalDetailsPage from '../ui/pages/my-account/personal-details.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { meta } from '../root';

export async function loader({ request, context: { registry } }: LoaderArgs) {


  return typedjson({
    user: null,
  
  });
}

export default PersonalDetailsPage;
export { meta };
export { ErrorBoundary };
