import { ImageData } from '@ducati/types';
import type { ThumbPoisitionEnum } from '../ImageThumbnail';

export type ImageGalleryProps = {
  images?: ImageData[];
  thumbPosition?: ThumbPoisitionEnum;
};
