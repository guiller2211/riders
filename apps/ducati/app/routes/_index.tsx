import { HomePage } from '../ui/pages/home.page';
import { typedjson } from 'remix-typedjson';
import { LayoutUtils } from '../../framework/layout.server';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { generateRandomId, getAccessories, getMotorcycles } from '../service/product.data.service';
import { commitSession, getSession } from '../utils/fb.sessions.server';
import { addItemToCart, createAnonymousCart, createAnonymousCustomer, getCart, updateCustomerCart } from '../service/cart.data.service';
import { Cart, Customer } from '@ducati/types';
import { CartEntryData } from '@ducati/ui';
import { getCustomerByUid } from '../service/user.data.service';

export async function loader({ request }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const session = await getSession(request.headers.get("Cookie"));

  const motorcycles = await getMotorcycles();
  const accessories = await getAccessories();
  let cart: Cart | undefined;

  if (session.has('__session')) {
    const uid: string = session.get('user')['uid'];

    cart = await getCart(uid);
  }


  return typedjson({
    layout,
    getMotorcycles: motorcycles ?? [],
    getAccessories: accessories ?? [],
    cart: cart ?? null,
  });
}


export async function action({ request, context: { registry } }: ActionArgs) {
  const formData: FormData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));
  const quantity: string = formData.get('addToCartQuantity') as string;
  const productCode: string = formData.get('productCode') as string;

  let customer: Customer | undefined;
  let cart: Cart | undefined;

  if (session.has('__session')) {
    const uid: string = session.get('user')['uid'];

    customer = await getCustomerByUid(uid);

    console.log(customer, "aqui", uid)

    if (customer.cartId) {
      cart = await addItemToCart(customer.cartId, quantity, productCode);
      console.log(cart, "pago")
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
