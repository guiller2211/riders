import type { ButtonProps, ViewProps } from 'reshaped';

export type DrawerHeaderProps = ViewProps & {
  closeButtonOnTop?: boolean;
  closeButtonProps?: ButtonProps;
  onClose?: ButtonProps['onClick'];
  subtitle?: string;
  title?: string;
};
