import type { UIComposedProps } from '@backoffice/types';

import { View } from '../../components/atomic';
import { HeaderNavigation } from '../HeaderNavigation';
import { HeaderUserProps } from '../HeaderUser';

export const HeaderAdditionalBar = (props: {
  navigation: UIComposedProps[];
  user: HeaderUserProps;
}) => {
  const { navigation, user } = props;
  return <HeaderNavigation nodes={navigation} user={user}/>;
};
