import { HomePage } from '../ui/pages/home.page';
import { typedjson } from 'remix-typedjson';
import { supabase } from '../../utils/supabase';
import { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { LayoutUtils } from '../../framework/layout.server';

export async function loader({}: LoaderFunctionArgs) {
  const layout = LayoutUtils.getLayout();

  const { data: products, error } = await supabase.from('products').select();

  if (error) {
    throw error;
  }

  return typedjson({
    layout,
    getProduct: products ?? [],
  });
}

export default function Index() {
  return <HomePage />;
}
