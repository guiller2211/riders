import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { CategoryPage } from '../ui/pages/category.page';
import { FacetProps, FacetValueTypeEnum } from '@ducati/ui';
import { LayoutUtils } from '../../framework/layout.server';
import { getMotorcycles } from '../service/product.data.service';
import { getSession } from '../utils/fb.sessions.server';
import { Cart, Customer } from '@ducati/types';
import { getCustomerByUid } from '../service/user.data.service';
import { addItemToCart } from '../service/cart.data.service';

function getFacetData(): FacetProps[] {
  return [
    {
      name: 'Categorías',
      isOpen: true,
      values: [
        {
          name: 'Nuevas',
          type: FacetValueTypeEnum.Link,
          quantity: 55,
        },
        {
          name: 'Seminuevas',
          type: FacetValueTypeEnum.Link,
          quantity: 33,
        }
      ],
    },
    {
      name: 'Descuentos',
      values: [],
    },
    {
      name: 'Precio',
      values: [],
    },
    {
      name: 'CC',
      values: [],
    },
  ];
}

export async function loader({}: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const products = await getMotorcycles();

  return typedjson({
    layout,
    facets: getFacetData(),
    getProduct: products ?? [],
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
  return <CategoryPage />;
}
