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

              <DrawerContent direction="column" gap={6}>

                {navigation?.map((nav, i) => {
                  return nav.nodes && nav.nodes.length > 0 ? (
                    <Accordion key={i}>
                      <Accordion.Trigger >
                        <Text color='warning' variant="featured-3" weight="medium">
                          {nav.button?.message}
                        </Text>
                      </Accordion.Trigger>
                      <Accordion.Content>
                        {nav.nodes?.map((node, i) => {
                          return (
                            <Link key={i} href={node.button?.props?.href} variant='plain' color='inherit'>
                              <Text variant="body-3" weight="medium">
                                {node.button?.message}
                              </Text>
                            </Link>
                          );
                        })}
                      </Accordion.Content>
                    </Accordion>
                  )
                    : (
                      <Button
                        variant="ghost"
                        color="inherit"
                        href={nav.button?.props?.href}
                        key={i}>
                        <Text color="warning" variant="body-3" weight="medium">
                          {nav.button?.message}
                        </Text>
                      </Button>
                    )
                })}

              </DrawerContent>
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
