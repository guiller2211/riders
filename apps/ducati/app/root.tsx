import { Layout, LayoutProps, Theme, baseTheme } from '@ducati/ui';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, V2_MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { ReactNode } from 'react';
import { LayoutUtils } from '../framework/layout.server';
import "reshaped/themes/reshaped/theme.css";

const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    ...(baseTheme ? [{ rel: 'stylesheet', href: baseTheme }] : []),
  ];
};

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
    <html lang="es" data-rs-theme="reshaped" data-rs-color-mode="light">
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