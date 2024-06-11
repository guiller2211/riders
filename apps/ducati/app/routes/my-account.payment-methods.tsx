import { meta } from '../root';
import { ActionArgs, LoaderArgs, redirect } from '@remix-run/node';
import PaymentMethodsPage from '../ui/pages/my-account/payment-methods.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { typedjson } from 'remix-typedjson';
import { getSession } from '../server/fb.sessions.server';

export default PaymentMethodsPage;
export { meta };
export { ErrorBoundary };

export async function loader({
  request,
  context: { registry },
  params,
}: LoaderArgs) {

  const paymentMethods = getPaymentMethods();
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has('__session')) {
    redirect('/');
  }

  return typedjson({
    methods: paymentMethods,
    ...meta,
  });
}

export async function action(args: ActionArgs) {
  const formData = await args.request.clone().formData();
  const formAction = formData.get('_action');
  switch (formAction) {
    case 'ADD':
      return add(args);
    case 'UPDATE':
      return update(args);
    case 'SET_DEFAULT':
      return setAsDefault(args);
    case 'DELETE':
      return remove(args);
    default:
      throw new Error('Unknown action');
  }
}

async function add({ request }: ActionArgs) {
  const formData = await request.formData();
  const success = true;
  return typedjson({
    result: {
      success: success,
      message: `paymentMethods.add.${success ? 'success' : 'error'}`,
    },
  });
}

async function update({ request }: ActionArgs) {
  const formData = await request.formData();
  const success = true;
  return typedjson({
    result: {
      success: success,
      message: `paymentMethods.edit.${success ? 'success' : 'error'}`,
    },
  });
}

async function setAsDefault({ request }: ActionArgs) {
  const formData = await request.formData();
  const code = formData.get('code');
  const success = true;
  return typedjson({
    result: {
      success: success,
      message: `paymentMethods.setAsDefault.${success ? 'success' : 'error'}`,
    },
  });
}

async function remove({ request }: ActionArgs) {
  const formData = await request.formData();
  const code = formData.get('code');
  const success = true;
  return typedjson({
    result: {
      success: success,
      message: `paymentMethods.remove.${success ? 'success' : 'error'}`,
    },
  });
}

// TO DO: Add return type
// TO DO: Dummy Data need to be ajusted
function getPaymentMethods() {
  return [
    {
      code: '00001',
      name: 'Nancy Rollins',
      ending: '4444',
      type: 'Visa',
      month: '05',
      year: '29',
      address: '2201 Flint Street, Atlanta, GA 30303',
      expired: false,
      defaultMethod: true,
    },
    {
      code: '00002',
      name: 'George Clanton',
      ending: '8712',
      type: 'Mastercard',
      month: '01',
      year: '25',
      address: '',
      expired: false,
      defaultMethod: false,
    },
    {
      code: '00003',
      name: 'George Clanton',
      ending: '9932',
      type: 'Diners',
      month: '07',
      year: '27',
      address: '2201 Flint Street, Atlanta, GA 30303',
      expired: false,
      defaultMethod: false,
    },
    {
      name: 'Nancy Rollins',
      ending: '5476',
      type: 'Discover',
      month: '12',
      year: '202',
      address: '2201 Flint Street, Atlanta, GA 30303',
      expired: true,
      defaultMethod: false,
    },
    {
      code: '00004',
      name: 'George Clanton',
      ending: '6417',
      type: 'Paypal',
      month: '01',
      year: '25',
      address: '',
      expired: false,
      defaultMethod: false,
    },
    {
      code: '00005',
      name: 'George Clanton',
      ending: '3331',
      type: 'Amex',
      month: '01',
      year: '25',
      address: '',
      expired: false,
      defaultMethod: false,
    },
    {
      code: '00006',
      name: 'George Clanton',
      ending: '9928',
      type: 'Amazon',
      month: '01',
      year: '25',
      address: '',
      expired: false,
      defaultMethod: false,
    },
  ];
}
