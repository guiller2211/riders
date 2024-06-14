import type { IconProps } from 'reshaped';

import type { UIButtonProps } from './UIButton';
import type { UITextProps } from './UIText';
import type { UILinkProps } from './UILink';
import type { UIDeviceImageProps } from './UIDeviceImage';

export interface UIComposedType {}

export interface UIComposedProps {
  code?: string;
  preHeading?: UITextProps;
  heading?: UITextProps;
  subHeading?: UITextProps;
  button?: UIButtonProps;
  link?: UILinkProps;
  text?: UITextProps;
  image?: UIDeviceImageProps;
  icon?: IconProps;
  nodes?: UIComposedProps[];
}
