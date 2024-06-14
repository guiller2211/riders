import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { ErrorHandler } from '@riders/ui';
import img from '../../../public/assets/images/cart/d_cartItems.png'
export type ErrorBoundaryProps = {
  errorType?: string;
};

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const error: any = useRouteError();
  const isRouteError = isRouteErrorResponse(error);
  const isError = error instanceof Error;
  const { heading, description, button } = getMessages(
    props.errorType ? props.errorType : 'default',
  );
  return (
    <ErrorHandler
      heading={heading}
      description={description}
      button={button}
      image={getErrorImage()}
      showTechnicalError={true}
      error={{
        status: isRouteError ? error.status : isError ? 503 : 0,
        message: isRouteError ? error.data : isError ? error.message : '',
      }}
    />
  );
};


function getMessages(errorType: string) {
  switch (errorType) {
    case 'pageNotFound':
      return {
        heading: "Página no encontrada",
        description: "No pudimos encontrar lo que estabas buscando",
        button: "Volver a la página de inicio"
      };
    case 'serviceUnavailable':
      return {
        heading: "Servicio no disponible",
        description: "Se ha producido un error inesperado",
        button: "Actualizar"
      };
    default:
      return {
        heading: "¡Lo sentimos!",
        description: "No pudimos encontrar lo que estabas buscando",
        button: "Volver a la página de inicio"
      };
  }
}



const getErrorImage = () => {
  return {
    desktop: {
      src: img,
    },
    mobile: {
      src: '/assets/images/cart/m_cartItems.png',
    },
  };
};

export { ErrorBoundary };
