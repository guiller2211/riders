import type { Resource } from '../resource';
import type { SearchMetadata } from '../search';

export interface Category extends Resource {
  name?: string;
  description?: string;
  slug?: string;
  ancestors?: Category[];
  children?: Category[];
  searchMetadata?: SearchMetadata;
}
