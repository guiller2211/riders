import type { ReactNode } from 'react';

import type { HeaderProps } from './Header';
import { ImageProps, ProductCardForPLPProps } from '../components';
import { CartEntry, CartData } from '@ducati/types';

export type LayoutProps = {
  header: HeaderProps;
  children?: ReactNode;
  homeImage?: ImageProps[];
  categoryImage?: ImageProps[];
  product?: ProductCardForPLPProps[];
  locale?: string;
  cart?: CartData;
  languages?: readonly string[];
  changeLanguage?: (locale: string) => void;
  handleAction?: (action: 'update' | 'delete', entryId: string, quantity?: number) => Promise<CartEntry | void>;
};
