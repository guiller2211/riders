
import { meta } from '../root';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { TermsConditionsPage } from '../ui/pages/terms-and-conditions.page';

export default function Index() {
  return <TermsConditionsPage />;
}

export { meta };
export { ErrorBoundary };