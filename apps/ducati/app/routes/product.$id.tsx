import ProductDetailPage from '../ui/pages/product.page';
import { meta } from '../root';
import { ActionArgs, HeadersFunction, LoaderArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { getProductById } from '../service/product.data.service';
import { getSession } from '../server/fb.sessions.server';
import { CartData, CartEntry, Customer, ProductVariant, TypeVariamEnum } from '@ducati/types';
import { getCustomerByUid } from '../service/user.data.service';
import { addItemToCart, getCart } from '../service/cart.data.service';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { getCategories } from '../service/category.data.service';

export async function loader({
  params,
}: LoaderArgs) {

  const product = await getProductById(params.id);
  const categories = await getCategories();
  return typedjson({ product, categories });
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { 'Cache-Control': loaderHeaders.get('Cache-Control') ?? 'no-cache' };
};

export async function action({ request, context: { registry } }: ActionArgs) {
  try {
    const formData: FormData = await request.formData();
    const session = await getSession(request.headers.get("Cookie"));
    const quantity: string = formData.get('addToCartQuantity') as string;
    const productCode: string = formData.get('productCode') as string;

    const variants: ProductVariant[] = [];
    formData.forEach((value, key) => {
      const match = key.match(/^type-(\d+)$/);
      if (match) {
        const index = match[1];
        const type = `${value}` === TypeVariamEnum.Color ? TypeVariamEnum.Color : TypeVariamEnum.Size;
        const name = formData.get(`variant-${index}`);
        if (name) {
          variants.push({ type, name: name.toString() });
        }
      }
    });

    if (!session.has('__session')) {
      // Manejar el caso en el que no hay una sesión
      throw new Error('No hay sesión');
    }

    const uid: string = session.get('user')['uid'];
    const customer = await getCustomerByUid(uid);

    if (!customer) {
      // Manejar el caso en el que no se encuentra el cliente
      throw new Error('Cliente no encontrado');
    }

    const getCartCustomer: CartData = await getCart(uid);
    const { cartItem } = await addItemToCart(getCartCustomer, parseInt(quantity), productCode, false, variants);

    return typedjson({
      result: cartItem
    });
  } catch (error) {
    console.error("Error en la acción:", error);
    // Manejar errores y devolver una respuesta adecuada
    return typedjson({
      result: error
    });
  }
}

export default function Index() {
  return <ProductDetailPage />;
}

export { meta };
export { ErrorBoundary };