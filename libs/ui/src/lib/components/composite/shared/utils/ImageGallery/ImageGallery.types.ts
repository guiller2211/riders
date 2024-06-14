import { ImageData } from '@riders/types';
import type { ThumbPoisitionEnum } from '../ImageThumbnail';

export type ImageGalleryProps = {
  images?: ImageData[];
  thumbPosition?: ThumbPoisitionEnum;
};
