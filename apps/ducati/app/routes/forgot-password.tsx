import { meta } from '../root';
import { LoaderArgs } from '@remix-run/node';

import ForgotPasswordPage from '../ui/pages/forgot-password.page';
import { ErrorBoundary } from '../ui/pages/error-boundary.page';
import { ProductsCarouselProps, } from '@ducati/types';
import { typedjson } from 'remix-typedjson';

export async function loader({
  request,
  context: { registry },
  params,
}: LoaderArgs) {

  return typedjson({
    ...meta,
  });
}

export async function action(value: boolean) {
  const success = value;

  return {
    result: success,
    featuredProducts: success ? getPopularProduct() : {},
  };
}
function getPopularProduct(): ProductsCarouselProps {
  return {
    title: 'Browse popular products',
    items: [
      {
        title: { message: 'Dake' },
        description: { message: 'Hydraulic Press, 10 t, Manual Pump, 36 In' },
        image: { src: '/assets/images/product/product1.png' },
        link: { props: { href: '/' } },
        price: { message: '507.72' },
      },
      {
        title: { message: 'Haltech' },
        description: { message: 'Analog Gauge Check Station, 160 PSI' },
        image: { src: '/assets/images/product/product2.png' },
        link: { props: { href: '/' } },
        price: { message: '375.93' },
      },
      {
        title: { message: 'Airsept' },
        description: { message: 'Service Port Access Tool, 4 in. OD, 1234YF' },
        image: { src: '/assets/images/product/product3.png' },
        link: { props: { href: '/' } },
        price: { message: '109.00' },
      },
      {
        title: { message: 'Schneider Electronic' },
        description: {
          message:
            'General Purpose Relay, 24V DC Coil Volts, Square, 8 Pin, DPDT',
        },
        image: { src: '/assets/images/product/product4.png' },
        link: { props: { href: '/' } },
        price: { message: '375.73' },
      },
      {
        title: { message: 'Dake' },
        description: { message: 'Hydraulic Press, 10 t, Manual Pump, 36 In' },
        image: { src: '/assets/images/product/product1.png' },
        link: { props: { href: '/' } },
        price: { message: '507.72' },
      },
      {
        title: { message: 'Haltech' },
        description: { message: 'Analog Gauge Check Station, 160 PSI' },
        image: { src: '/assets/images/product/product2.png' },
        link: { props: { href: '/' } },
        price: { message: '375.93' },
      },
    ],
  };
}

export default ForgotPasswordPage;
export { meta };
export { ErrorBoundary };
