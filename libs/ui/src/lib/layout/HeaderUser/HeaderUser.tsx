import { Button, View, Text, Actionable, Icon, DropdownMenu } from '../../components/atomic';
import type { UserHeaderProps } from './HeaderUser.types';
import { IconChevronRight, IconHome, IconPerson } from '../../icons';
import styles from './HeaderUser.module.css';
import { AppRoutes } from '@backoffice/types';

export const HeaderUser = (props: UserHeaderProps) => {
  const { user,navigation } = props;

  return (
    <View gap={1} direction="row" >
      {user.isLoggedIn && (
        <DropdownMenu >
          <DropdownMenu.Trigger>
            {(attributes: any) => (
              <Button
                color="white"
                rounded
                endIcon={IconChevronRight}
                attributes={attributes}
              > <Text variant="body-3">{user.name}</Text></Button>
            )}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {navigation.map((node, i) => {
              return (
                <DropdownMenu.Item href={node.button?.props?.href} key={i}>
                  <Text variant="body-3" weight="medium">
                    {node.button?.message}
                  </Text>
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu>
      ) }
    </View>
  );
};
