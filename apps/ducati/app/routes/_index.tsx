import { HomePage } from '../ui/pages/home.page';
import { typedjson } from 'remix-typedjson';
import { supabase } from '../../utils/supabase';
import { LayoutUtils } from '../../framework/layout.server';
import { LoaderArgs } from '@remix-run/node';

export async function loader({}: LoaderArgs) {
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
