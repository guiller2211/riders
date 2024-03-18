import { HomePage } from '../ui/pages/home.page';
import { typedjson } from 'remix-typedjson';
import { LayoutUtils } from '../../framework/layout.server';
import type { LoaderArgs } from '@remix-run/node';
import { getProducts } from '../service/data.service';

export async function loader({ }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const products = await getProducts();
  console.log(products)
  return typedjson({
    layout,
    getProduct: products ?? [],
  });
}

export default function Index() {
  return <HomePage />;
}
