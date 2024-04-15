import { redirect, type ActionArgs, LoaderArgs } from '@remix-run/node';
import { BackofficePage } from '../ui/pages/backoffice/backoffice.page';
import { getSession, sessionLogin } from '../utils/fb.sessions.server';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { meta } from '../root';
import { LayoutUtils } from '../../framework/layout.server';
import { typedjson } from 'remix-typedjson';


export async function loader({ request }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has('__session')) {
    return redirect('/');
  }
  
  return typedjson({
    layout,
  });
}

export async function action({ request, context: { registry } }: ActionArgs) {
  const formData: FormData = await request.formData();
  const __session: FormDataEntryValue | null = formData.get('__session');

  try {
    return await sessionLogin(request, __session as string, "/");
  } catch (error: any) {
    return { error: { message: error?.message } };
  }
}

export default function Index() {
  return <BackofficePage />;
}

export { meta };
export { ErrorBoundary };