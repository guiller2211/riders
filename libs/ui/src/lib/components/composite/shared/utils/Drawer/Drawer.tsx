import cn from 'classnames';

import { DEFAULT_POSITION, DEFAULT_SIZE } from './Drawer.constants';
import { Modal } from '../../../../atomic';
import styles from './Drawer.module.css';
import type { DrawerProps } from './Drawer.types';
import { useResponsiveClientValue } from 'reshaped';

export const Drawer = (props: DrawerProps) => {
  const {
    children,
    className,
    padding = 8,
    position = DEFAULT_POSITION,
    size = DEFAULT_SIZE,
    ...rest
  } = props;

  return (
    <Modal
      className={cn(styles.root, className)}
      padding={padding}
      position={useResponsiveClientValue(position)}
      size={useResponsiveClientValue(size)}
      {...rest}
    >
      {children}
    </Modal>
  );
};
