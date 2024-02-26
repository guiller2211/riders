import ProductDetailPage from '../ui/pages/product.page';
import { meta } from '../root';
import { HeadersFunction, LoaderArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { supabase } from '../../utils/supabase';

export const ROUTE_NAME = 'product';
export const handle = { i18n: ['product', 'layout'] };


export async function loader({
    params,
}: LoaderArgs) {
    const { data: product, error } = await supabase
        .from('products')
        .select()
        .eq('sku', params.skuId);

    if (error) {
        throw error;
    }

    return typedjson({ product });
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
    return { 'Cache-Control': loaderHeaders.get('Cache-Control') ?? 'no-cache' };
};

export { meta };

export default function Index() {
    return <ProductDetailPage />;
}
