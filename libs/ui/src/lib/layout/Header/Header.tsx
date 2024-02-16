import { Button, Text, Divider, Hidden, Modal, Select, View, Link, Accordion } from '../../components/atomic';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderUser } from '../HeaderUser';
import { HeaderCart } from '../HeaderCart';
import { HeaderAdditionalBar } from '../HeaderAdditionalBar';
import { IconList } from '../../icons';
import type { HeaderProps } from './Header.types';
import { useOpenState, useToggle } from '../../hooks';
import styles from './Header.module.css';
import { Drawer } from '../../components';
import { DrawerContent, DrawerHeader } from '../../components/composite/shared/utils/Drawer';


export const Header = (props: HeaderProps) => {
  const { navigation, logo } = props;
  const { activate, deactivate, active } = useToggle(false);
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();
  return (
    <View
      as="header"
      padding={5}
      direction="row"
      gap={10}
      backgroundColor="black"
      align="center"
      justify="center"
    >

      <HeaderLogo image={logo?.image} link={logo?.link} />
      <View.Item>
        <View className={styles['non-mobile-screen']} direction='row' gap={6} >
          <HeaderAdditionalBar navigation={navigation} />
          <HeaderUser />
          <HeaderCart />
        </View>
      </View.Item>

      <View.Item gapBefore='auto'>
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

            <DrawerContent direction="column" gap={6}>
              <View direction="row" gap={4}>
                <View.Item columns={{ s: 12, l: 6 }}>
                  <Button
                    href='/'
                    variant="solid"
                    size="large"
                    fullWidth
                  >
                    Ingresar
                  </Button>
                </View.Item>
                <View.Item columns={{ s: 12, l: 6 }}>
                  <Button
                    href='/'
                    variant="outline"
                    size="large"
                    fullWidth
                  >
                    Crear Cuenta
                  </Button>
                </View.Item>
              </View>

              <Divider />

              {navigation?.map((nav, i) => {
                return nav.nodes && nav.nodes.length > 0 && (
                  <Accordion>
                    <Accordion.Trigger >
                      <Text color='warning' variant="featured-3" weight="medium">
                        {nav.button?.message}
                      </Text>
                    </Accordion.Trigger>
                    <Accordion.Content>
                      {nav.nodes?.map((node, i) => {
                        return (
                          <Text color='warning' variant="body-3" weight="medium">
                            {node.button?.message}
                          </Text>
                        );
                      })}
                    </Accordion.Content>
                  </Accordion>
                )
              })}

            </DrawerContent>
          </Drawer>
        </View >
      </View.Item >
    </View >
  );
};
