import type { UIComposedProps } from '@riders/types';

import { View } from '../../components/atomic';
import { HeaderNavigation } from '../HeaderNavigation';

export const HeaderAdditionalBar = (props: {
  navigation: UIComposedProps[];
}) => {
  const { navigation } = props;
  return <HeaderNavigation nodes={navigation} />;
};
