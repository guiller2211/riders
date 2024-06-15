import { FacetValueTypeEnum } from '@riders/ui';
import type { Resource } from '../resource';

export interface CategoryData extends Resource {
  name?: string;
  type?: string;
  description?: string;
  productCount?: number; 
}
export interface FacetValue {
  name: string;
  type: FacetValueTypeEnum;
  quantity: number;
}