import { LoaderProps, TextProps, ViewProps } from 'reshaped';

export type LoadingSizes = 'small' | 'medium' | 'large' | 'xlarge';
export type LoadingProps = {
  view?: ViewProps;
  loader?: LoaderProps;
  ariaLabel?: string;
  size?: LoadingSizes;
  text?: {
    message: string;
    props?: TextProps;
  };
};
