import { redirect, LoaderArgs } from '@remix-run/node';
import { ILogObj, Logger } from 'tslog';
import { destroySession, getSession } from '../server/fb.sessions.server';
import { meta } from '../root';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { signOut } from 'firebase/auth';
import { auth } from '@riders/firebase';

const logger: Logger<ILogObj> = new Logger({ name: 'logout.tsx' });

export const loader = async ({ request }: LoaderArgs) => {
  try {
    await signOut(auth);
    const session = await getSession(request.headers.get("Cookie"));
    const cookieHeader = await destroySession(session);
    
    return redirect("/", {
      headers: { "Set-Cookie": cookieHeader },
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    
    return redirect("/error", { 
      status: 500, 
    });
  }
};


export { meta };
export { ErrorBoundary };