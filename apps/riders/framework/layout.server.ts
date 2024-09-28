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
import { AppRoutes, FooterData } from '@riders/types';

function getHomeHeroBanner() {
  return [{ src: b6 }, { src: b7 }, { src: b8 }];
}
function getFooter(): FooterData {
  return {
    aboutHeading: 'Creando una mejor experiencia',
    aboutMessage:
      'Comparta sus comentarios. Nos comprometemos a utilizarlos para ayudar a mejorar la experiencia de todos. Juntos podemos crear una mejor experiencia de compra.',
    copyright:
      '©2023 ProSource Industrial de Riders Commerce Storefront | Todos los derechos reservados',
    facebookLink: 'https://facebook.com',
    instagramLink: 'https://instagram.com',
    twitterLink: 'https://twitter.com',
    youtubeLink: 'https://youtube.com',
    whatsappLink: 'https://w.app/RidersRealm',
    links: [],
    linkBlocks: [
      {
        heading: 'Atención al Cliente',
        displayHeading: true,
        links: [
          { text: 'Contactanos', url: AppRoutes.Contacts },
          { text: 'Centro de ayuda', url: AppRoutes.Contacts },
        ],
      },
      {
        heading: 'Cuenta',
        displayHeading: true,
        links: [
          { text: 'Estado del pedido', url: AppRoutes.Orders },
          { text: 'Administrar cuenta', url: AppRoutes.Dashboard },
        ],
      },
      {
        heading: 'Sobre nosotros',
        displayHeading: true,
        links: [
          { text: 'Información corporativa', url: AppRoutes.Me },
        ],
      },
    ],
    changeLanguage: () => {},
  };
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
    const footer = getFooter();

    return {
      header,
      homeImage,
      categoryImage,
      footer
    };
  }
}
