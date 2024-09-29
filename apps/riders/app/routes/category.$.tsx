import { LoaderArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { getProduct, getProductByCategory } from '../service/product.data.service';
import { getSession } from '../server/fb.sessions.server';
import { AppRoutes, CategoryData, FacetValue, Meta } from '@riders/types';
import { CategoryPage } from '../ui/pages/category.page';
import { FacetProps } from '@riders/ui';
import { LayoutUtils } from '../../framework/layout.server';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { meta } from '../root';
import { getCategoriesWithProductData } from '../service/category.data.service';
import { RemixUtils } from "../../framework/utils.server";
import { ErrorUtils, UrlUtils } from '@riders/ui';
import { redirect } from '@remix-run/node';

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

export async function loader({ request, context: { registry }, params }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  let products = await getProduct();
  const categories = await getCategoriesWithProductData();
  const session = await getSession(request.headers.get("Cookie"));
  let uid: string = '';
  let categoryBreadcrumbs: CategoryData = {};

  if (session.has('__session')) {
    uid = session.get('user')['uid'];
  }

  const splat = UrlUtils.parseSplatFromRequest(request.url, params);

  if (splat) {
    const categorySlug: string = splat;

    const queryParams = UrlUtils.parseQueryParamsFromRequest(request.url);
    const fullCategorySlug = queryParams ? `${categorySlug}?${queryParams}` : categorySlug;

    products = await getProductByCategory(fullCategorySlug);

    categoryBreadcrumbs = {
      id: '1',
      name: categorySlug,
      url: `/${fullCategorySlug}`
    };

  }

  const meta: Meta = await RemixUtils.pageMeta('Productos');

  return typedjson({
    layout,
    uid,
    facets: getFacetData(categories),
    getProduct: products,
    categoryBreadcrumbs,
    ...meta
  });
}



export default function Index() {
  return <CategoryPage />;
}

export { meta };
export { ErrorBoundary };
