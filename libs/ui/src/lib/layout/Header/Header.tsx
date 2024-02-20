import { Button, Text, Divider, Hidden, Modal, Select, View, Link, Accordion } from '../../components/atomic';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderUser } from '../HeaderUser';
import { HeaderCart } from '../HeaderCart';
import { HeaderAdditionalBar } from '../HeaderAdditionalBar';
import { IconList } from '../../icons';
import type { HeaderProps } from './Header.types';
import { useOpenState, useToggle } from '../../hooks';
import styles from './Header.module.css';
import { Drawer, MenuHeader } from '../../components';
import { DrawerContent, DrawerHeader } from '../../components/composite/shared/utils/Drawer';


export const Header = (props: HeaderProps) => {
  const { navigation, logo } = props;
  const { activate, deactivate, active } = useToggle(false);
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
          <View className={styles['mobile-screen']} align='center'>
            <Button
              color="primary"
              variant="ghost"
              size="xlarge"
              endIcon={IconList}
              onClick={onOpenDrawerHandler}
            />
            <Drawer padding={0} active={open} onClose={onCloseDrawerHandler}>
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
              <MenuHeader navigation={navigation} />
            </Drawer>
          </View >
        </View>
      </View.Item>

      <View.Item>
        <View className={styles['non-mobile-screen']} direction='row' gap={6} >
          <HeaderAdditionalBar navigation={navigation} />
          <HeaderCart />
        </View>
      </View.Item>

    </View >
  );
};
