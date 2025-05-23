import { Button, View, Text, Actionable, Icon, DropdownMenu } from '../../components/atomic';
import { IconChevronRight, IconHome, IconPerson } from '../../icons';
import { AppRoutes } from '@riders/types';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../context';
import { useNavigate } from '@remix-run/react';
import { UserHeaderProps } from './HeaderUser.types';

export const HeaderUser = (props: UserHeaderProps) => {
  const { user, navigation } = props;
  const { auth } = useAuth();
  const navigate = useNavigate();
  const signOutSession = () => {
    auth && signOut(auth);
    navigate(AppRoutes.Logout)
  }

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
            {navigation.map((node, i) => (
              <DropdownMenu.Item href={node.button?.props?.href} key={i}>
                <Text variant="body-3" weight="medium">
                  {node.button?.message}
                </Text>
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Item onClick={() => signOutSession()}>
              <Text variant="body-3" weight="medium">
                Cerrar sesion
              </Text>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      ) : (
        <Button
          color="white"
          size="xlarge"
          href={AppRoutes.Login} rounded>
          <Icon svg={IconPerson} size={6} />
        </Button>
      )}
    </View>
  );
};
