import type { CartData, UIComposedProps, CartEntry } from '@ducati/types';

import type { HeaderCartProps } from '../HeaderCart';
import type { HeaderUserProps } from '../HeaderUser';
import type { HeaderLogoProps } from '../HeaderLogo';
import { ViewProps } from '../../components/atomic';

export type HeaderProps = ViewProps & {
  logo?: HeaderLogoProps;
  onClose?: VoidFunction;
  open?: boolean;
  messageBar?: UIComposedProps;
  navigation: UIComposedProps[];
  userMenu: UIComposedProps[];
  user: HeaderUserProps;
  cart?: CartData;
  isCheckoutRoute?: boolean;
  onOpen?: VoidFunction;
  handleAction?: (action: 'update' | 'delete', entryId: string, quantity?: number) => Promise<CartEntry | void>;
};
