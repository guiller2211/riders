import type { ReactNode } from 'react';

import type { HeaderProps } from './Header';
import { ImageProps, ProductCardForPLPProps } from '../components';

export type LayoutProps = {
  header: HeaderProps;
  children?: ReactNode;
  homeImage?: ImageProps[];
  categoryImage?: ImageProps[];
  product?: ProductCardForPLPProps[];
  locale?: string;
  languages?: readonly string[];
  changeLanguage?: (locale: string) => void;
};
