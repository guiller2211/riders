import {
  type HeaderLogoProps,
  type HeaderProps,
  type LayoutProps,
} from '@riders/ui';
import b6 from '../public/assets/images/imagesDemo/6.png';
import b7 from '../public/assets/images/imagesDemo/7.png';
import b8 from '../public/assets/images/imagesDemo/8.png';
import c1 from '../public/assets/images/categories/dainese-logo.png';
import c2 from '../public/assets/images/categories/honda.png';
import c3 from '../public/assets/images/categories/Kawasaki.png';
import c4 from '../public/assets/images/categories/Surron.png';
import c5 from '../public/assets/images/categories/Triumph.png';
import { AppRoutes } from '@riders/types';

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
  ];
}

function getHeaderNavigation() {
  return [
    { button: { message: 'INICIO', props: { href: AppRoutes.Home } } },
    {
      button: { message: 'PRODUCTOS', props: { href: AppRoutes.Category } },
    },
    {
      button: { message: 'CONTACTO' },
      nodes: [
        { button: { message: 'Contactos', props: { href: AppRoutes.Contacts } } },
        { button: { message: 'Nosotros', props: { href: AppRoutes.Me } } }
      ],
    },
  ];
}
function getUserMenu() {
  return [
    {
      button: { message: 'Mi Cuenta', props: { href: AppRoutes.Dashboard } }
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
      button: { message: 'My Lista Deseo', props: { href: AppRoutes.WishList } },
    },
  ];
}

function getHeader(): HeaderProps {
  return {
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
