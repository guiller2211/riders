import { Button, View, Text, Actionable, Icon, DropdownMenu } from '../../components/atomic';
import type { UserProps } from './HeaderUser.types';
import { IconChevronRight, IconHome, IconPerson } from '../../icons';
import styles from './HeaderUser.module.css';

export const HeaderUser = (props: UserProps) => {
  const { user } = props;

  return (
    <View gap={1} direction="row" >
      {user.isLoggedIn ? (
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
            <Button
              variant="ghost"
              color="inherit"
            > cerrar sesion</Button>
          </DropdownMenu.Content>
        </DropdownMenu>
      ) : (
        <Button
          color="white"
          size="xlarge"
          href='/login' rounded>
          <Icon svg={IconPerson} size={6} />
        </Button>
      )}
    </View>
  );
};
