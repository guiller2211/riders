import { Layout, LayoutProps, Theme, baseTheme } from '@ducati/ui';
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
import { CartData, CartEntry, Customer } from '@ducati/types';
import { addItemToCart, deleteEntryBySku, getCartById } from './service/cart.data.service';
import { ErrorBoundary as ErrorBoundaryPage } from './ui/pages/error-boundary.page';


const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    ...(baseTheme ? [{ rel: 'stylesheet', href: baseTheme }] : []),
  ];
};

export async function loader({ request }: LoaderArgs) {
  const logger: Logger<ILogObj> = new Logger({ name: 'root.tsx' });
  const layout: LayoutProps = LayoutUtils.getLayout();

  const session = await getSession(request.headers.get("Cookie"));
  let user: Customer | undefined;
  if (session.has('__session')) {
    const uid: string = session.get('user')['uid'];
    user = await getCustomerByUid(uid);

    if (user) {
      layout.header.user.isLoggedIn = true;
      layout.header.user.name = `${user.firstName ?? ''} ${user.lastName ?? ''}`;
      logger.debug(layout.header.user.name + ' is logged in');
    }


  } else {
    logger.debug('Estamos en una sesión anónima. Establecer la bandera isLoggedIn = false');
    layout.header.user.isLoggedIn = false;
  }

  // Cart
  let cart: CartData | undefined | null = undefined;
  const cartSessionID = user?.cartId == null ? null : user.cartId;
  if (cartSessionID) {
    if (user && user.id) {
      cart = await getCartById(cartSessionID);
      /* layout.header.cart = cart; */
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
      <Layout header={loaderData.layout.header} handleAction={handleAction} cart={getCart}>
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
const ErrorBoundary = () => {
  const [errorType, setErrorType] = useState('');

  useEffect(() => {
    // Aquí podrías manejar cualquier tipo de error que ocurra en tu aplicación
    // Por ejemplo, podrías usar un try-catch para capturar errores en alguna parte de tu aplicación
    try {
      // Código que podría lanzar errores
    } catch (error: any) {
      // Dependiendo del tipo de error, establece el tipo de error
      if (error.response && error.response.status === 404) {
        setErrorType('pageNotFound');
      } else if (error.response && error.response.status === 503) {
        setErrorType('serviceUnavailable');
      } else {
        // Otros tipos de errores
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
