import type { ViewProps } from 'reshaped';

export type DrawerActionsButtonsProps = ViewProps & {
  fullWidth?: boolean;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};
