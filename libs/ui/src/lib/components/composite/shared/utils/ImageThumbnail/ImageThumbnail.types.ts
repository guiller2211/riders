import { Image } from "@ducati/types";

export type ImageThumbnailProps = {
  images?: Image[];
  visibleItems?: number;
  selectedIndex: (index: number) => void;
  position?: ThumbPoisitionEnum;
};

export enum ThumbPoisitionEnum {
  Left = 'LEFT',
  Bottom = 'BOTTOM',
}
