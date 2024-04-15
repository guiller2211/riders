import { Layout, LayoutProps, Theme, baseTheme } from '@backoffice/ui';
import { cssBundleHref } from '@remix-run/css-bundle';
import { redirect, type LinksFunction, type LoaderArgs, type V2_MetaFunction, } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { ReactNode, useEffect } from 'react';
import { LayoutUtils } from '../framework/layout.server';
import "reshaped/themes/reshaped/theme.css";
import { ILogObj, Logger } from 'tslog';
import { destroySession, getSession } from './utils/fb.sessions.server';
import { getCustomerByUid, getUserById } from './service/user.data.service';
import { CartData, Customer, User } from '@backoffice/types';

const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    ...(baseTheme ? [{ rel: 'stylesheet', href: baseTheme }] : []),
  ];
};

export async function loader({ request }: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'root.tsx' });
  const layout: LayoutProps = LayoutUtils.getLayout();

  try {
    const session = await getSession(request.headers.get("Cookie"));

    if (session.get('__session')) {
      layout.header.user.isLoggedIn = true;
    }
  } catch (error) {
    logger.error("Error occurred while loading:", error);
  }

  return typedjson({ layout });
}


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
    <body>
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
  const navigate = useNavigate();
  const loaderData = useTypedLoaderData<typeof loader>();

  return (
    <Document>
      <Layout header={loaderData.layout.header} >
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