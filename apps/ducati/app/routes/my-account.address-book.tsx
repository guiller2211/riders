import { meta } from '../root';
import { ActionArgs, LoaderArgs } from '@remix-run/node';

import AddressBookPage from '../ui/pages/my-account/address-book.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { typedjson } from 'remix-typedjson';

export default AddressBookPage;
export { meta };
export { ErrorBoundary };

export async function loader({
  request,
  context: { registry },
  params,
}: LoaderArgs) {
 
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


