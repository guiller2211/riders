import type { Resource } from '../resource';

export interface Image extends Resource {
  url: string;
  dimensions?: ImageDimensions;
  label?: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
}
