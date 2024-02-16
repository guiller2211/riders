import cn from 'classnames';

import { View } from '../../../../../atomic';
import styles from './DrawerContent.module.css';
import type { DrawerContentProps } from './DrawerContent.types';

export const DrawerContent = (props: DrawerContentProps) => {
  const { children, className, ...rest } = props;

  return (
    <View className={cn(styles.root, className)} padding={8} {...rest}>
      {children}
    </View>
  );
};
