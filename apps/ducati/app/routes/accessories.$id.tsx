import ProductDetailPage from '../ui/pages/product.page';
import { meta } from '../root';
import { ActionArgs, HeadersFunction, LoaderArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { getProductById } from '../service/product.data.service';
import { getSession } from '../utils/fb.sessions.server';
import { CartData, CartEntry, Customer } from '@ducati/types';
import { getCustomerByUid } from '../service/user.data.service';
import { addItemToCart, getCart } from '../service/cart.data.service';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';

export async function loader({
  params,
}: LoaderArgs) {

  const product = await getProductById(params.id);
  return typedjson({ product });
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { 'Cache-Control': loaderHeaders.get('Cache-Control') ?? 'no-cache' };
};

export async function action({ request, context: { registry } }: ActionArgs) {
  const formData: FormData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));
  const quantity: string = formData.get('addToCartQuantity') as string;
  const productCode: string = formData.get('productCode') as string;

  let customer: Customer | undefined;
  let cart: CartEntry | undefined;

  if (session.has('__session')) {
    const uid: string = session.get('user')['uid'];

    customer = await getCustomerByUid(uid);

    if (customer) {
      const getCartCustomer: CartData = await getCart(uid);
      cart = await addItemToCart(getCartCustomer, quantity, productCode);
    }

    /* await updateCustomerCart(uid, cart); */

  } /* else {
      if (session.has('anonymous')) {
        const anonymousId = session.get('anonymous');
        
        customer = await getCustomerByUid(anonymousId);
        if (!customer) {
          customer = await createAnonymousCustomer(anonymousId);
          cart = await createAnonymousCart(quantity, productCode, anonymousId);
        } else {
          cart = await getCart(anonymousId);
          if (cart) {
            cart = await addItemToCart(anonymousId, quantity, productCode, cart);
            await updateCustomerCart(anonymousId, cart);
          }
        }
      } else {
        const anonymousId = generateRandomId();
        session.set("anonymous", anonymousId);
        await commitSession(session);
        customer = await createAnonymousCustomer(anonymousId);
        cart = await createAnonymousCart(quantity, productCode, anonymousId);
      }
    }
  
    return cart;  */
  return cart;
}

export default function Index() {
  return <ProductDetailPage />;
}

export { meta };
export { ErrorBoundary };