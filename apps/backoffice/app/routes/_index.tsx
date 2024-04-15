import { HomePage } from '../ui/pages/home.page';
import { typedjson } from 'remix-typedjson';
import { LayoutUtils } from '../../framework/layout.server';
import { redirect, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { getSession, sessionLogin } from '../utils/fb.sessions.server';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { meta } from '../root';

export async function loader({ request }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has('__session')) {
    return redirect('/backoffice');
  }

  return typedjson({
    layout,
  });
}

export async function action({ request, context: { registry } }: ActionArgs) {
  const formData: FormData = await request.formData();
  const __session: FormDataEntryValue | null = formData.get('__session');
  const uid: FormDataEntryValue | null = formData.get('uid');
  try {
    return await sessionLogin(request, __session as string, "/backoffice");
  } catch (error: any) {
    return { error: { message: error?.message } };
  }
}


export default function Index() {
  return <HomePage />;
}

export { meta };
export { ErrorBoundary };