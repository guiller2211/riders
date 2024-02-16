import { Image } from "@ducati/types";

export type ImageThumbnailProps ={
  images?: Image[];
  selectedIndex: (index: number) => void;
}
