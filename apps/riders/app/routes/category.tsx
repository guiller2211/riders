import { ActionArgs, LoaderArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { getProduct } from '../service/product.data.service';
import { getSession } from '../server/fb.sessions.server';
import { CartData, CartEntry, Customer, FacetValue, ProductEnum } from '@riders/types';
import { getCustomerByUid } from '../service/user.data.service';
import { addItemToCart, getCart } from '../service/cart.data.service';
import { CategoryPage } from '../ui/pages/category.page';
import { FacetProps, FacetValueTypeEnum } from '@riders/ui';
import { LayoutUtils } from '../../framework/layout.server';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { meta } from '../root';
import { getCategoriesWithProductData } from '../service/category.data.service';

function getFacetData(categories: FacetValue[]): FacetProps[] {
  return [
    {
      name: 'Categorías',
      isOpen: true,
      values: categories,
    },
    {
      name: 'Descuentos',
      values: [],
    },
    {
      name: 'Precio',
      values: [],
    },
  ];
}

export async function loader({ request, context: { registry } }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const products = await getProduct();
  const categories = await getCategoriesWithProductData();
  const session = await getSession(request.headers.get("Cookie"));
  let uid: string = '';

  if (session.has('__session')) {
    uid = session.get('user')['uid'];
  }
  return typedjson({
    layout,
    uid,
    facets: getFacetData(categories),
    getProduct: products,
  });
}


export default function Index() {
  return <CategoryPage />;
}

export { meta };
export { ErrorBoundary };
