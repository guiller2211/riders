import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { ErrorHandler } from '@backoffice/ui';

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

const getMessages = (errorType: string) => {
  return {
    heading: `${errorType}.heading`,
    description: `${errorType}.description`,
    button: `${errorType}.button`,
  };
};

const getErrorImage = () => {
  return {
    desktop: {
      src: '/assets/images/cart/d_cartItems.png',
    },
    mobile: {
      src: '/assets/images/cart/m_cartItems.png',
    },
  };
};

export { ErrorBoundary };
