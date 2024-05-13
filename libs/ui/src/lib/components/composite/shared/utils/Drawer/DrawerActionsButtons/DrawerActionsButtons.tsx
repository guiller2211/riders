import cn from 'classnames';

import { Button, View } from '../../../../../atomic';
import styles from './DrawerActionsButtons.module.css';
import type { DrawerActionsButtonsProps } from './DrawerActionsButtons.types';

export const DrawerActionsButtons = (props: DrawerActionsButtonsProps) => {
  const {
    className,
    secondaryLabel,
    secondaryHref,
    primaryLabel,
    primaryHref,
    fullWidth = true,
    onClick,
    type = 'button',
    ...rest
  } = props;
  const columns = secondaryHref && primaryHref ? 6 : 12;

  return (
    <View
      className={cn({ [styles.fullWidth]: fullWidth }, className)}
      direction="row"
      gap={4}
      {...rest}
    >
      {secondaryHref && (
        <View.Item columns={columns}>
          <Button
            color="black"
            size="xlarge"
            variant="outline"
            href={secondaryHref}
            fullWidth>
            {secondaryLabel}
          </Button>
        </View.Item>
      )}

      {(primaryHref || primaryLabel) && (
        <View.Item columns={columns}>
          <Button
            color="primary"
            size="xlarge"
            type={type}
            href={primaryHref}
            fullWidth>
            {primaryLabel}
          </Button>
        </View.Item>
      )}
    </View>
  );
};

