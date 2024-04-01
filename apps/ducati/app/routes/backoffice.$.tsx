import type { ActionArgs } from '@remix-run/node';
import { BackofficePage } from '../ui/pages/backoffice/backoffice.page';
import { sessionLogin } from '../utils/fb.sessions.server';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { meta } from '../root';


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
  return <BackofficePage />;
}

export { meta };
export { ErrorBoundary };