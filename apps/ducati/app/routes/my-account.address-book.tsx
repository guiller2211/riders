import AddressBookPage from '../ui/pages/my-account/address-book.page';
import { LoaderArgs, ActionArgs } from '@remix-run/node';

import { ErrorBoundary } from '../ui/pages/error-boundary.page';

import { typedjson } from 'remix-typedjson';
import { ILogObj, Logger } from 'tslog';
import { getSession } from '../utils/fb.sessions.server';
import { getAddressCustomerById, getCustomerByUid } from '../service/user.data.service';
import { AddressData, Customer } from '@ducati/types';
import { meta } from '../root';

export async function loader({
  request,
  context
}: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'AddressBookPage.tsx' });

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  let addresses: AddressData[] = [];
  let uid: string = '';

  if (session.has('__session')) {
    uid = session.get('user')['uid'];
    user = await getCustomerByUid(uid);
    if (user?.addressID) {
      addresses = await getAddressCustomerById(user?.addressID)
    };
  }
  return typedjson({
    user,
    addresses,
    uid
  });
}

export default AddressBookPage;
export { meta };
export { ErrorBoundary };



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
      message: `addresses.add.${success ? 'success' : 'error'}`,
    },
  });
}

async function update({ request }: ActionArgs) {
  const formData = await request.formData();
  const success = true;
  return typedjson({
    result: {
      success: success,
      message: `addresses.edit.${success ? 'success' : 'error'}`,
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
      message: `addresses.setAsDefault.${success ? 'success' : 'error'}`,
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
      message: `addresses.remove.${success ? 'success' : 'error'}`,
    },
  });
}


