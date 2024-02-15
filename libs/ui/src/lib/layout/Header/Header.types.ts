import type { UIComposedProps } from '@ducati/types';

import type { HeaderCartProps } from '../HeaderCart';
import type { HeaderUserProps } from '../HeaderUser';
import type { HeaderLogoProps } from '../HeaderLogo';
import { ViewProps } from '../../components/atomic';

export type HeaderProps = ViewProps & {
  logo?: HeaderLogoProps;
  messageBar?: UIComposedProps;
  navigation: UIComposedProps[];
  user?: HeaderUserProps;
  cart?: HeaderCartProps;
  isCheckoutRoute?: boolean;
  onOpen?: VoidFunction;
};
