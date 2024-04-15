import { LoginPage } from '../ui/pages/login.page';
import type { ActionArgs } from '@remix-run/node';
import { sessionLogin } from '../utils/fb.sessions.server';
import { meta } from '../root';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';


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

export default function Index() {
  return <LoginPage />;
}

export { meta };
export { ErrorBoundary };