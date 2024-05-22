import {
  type HeaderLogoProps,
  type HeaderProps,
  type LayoutProps,
} from '@ducati/ui';
import p1 from '../public/assets/images/product/1.png';
import p2 from '../public/assets/images/product/2.png';
import p3 from '../public/assets/images/product/3.png';
import b6 from '../public/assets/images/imagesDemo/6.png';
import b7 from '../public/assets/images/imagesDemo/7.png';
import b8 from '../public/assets/images/imagesDemo/8.png';
import c1 from '../public/assets/images/categories/Can-am.png';
import c2 from '../public/assets/images/categories/honda.png';
import c3 from '../public/assets/images/categories/Kawasaki.png';
import c4 from '../public/assets/images/categories/Skidoo.png';
import c5 from '../public/assets/images/categories/Surron.png';
import c6 from '../public/assets/images/categories/Triumph.png';
import logo from '../public/assets/images/logo/logo.png';
import { AppRoutes } from '@ducati/types';

const PRODUCT_IMAGE_1 = p1;
const PRODUCT_IMAGE_2 = p2;
const PRODUCT_IMAGE_3 = p3;
const LOGO_IMAGE = logo;

function getHeaderLogo(): HeaderLogoProps {
  return {
    link: { href: '/category' },
    image: {
      desktop: { src: LOGO_IMAGE },
      mobile: { src: LOGO_IMAGE },
    },
  };
}

function getHomeHeroBanner() {
  return [{ src: b6 }, { src: b7 }, { src: b8 }];
}

function getCategoryCarousel() {
  return [
    { src: c1 },
    { src: c2 },
    { src: c3 },
    { src: c4 },
    { src: c5 },
    { src: c6 },
  ];
}

function getHeaderNavigation() {
  return [
    { button: { message: 'INICIO', props: { href: '/' } } },
    {
      button: { message: 'PRODUCTOS', props: { href: '/category' } },
    },
    {
      button: { message: 'CONTACTO' },
      nodes: [
        { button: { message: 'Category 13', props: { href: '/category' } } },
        { button: { message: 'Category 14', props: { href: '/category' } } },
        { button: { message: 'Category 15', props: { href: '/category' } } },
      ],
    },
  ];
}
function getUserMenu() {
  return [
    {
      button: { message: 'Mi Cuenta', props: { href: '/my-account' } }
    },
    {
      button: { message: 'Datos Personales', props: { href: AppRoutes.PersonalDetails } },
    },
    {
      button: { message: 'Mis Direcciones', props: { href: AppRoutes.AddressBook } },
    },
    {
      button: { message: 'Mis Ordenes', props: { href: AppRoutes.Orders } },
    },
    {
      button: { message: 'cerrar sesion', props: { href: AppRoutes.Logout } },
    },
  ];
}

function getHeader(): HeaderProps {
  return {
    logo: getHeaderLogo(),
    navigation: getHeaderNavigation(),
    userMenu: getUserMenu(),
    user: {}
  };
}

export class LayoutUtils {
  static getLayout(): LayoutProps {
    const header = getHeader();
    const homeImage = getHomeHeroBanner();
    const categoryImage = getCategoryCarousel();
    return {
      header,
      homeImage,
      categoryImage,

    };
  }
}
