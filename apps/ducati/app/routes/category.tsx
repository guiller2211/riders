import { ActionArgs, LoaderArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { getProduct } from '../service/product.data.service';
import { getSession } from '../server/fb.sessions.server';
import { CartData, CartEntry, Customer, ProductEnum } from '@ducati/types';
import { getCustomerByUid } from '../service/user.data.service';
import { addItemToCart, getCart } from '../service/cart.data.service';
import { CategoryPage } from '../ui/pages/category.page';
import { FacetProps, FacetValueTypeEnum } from '@ducati/ui';
import { LayoutUtils } from '../../framework/layout.server';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { meta } from '../root';

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

export async function loader({ }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const products = await getProduct();


  return typedjson({
    layout,
    facets: getFacetData(),
    getProduct: products ?? [],
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
  return <CategoryPage />;
}

export { meta };
export { ErrorBoundary };
