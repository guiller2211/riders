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
    // TODO: add prop layout = 'vertical' | 'horizontal'
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
            fullWidth
            href={secondaryHref}
          >
            {secondaryLabel}
          </Button>
        </View.Item>
      )}

      {primaryHref && (
        <View.Item columns={columns}>
          <Button color="primary" size="xlarge" fullWidth href={primaryHref}>
            {primaryLabel}
          </Button>
        </View.Item>
      )}
    </View>
  );
};
