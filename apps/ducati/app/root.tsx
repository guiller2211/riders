import { Layout, LayoutProps, Theme } from '@ducati/ui';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { ReactNode } from 'react';
import { LayoutUtils } from '../framework/layout.server';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];
export async function loader() {
  const layout: LayoutProps = LayoutUtils.getLayout();

  return typedjson({
    layout,
  });
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
      <Theme theme="base" defaultColorMode="light">
        {children}
      </Theme>
      <ScrollRestoration />
      <Scripts />
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

export default function App() {
  const loaderData = useTypedLoaderData<typeof loader>();

  return (
    <Document>
      <Layout header={loaderData.layout.header}>
        <Outlet />
      </Layout>
    </Document>
  );
}
