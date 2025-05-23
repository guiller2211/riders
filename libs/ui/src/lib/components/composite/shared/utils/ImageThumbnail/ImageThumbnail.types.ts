import { ImageData } from "@riders/types";

export type ImageThumbnailProps = {
  images?: ImageData[];
  visibleItems?: number;
  selectedIndex: (index: number) => void;
  position?: ThumbPoisitionEnum;
};

export enum ThumbPoisitionEnum {
  Left = 'LEFT',
  Bottom = 'BOTTOM',
}
