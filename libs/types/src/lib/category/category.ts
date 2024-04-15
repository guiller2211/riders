import type { Resource } from '../resource';

export interface CategoryData extends Resource {
  type?: any;
  name?: string;
  description?: string;
}
