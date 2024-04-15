import { View } from '../../components/atomic';
import { HeaderLogo } from '../HeaderLogo';
import type { HeaderProps } from './Header.types';
import { useOpenState } from '../../hooks';
import styles from './Header.module.css';

export const Header = (props: HeaderProps) => {
  const { navigation, logo, user, cart, userMenu } = props;
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();

  return (
    <View
      as="header"
      padding={5}
      gap={10}
      align="center"
      justify="center"
    >
      <View.Item columns={12}>
        <View align="center"
          justify="center" gap={10} direction="row">
          <HeaderLogo image={logo?.image} link={logo?.link} />
        </View>
      </View.Item>

      <View.Item>
        <View align="center" justify="center" className={styles['non-mobile-screen']} direction='row' gap={6} >

        </View>
      </View.Item>

    </View >
  );
};
