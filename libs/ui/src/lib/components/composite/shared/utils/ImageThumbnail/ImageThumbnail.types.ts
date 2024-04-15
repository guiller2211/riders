import { ImageData } from "@backoffice/types";

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
