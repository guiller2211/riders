import type { CartData, UIComposedProps } from '@backoffice/types';

import type { HeaderUserProps } from '../HeaderUser';
import type { HeaderLogoProps } from '../HeaderLogo';
import { ViewProps } from '../../components/atomic';

export type HeaderProps = ViewProps & {
  logo?: HeaderLogoProps;
  onClose?: VoidFunction;
  open?: boolean;
  messageBar?: UIComposedProps;
  navigation: UIComposedProps[];
  userMenu?: UIComposedProps[];
  user: HeaderUserProps;
  cart?: CartData;
  isCheckoutRoute?: boolean;
  onOpen?: VoidFunction;
};
