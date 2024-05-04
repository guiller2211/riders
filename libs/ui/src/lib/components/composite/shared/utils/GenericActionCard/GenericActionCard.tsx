import { Drawer, DrawerContent, DrawerHeader } from '../Drawer';
import { IconPlusCircle } from '../../../../../icons';
import { useOpenState } from '../../../../../hooks';
import { View, Card, Icon, Text, Actionable } from '../../../../atomic';
import type { GenericActionCardProps } from './GenericActionCard.types';

export const GenericActionCard = (props: GenericActionCardProps) => {
  const { children, cardLabel, drawerTitle, ...rest } = props;

  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();

  return (
    <>
      <Actionable
        attributes={{ style: { width: '100%' } }}
        onClick={onOpenDrawerHandler}
        {...rest}
      >
        <Card padding={6}>
          <View
            align="center"
            direction="column"
            gap={3}
            height={48}
            justify="center"
          >
            <Icon
              svg={IconPlusCircle}
              color="primary"
              attributes={{
                style: {
                  width: 'var(--rs-unit-x8)',
                  height: 'var(--rs-unit-x8)',
                },
              }}
            />

            {cardLabel && (
              <Text variant="body-2" weight="bold">
                {cardLabel}
              </Text>
            )}
          </View>
        </Card>
      </Actionable>

      <Drawer active={open} onClose={onCloseDrawerHandler}>
        <DrawerHeader title={drawerTitle} onClose={onCloseDrawerHandler} />
        <DrawerContent padding={0}>{children}</DrawerContent>
      </Drawer>
    </>
  );
};
