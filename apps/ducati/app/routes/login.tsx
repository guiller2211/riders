import { json, redirect, createCookieSessionStorage } from "@remix-run/node";
import { LoginPage } from '../ui/pages/login.page';
import type { ActionArgs } from '@remix-run/node';
import { sessionLogin } from '../server/fb.sessions.server';
import { meta } from '../root';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { getSession, commitSession } from '../server/fb.sessions.server';
import { generateCsrfToken, verifyCsrfToken } from '../server/csrf.server';

export async function loader({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  const csrfToken = await generateCsrfToken(session);
  return json({ csrfToken }, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionArgs) {
  const formData: FormData = await request.formData();
  const __session: FormDataEntryValue | null = formData.get('__session');
  const uid: FormDataEntryValue | null = formData.get('uid');
  const csrfToken: FormDataEntryValue | null = formData.get('csrfToken');
  const session = await getSession(request.headers.get("cookie"));

  if (!(await verifyCsrfToken(session, csrfToken as string))) {
    throw new Response("Invalid CSRF Token", { status: 403 });
  }

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
