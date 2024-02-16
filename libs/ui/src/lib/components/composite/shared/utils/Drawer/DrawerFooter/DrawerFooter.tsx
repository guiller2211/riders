import cn from 'classnames';

import { View } from '../../../../../atomic';
import styles from './DrawerFooter.module.css';
import type { DrawerActionProps } from './DrawerFooter.types';

export const DrawerFooter = (props: DrawerActionProps) => {
  const { children, className, ...rest } = props;

  return (
    <View
      as="footer"
      className={cn(styles.root, className)}
      padding={8}
      {...rest}
    >
      {children}
    </View>
  );
};
