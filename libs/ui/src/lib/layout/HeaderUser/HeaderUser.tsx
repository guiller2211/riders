import { Button, View, Text, Actionable, Icon } from '../../components/atomic';
import type { HeaderUserProps } from './HeaderUser.types';
import { IconChevronRight, IconHome} from '../../icons';
import styles from './HeaderUser.module.css';

export const HeaderUser = (props: HeaderUserProps) => {
  const { isLoggedIn, name, onOpen, changeThema, isDark } = props;

  return (
    <View gap={1} direction="row" align="center" justify="center">
      {isLoggedIn && (
        <View gap={1} direction="column" backgroundColor="white">
          <Text variant="body-3">{name}</Text>
          <View direction="row" align="center">
            <Actionable onClick={onOpen}>
              <Text variant="body-3">{name}</Text>
            </Actionable>
            <Icon svg={IconChevronRight} />
          </View>
        </View>
      ) }
    </View>
  );
};
