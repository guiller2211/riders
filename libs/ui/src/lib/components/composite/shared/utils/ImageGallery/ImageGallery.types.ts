import { Image } from '@ducati/types';
import type { ThumbPoisitionEnum } from '../ImageThumbnail';

export type ImageGalleryProps = {
  images?: Image[];
  thumbPosition?: ThumbPoisitionEnum;
};
