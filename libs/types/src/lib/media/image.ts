import type { Resource } from '../resource';

export interface ImageData extends Resource {
  url: string;
  dimensions?: ImageDimensions;
  label?: string;
  default?: boolean;
  description?: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
}
