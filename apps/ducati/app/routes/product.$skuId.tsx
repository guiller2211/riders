import ProductDetailPage from '../ui/pages/product.page';
import { meta } from '../root';
import { HeadersFunction, LoaderArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { getProductsBySku } from '../service/data.service';

export async function loader({
    params,
}: LoaderArgs) {

    const product = await getProductsBySku(params.skuId);
    console.log(product)
    return typedjson({ product });
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
    return { 'Cache-Control': loaderHeaders.get('Cache-Control') ?? 'no-cache' };
};

export { meta };

export default function Index() {
    return <ProductDetailPage />;
}
