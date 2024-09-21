import { meta } from '../root';
import { LoaderArgs } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../server/fb.sessions.server';
import { getCustomerByUid } from '../service/user.data.service';
import { CartData, Customer, Meta } from '@riders/types';
import { getCartById } from '../service/cart.data.service';
import CheckoutPaymentPage from '../ui/pages/checkout.payment.page';
import { CreditCardEnum, PaymentProps } from '@riders/ui';
import { getMercadoPago } from '../ui/pages/api/mercadopago';
import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes';
import { RemixUtils } from "../../framework/utils.server";


export async function action() {

}

function getPaymentMethods(): PaymentProps[] {
  return [
    {
      type: CreditCardEnum.Amex,
      name: 'Nancy Rollins',
      ending: '4444',
      month: '05',
      year: '29',
      address: '2201 Flint Street, Atlanta, GA 30303',
      expired: false,
      preferred: true,
    },
    {
      type: CreditCardEnum.Visa,
      name: 'George Clanton',
      ending: '8712',
      month: '01',
      year: '25',
      address: '',
      expired: false,
      preferred: false,
    },
    {
      type: CreditCardEnum.Mastercard,
      name: 'George Clanton',
      ending: '9932',
      month: '07',
      year: '27',
      address: '2201 Flint Street, Atlanta, GA 30303',
      expired: false,
      preferred: false,
    },
    {
      type: CreditCardEnum.Diners,
      name: 'Nancy Rollins',
      ending: '5476',
      month: '12',
      year: '202',
      address: '2201 Flint Street, Atlanta, GA 30303',
      expired: true,
      preferred: false,
    },
  ];
}

export async function loader({ request, context: { registry } }: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'checkout.shipping.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  let uid: string = '';

  if (session.has('__session')) {
    uid = session.get('user')['uid'];
    user = await getCustomerByUid(uid);

  }

  // Cart
  let cart: CartData | undefined | null = undefined;
  const cartSessionID = user?.cartId == null ? null : user.cartId;
  if (cartSessionID) {
    if (user && user.id) {
      cart = await getCartById(cartSessionID);
    }
  }
  let response: PreferenceResponse | null = null;
  if (cart) {
    response = await getMercadoPago(cart);
  }
  const payment = getPaymentMethods();

  const meta: Meta = await RemixUtils.pageMeta(
    'Verificar Pago',
  );

  return typedjson({ cart, payment, page: response, uid, ...meta });
}

export default CheckoutPaymentPage;
export { meta };
export { ErrorBoundary };