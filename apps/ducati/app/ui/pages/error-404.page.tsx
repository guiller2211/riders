import { ErrorBoundary } from './error-boundary.page';
import { useTypedLoaderData } from 'remix-typedjson';
import { loader } from '../../root';

const Error404Page = () => {
  const loaderData = useTypedLoaderData<typeof loader>();
  return <ErrorBoundary errorType="pageNotFound" />;
};
export default Error404Page;
