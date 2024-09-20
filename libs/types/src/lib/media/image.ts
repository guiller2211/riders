import type { Resource } from '../resource';

export interface ImageData extends Resource {
  url: string;
  dimensions?: ImageDimensions;
  label?: string;
  default?: boolean;
  description?: string;
  islayout?: boolean;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImagenLayout extends ImageData{}
