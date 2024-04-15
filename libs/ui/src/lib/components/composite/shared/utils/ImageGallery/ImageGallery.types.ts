import { ImageData } from '@backoffice/types';
import type { ThumbPoisitionEnum } from '../ImageThumbnail';

export type ImageGalleryProps = {
  images?: ImageData[];
  thumbPosition?: ThumbPoisitionEnum;
};
