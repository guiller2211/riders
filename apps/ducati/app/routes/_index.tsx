import { HomePage } from '../ui/pages/home.page';
import { typedjson } from 'remix-typedjson';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { LayoutUtils } from '../../framework/layout.server';

export async function loader({}: LoaderFunctionArgs) {
  const layout = LayoutUtils.getLayout();


  return typedjson({
    layout,
    getProduct: [],
  });
}

export default function Index() {
  return <HomePage />;
}
