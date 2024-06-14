import type { UIDeviceImageProps } from '@riders/types';

export type ErrorHandlerProps = {
  heading?: string;
  description?: string;
  button?: string;
  image?: UIDeviceImageProps;
  error?: {
    status?: number;
    message?: string;
  };
  showTechnicalError?: boolean;
};
