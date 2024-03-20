import type { Cart, UIComposedProps } from '@ducati/types';

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
  user: HeaderUserProps;
  cart?: Cart;
  isCheckoutRoute?: boolean;
  onOpen?: VoidFunction;
};
