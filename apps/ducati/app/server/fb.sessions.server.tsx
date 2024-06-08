
import { redirect, createCookieSessionStorage } from "@remix-run/node"; 
import * as admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";


var serviceAccount = require("./firebase-service.json");
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage(
    {
      cookie: {
        name: "__session",
       httpOnly: true,
       maxAge: 6000,
       path: "/",
       sameSite: "lax",
       secrets: ["f3cr@z7"],
       secure: true,
      },
    }
  );


export const isSessionValid = async (request: any, redirectTo: string) => {
  const session = await getSession(request.headers.get("cookie"));
  try {
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(session.get("__session"), true);
    return { success: true, decodedClaims };
  } catch (error: any) {
    throw redirect(redirectTo, {
      statusText: error?.message,
    });
  }
};


export const setCookieAndRedirect = async (
  request: any,
  sessionCookie: string,
  user: DecodedIdToken | { uid: string; anonymous: boolean },
  redirectTo?: string
) => {
  const session = await getSession(request.headers.get("cookie"));
  session.set("__session", sessionCookie);
  session.set("user", user);

  const cookieOptions: any = {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["f3cr@z7"],
    secure: true,
  };

  if (!user.anonymous) {
    cookieOptions.expires = new Date(Date.now() + 60 * 60 * 24 * 5 * 1000); 
    cookieOptions.maxAge = 60 * 60 * 24 * 5; 
  }

  const headers = {
    "Set-Cookie": await commitSession(session, cookieOptions),
  };

  if (redirectTo) {
    return redirect(redirectTo, { headers });
  } else {
    return new Response(null, { headers });
  }
};


export const sessionLogin = async (request: any, idToken: string, redirectTo?: string) => {
  try {
    const user = await admin.auth().verifyIdToken(idToken);
    const sessionCookie = await admin.auth().createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000,
    });

    return setCookieAndRedirect(request, sessionCookie, user, redirectTo);
  } catch (error) {
    console.error('Error verificando el token:', error);
    return {
      error: `sessionLogin error!: ${error}`,
    };
  }
};



export const sessionLogout = async (request: any) => {
  const session = await getSession(request.headers.get("cookie"));
  return admin
    .auth()
    .verifySessionCookie(session.get("__session"), true /** checkRevoked */)
    .then((decodedClaims) => {
      return admin.auth().revokeRefreshTokens(decodedClaims?.sub);
    })
    .then(async () => {
      return redirect("/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    })
    .catch((error) => {
      console.error(error);
      return { error: error?.message };
    });
};


export { getSession, destroySession, commitSession, admin }
