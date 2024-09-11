import { HomePage } from '../ui/pages/home.page';
import { typedjson } from 'remix-typedjson';
import { LayoutUtils } from '../../framework/layout.server';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { getProduct } from '../service/product.data.service';
import { getSession } from '../server/fb.sessions.server';
import { addItemToCart, getCart } from '../service/cart.data.service';
import { CartData, CartEntry, Customer, ProductEnum } from '@riders/types';
import { getCustomerByUid } from '../service/user.data.service';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { meta } from '../root';
import { getVariantsData } from '../service/category.data.service';

export async function loader({ request }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const session = await getSession(request.headers.get("Cookie"));
  const variants = await getVariantsData();

  const product = await getProduct();
  let cart: CartData | undefined;
  let uid: string = '';

  if (session.has('__session')) {
    uid = session.get('user')['uid'];
    cart = await getCart(uid);
  }


  return typedjson({
    layout,
    product,
    cart: cart ?? null,
    variants
  });
}


export async function action({ request, context: { registry } }: ActionArgs) {
  try {
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
        const { cartItem } = await addItemToCart(getCartCustomer, parseInt(quantity), productCode);
        cart = cartItem

        return typedjson({
          result: cart
        });
      }
    }
  } catch (error) {
    console.error("Error al procesar la acción:", error);
  }

  return typedjson({
    result: null
  });
}


export default function Index() {
  return <HomePage />;
}

export { meta };
export { ErrorBoundary };