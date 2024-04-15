import { LoaderArgs, redirect } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { ProductPage } from '../ui/pages/backoffice/product.page';
import { LayoutUtils } from '../../framework/layout.server';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { meta } from '../root';
import { getProduct } from '../service/product.data.service';
import { getSession } from '../utils/fb.sessions.server';


export async function loader({ request }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const products = await getProduct();

  const session = await getSession(request.headers.get("Cookie"));

/*   if (!session.has('__session')) {
    return redirect('/');
  } */


  return typedjson({
    layout,
    products
  });
}



export default function Index() {
  return <ProductPage />;
}

export { meta };
export { ErrorBoundary };
