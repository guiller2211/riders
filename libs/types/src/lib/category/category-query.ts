import type { PagedQuery, Results } from '../misc';
import type { Category } from './category';

export interface CategoryQuery extends PagedQuery {
  ids?: string[];
  name?: string;
  slug?: string;
  ancestorSystemIds?: string[] | null;
}

export enum CategoryQueryExpansion {
  ANCESTORS = 'ANCESTORS',
  CHILDREN = 'CHILDREN',
}

export interface CategoryResults extends Results {
  items: Category[];
}
