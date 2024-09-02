import { AuthProvider, Layout, LayoutProps, Theme, baseTheme } from '@riders/ui';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderArgs, V2_MetaFunction, } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';
import { ReactNode, useEffect, useState } from 'react';
import { LayoutUtils } from '../framework/layout.server';
import "reshaped/themes/reshaped/theme.css";
import { ILogObj, Logger } from 'tslog';
import { getSession } from './server/fb.sessions.server';
import { getCustomerByUid } from './service/user.data.service';
import { CartData, CartEntry, Customer, ImageData } from '@riders/types';
import { addItemToCart, deleteEntryBySku, getCartById } from './service/cart.data.service';
import { ErrorBoundary as ErrorBoundaryPage } from './ui/pages/error-boundary.page';
import { OrderProvider, UserProvider } from '@riders/firebase';
import { getMediaLayout } from './service/media.data.service';

const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    ...(baseTheme ? [{ rel: 'stylesheet', href: baseTheme }] : []),
  ];
};

export async function loader({ request }: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'root.tsx' });
  const layout: LayoutProps = await LayoutUtils.getLayout();
  const layoutMedia: ImageData | null = await getMediaLayout();
  layout.header.logo = {
    link: { href: '/category' },
    image: {
      desktop: { src: layoutMedia?.url },
      mobile: { src: layoutMedia?.url },
    },
  };
 ;
  const session = await getSession(request.headers.get("Cookie"));
  let customer: Customer | undefined;

  if (session.has('__session')) {
    const uid: string = session.get('user')['uid'];
    customer = await getCustomerByUid(uid);

    if (!customer.anonymous) {
      layout.header.user.isLoggedIn = true;
      layout.header.user.name = `${customer.firstName ?? ''} ${customer.lastName ?? ''}`;
      logger.debug(layout.header.user.name + ' is logged in');
    } else {
      logger.debug('Estamos en una sesión anónima. Establecer la bandera isLoggedIn = false');
      layout.header.user.isLoggedIn = false;
    }

  }

  let cart: CartData | undefined | null = undefined;
  const cartSessionID = customer?.cartId == null ? null : customer.cartId;
  if (cartSessionID) {
    if (customer && customer.id) {
      cart = await getCartById(cartSessionID);
    }
  }

  return typedjson({ layout, cart });
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
    <AuthProvider>
      <body style={{ backgroundColor: 'black' }}>
        <Theme theme="reshaped">
          {children}
        </Theme>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </AuthProvider>
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
  const [getCart, setCart] = useState(loaderData.cart);

  useEffect(() => {
    setCart(loaderData.cart);
  }, [loaderData.cart]);

  const handleAction = async (action: 'update' | 'delete', entryId: string, quantity?: number): Promise<CartEntry | void> => {
    try {
      if (loaderData.cart) {
        switch (action) {
          case 'update':
            const { cartItem, cartUpdate } = await addItemToCart(loaderData.cart!, quantity!, entryId, true);
            setCart(cartUpdate);
            return cartItem;
          case 'delete':
            const cartUpdateDelete = await deleteEntryBySku(loaderData.cart!, entryId);
            setCart(cartUpdateDelete);

            break;
          default:
            break;
        }
      } else {
        throw new Error("El carrito no está disponible");
      }
    } catch (error) {
      console.error("Error al ejecutar la acción:", error);
    }
  };

  return (
    <Document>
      <UserProvider>
        <OrderProvider>
          <Layout header={loaderData.layout.header} handleAction={handleAction} cart={getCart}>
            <Outlet />
          </Layout>
        </OrderProvider>
      </UserProvider>
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
const ErrorBoundary = () => {
  const [errorType, setErrorType] = useState('');

  useEffect(() => {
    try {

    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setErrorType('pageNotFound');
      } else if (error.response && error.response.status === 503) {
        setErrorType('serviceUnavailable');
      } else {
        setErrorType('default');
      }
    }
  }, []);
  return (
    <Document>
      <ErrorBoundaryPage errorType={errorType} />
    </Document>
  );
};
export default Root;
export { meta };
export { links };
export { ErrorBoundary };
