import cn from 'classnames';

import { Button, Text, View } from '../../../../../atomic';
import { IconX } from '../../../../../../icons';
import styles from './DrawerHeader.module.css';
import type { DrawerHeaderProps } from './DrawerHeader.types';

export const DrawerHeader = (props: DrawerHeaderProps) => {
  const {
    children,
    className,
    closeButtonOnTop = true,
    closeButtonProps,
    onClose,
    subtitle,
    title,
    ...rest
  } = props;

  const flexDirection = closeButtonOnTop ? 'row' : 'column-reverse';
  const alignItems = closeButtonOnTop ? 'center' : undefined;
  const buttonVariant = closeButtonOnTop ? 'ghost' : undefined;
  const textVariant = flexDirection === 'row' ? 'featured-2' : 'featured-1';
  const textWeight = flexDirection === 'row' ? 'regular' : 'bold';

  return (
    <View
      as="header"
      className={cn(styles.root, className)}
      padding={8}
      {...rest}
    >
      <View direction={flexDirection} align={alignItems}>
        <View.Item>
          <Text variant={textVariant} weight={textWeight}>
            {title}
          </Text>
        </View.Item>

        <View.Item
          attributes={{
            // TODO: we should define proper styling approach
            style: { alignSelf: closeButtonOnTop ? undefined : 'flex-end' },
          }}
          gapBefore="auto"
        >
          <Button
            icon={IconX}
            onClick={onClose}
            size="large"
            variant={buttonVariant}
            {...closeButtonProps}
          />
        </View.Item>
      </View>

      {subtitle && (
        <Text variant="body-3" weight="regular">
          {subtitle}
        </Text>
      )}

      {children}
    </View>
  );
};
