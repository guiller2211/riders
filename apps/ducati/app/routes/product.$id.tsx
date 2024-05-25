import ProductDetailPage from '../ui/pages/product.page';
import { meta } from '../root';
import { ActionArgs, HeadersFunction, LoaderArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { getProductById } from '../service/product.data.service';
import { getSession, setCookieAndRedirect } from '../server/fb.sessions.server';
import { CartData, CartEntry, Customer, ProductVariant, TypeVariamEnum } from '@ducati/types';
import { getCustomerByUid, setCustomer } from '../service/user.data.service';
import { addItemToCart, getCart } from '../service/cart.data.service';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { getCategories } from '../service/category.data.service';
import { v4 as uuidv4 } from 'uuid';

export async function loader({ request, params, context: { registry } }: LoaderArgs) {

  const product = await getProductById(params.id);
  const categories = await getCategories();
  const session = await getSession(request.headers.get("Cookie"));

  let uid: string = '';
  let user: Customer | undefined;

  if (session.has('__session')) {
    uid = session.get('user')['uid'];
    user = await getCustomerByUid(uid);
  }

  return typedjson({ product, categories, user });
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

    let uid: string;
    let sessionCookie: string | null = null;
    let isAnonymous = false;

    if (!session.has('__session')) {
      const anonymousUser: Customer = {
        email: '',
        firstName: '',
        lastName: '',
        anonymous: true,
        lastModifiedAt: new Date().toISOString()
      };

      const authResult = await setCustomer(anonymousUser);
      uid = authResult;

      sessionCookie = uuidv4();
      isAnonymous = true;

    } else {
      const userSession = session.get('user');
      if (!userSession || !userSession.uid) {
        throw new Error('Sesión de usuario inválida');
      }
      uid = userSession.uid;
    }

    const customer = await getCustomerByUid(uid);
    if (!customer) {
      throw new Error('Cliente no encontrado');
    }

    const getCartCustomer: CartData = await getCart(uid);
    const { cartItem } = await addItemToCart(getCartCustomer, parseInt(quantity), productCode, false, variants);

    if (sessionCookie && isAnonymous) {
      return await setCookieAndRedirect(request, sessionCookie, { uid, anonymous: true }, undefined);
    }

    return typedjson({
      result: cartItem
    });
  } catch (error) {
    console.error("Error en la acción:", error);
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