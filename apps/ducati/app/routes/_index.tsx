import { HomePage } from '../ui/pages/home.page';
import { typedjson } from 'remix-typedjson';
import { LayoutUtils } from '../../framework/layout.server';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import {  getProduct } from '../service/product.data.service';
import { getSession } from '../utils/fb.sessions.server';
import { addItemToCart, getCart } from '../service/cart.data.service';
import { CartData, CartEntry, Customer, ProductEnum } from '@ducati/types';
import { getCustomerByUid } from '../service/user.data.service';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { meta } from '../root';

export async function loader({ request }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const session = await getSession(request.headers.get("Cookie"));

  const product = await getProduct();


  let cart: CartData | undefined;

  if (session.has('__session')) {
    const uid: string = session.get('user')['uid'];

    cart = await getCart(uid);
  }


  return typedjson({
    layout,
    product,
    cart: cart ?? null,
  });
}


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
  return <HomePage />;
}

export { meta };
export { ErrorBoundary };