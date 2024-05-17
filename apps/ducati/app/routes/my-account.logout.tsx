import { redirect, LoaderArgs } from '@remix-run/node';
import { ILogObj, Logger } from 'tslog';
import { destroySession, getSession } from '../server/fb.sessions.server';
import { meta } from '../root';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';

const logger: Logger<ILogObj> = new Logger({ name: 'logout.tsx' });

export const loader = async ({
  request,
  context: { registry },
}: LoaderArgs) => {
   // get session
   let session = await getSession(request.headers.get("Cookie"));

   // destroy session and redirect to login page
   return redirect("/login", {
     headers: { "Set-Cookie": await destroySession(session) },
   });
};

export { meta };
export { ErrorBoundary };