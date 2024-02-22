import { redirect, LoaderArgs } from '@remix-run/node';
import { ILogObj, Logger } from 'tslog';
import { destroySession, getSession } from '../../utils/session.server';

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
