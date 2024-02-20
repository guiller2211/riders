import ProductDetailPage from '../ui/pages/product.page';
import { meta } from '../root';
import { HeadersFunction, LoaderArgs } from '@remix-run/node';
import { Registry } from '@ducati/core';
import { typedjson } from 'remix-typedjson';
import { CurrencySymbolPosition, Product } from '@ducati/types';
import { supabase } from '../../utils/supabase';

export const ROUTE_NAME = 'product';
export const handle = { i18n: ['product', 'layout'] };

const currency = {
    isocode: 'USD',
    name: 'US Dollars',
    symbol: '$',
    symbolPosition: CurrencySymbolPosition.BEFORE,
    decimalPlaces: 2,
};

export async function loader({
    request,
    context: { registry },
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
