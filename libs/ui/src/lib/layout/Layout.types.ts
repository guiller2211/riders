import type { ReactNode } from 'react';

import type { HeaderProps } from './Header';
import { ImageProps } from '../components';

export type LayoutProps = {
  header: HeaderProps;
  children?: ReactNode;
  homeImage?: ImageProps[];
  categoryImage?: ImageProps[];
  locale?: string;
  languages?: readonly string[];
  changeLanguage?: (locale: string) => void;
};
