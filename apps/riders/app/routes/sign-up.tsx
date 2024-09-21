import { SignUpPage } from '../ui/pages/sign-up.page';
import { ActionArgs } from '@remix-run/node';
import { sessionLogin } from '../server/fb.sessions.server';
import { meta } from '../root';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { Meta } from '@riders/types';
import { RemixUtils } from '../../framework/utils.server';
import { typedjson } from 'remix-typedjson';


export async function action({ request, context: { registry } }: ActionArgs) {
  const formData: FormData = await request.formData();
  const __session: FormDataEntryValue | null = formData.get('__session');
  const uid: FormDataEntryValue | null = formData.get('uid');
  try {
    return await sessionLogin(request, __session as string, "/");
  } catch (error: any) {
    return { error: { message: error?.message } };
  }
}

export async function loader({ request }: ActionArgs) {

  const meta: Meta = await RemixUtils.pageMeta(
    'Crear Cuenta',
  );

  return typedjson({ ...meta })
}
export default function Index() {
  return <SignUpPage />;
}

export { meta };
export { ErrorBoundary };