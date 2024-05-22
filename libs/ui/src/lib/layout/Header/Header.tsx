import { Button, Text, Divider, Hidden, Modal, Select, View, Link, Accordion } from '../../components/atomic';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderUser } from '../HeaderUser';
import { HeaderCart } from '../HeaderCart';
import { HeaderAdditionalBar } from '../HeaderAdditionalBar';
import { IconList } from '../../icons';
import type { HeaderProps } from './Header.types';
import { useOpenState } from '../../hooks';
import styles from './Header.module.css';
import { Drawer, MenuHeader } from '../../components';
import { DrawerHeader } from '../../components/composite/shared/utils/Drawer';
import { useLocation } from 'react-router-dom';
import { useResponsiveClientValue } from 'reshaped';

export const Header = (props: HeaderProps) => {
  const { navigation, logo, user, cart, userMenu, handleAction } = props;
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();
  const location = useLocation();

  return (
    <View
      as="header"
      padding={5}
      gap={10}
      justify={useResponsiveClientValue({ s: 'center', l: 'center' })}
      align='center'
    >
      <View className={styles['non-mobile-screen']}>

        <View.Item columns={12}>
          <View align="center" justify="center" gap={10} direction="row">
            <HeaderLogo image={logo?.image} link={logo?.link} />
          </View>
        </View.Item>

        <View.Item>
          <View align="center" justify="center" direction='row' gap={6} >
            <HeaderAdditionalBar navigation={navigation} />
            <HeaderUser user={user} navigation={userMenu} />
            <HeaderCart cart={cart} handleAction={handleAction} isCheckout={location.pathname.includes('checkout')} />
          </View>
        </View.Item>
      </View>

      <View className={styles['mobile-screen']} direction='row' gap={5}>
        <Button
          color="primary"
          variant="ghost"
          size="xlarge"
          endIcon={IconList}
          onClick={onOpenDrawerHandler}
        />
        <Drawer padding={0} active={open} onClose={onCloseDrawerHandler} position='start' size='100%'>
          <DrawerHeader
            backgroundColor="warning"
            title='Menu'
            onClose={onCloseDrawerHandler}
            closeButtonOnTop={false}
            closeButtonProps={{
              color: 'black',
              rounded: true,
              variant: 'outline',
            }}
          />
          <MenuHeader navigation={navigation} userMenu={userMenu} user={user} />
        </Drawer>

        <HeaderLogo image={logo?.image} link={logo?.link} />


        <HeaderCart cart={cart} handleAction={handleAction} isCheckout={location.pathname.includes('checkout')} />

      </View>

    </View >
  );
};
