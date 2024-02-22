import { Layout, LayoutProps, Theme, baseTheme } from '@ducati/ui';
import { cssBundleHref } from '@remix-run/css-bundle';
import { redirect, type LinksFunction, type LoaderArgs, type V2_MetaFunction, ActionArgs } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { ReactNode } from 'react';
import { LayoutUtils } from '../framework/layout.server';
import "reshaped/themes/reshaped/theme.css";
import { commitSession, destroySession, getSession } from '../utils/session.server';
import { supabase } from '../utils/supabase';
import { ILogObj, Logger } from 'tslog';
import { createServerClient } from '@supabase/auth-helpers-remix';

const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    ...(baseTheme ? [{ rel: 'stylesheet', href: baseTheme }] : []),
  ];
};

export async function loader({ request }: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'root.tsx' });

  const layout: LayoutProps = LayoutUtils.getLayout();


  let session = await getSession(request.headers.get("Cookie"));

  // if there is no access token in the header then
  // the user is not authenticated, go to login
  if (!session.has("access_token")) {
    return typedjson({
      layout
    });

  } else {
    // otherwise execute the query for the page, but first get token
    const { data: user, error: sessionErr } = await supabase.auth.getUser(
      session.get("access_token")
    );

    if (user && user.user?.id) {

      const { data: profile } = await supabase.from('profiles')
        .select()
        .eq('id', user.user?.id)

      if (profile && profile.length > 0) {
        const userProfile = profile[0];

        layout.header.user.isLoggedIn = true;
        layout.header.user.name = `${userProfile.firstName ?? ''} ${userProfile.lastName ?? ''}`;
        logger.debug(layout.header.user.name + ' is logged in');
      }

    } else {
      logger.debug('we are in anonymous session. Set isLoggedin flag = false');
      layout.header.user.isLoggedIn = false;
    }
    if (!sessionErr) {
      // activate the session with the auth_token
      supabase.auth.signInWithOAuth(session.get("access_token"));


      // return data and any potential errors alont with user
      return typedjson({ layout: layout, user });
    } else {
      return typedjson({ layout, error: sessionErr });
    }
  }
}
export const action = async ({ request }: ActionArgs) => {
  // get session
  let session = await getSession(request.headers.get("Cookie"));

  // destroy session and redirect to login page
  return redirect("/login", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

const Head = () => {
  return (
    <head>
      <Meta />
      <Links />
    </head>
  );
};

const Body = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <body style={{ backgroundColor: 'black' }}>
      <Theme theme="reshaped">
        {children}
      </Theme>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  );
};

const Document = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <html lang="es">
      <Head />
      <Body>{children}</Body>
    </html>
  );
};

const Root = () => {
  const loaderData = useTypedLoaderData<typeof loader>();


  return (
    <Document>
      <Layout header={loaderData.layout.header}>
        <Outlet />
      </Layout>
    </Document>
  );
}

const meta: V2_MetaFunction = ({ data }) => {
  return [
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1',
    },
    {
      charSet: 'utf-8',
    },
    {
      title: data?.meta?.title ?? '',
    },
    {
      name: 'description',
      content: data?.meta?.description,
    },
  ];
};

export default Root;
export { meta };
export { links };