// app/sessions.ts
import { redirect, createCookieSessionStorage } from "@remix-run/node"; // or "@remix-run/cloudflare"
import * as admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

// Inicializar Firebase
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
        expires: new Date(Date.now() + 600),
        httpOnly: true,
        maxAge: 600,
        path: "/",
        sameSite: "lax",
        secrets: ["f3cr@z7"],
        secure: true,
      },
    }
  );

// Verifica si la sesión actual es válida
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

// Establece la cookie en el encabezado y redirige a la ruta especificada
const setCookieAndRedirect = async (
  request: any,
  sessionCookie: string,
  user: DecodedIdToken,
  redirectTo = "/"
) => {
  const session = await getSession(request.headers.get("cookie"));
  session.set("__session", sessionCookie);
  session.set("user", user);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

// Inicia sesión verificando el token y estableciendo la cookie de sesión
export const sessionLogin = async (request: any, __session: string, redirectTo: string) => {
  const user = await admin.auth().verifyIdToken(__session);
  return admin
    .auth()
    .createSessionCookie(__session, {
      expiresIn: 60 * 60 * 24 * 5 * 1000,
    })
    .then(
      (sessionCookie) => {
        return setCookieAndRedirect(request, sessionCookie, user, redirectTo);
      },
      (error) => {
        return {
          error: `sessionLogin error!: ${error.message}`,
        };
      }
    );
};

// Cierra sesión revocando la cookie de sesión
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


export { getSession, destroySession, admin }
