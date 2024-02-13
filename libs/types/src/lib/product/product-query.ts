import type { Product } from './product';
import type { PagedQuery, Results } from '../misc';

export interface ProductQuery extends PagedQuery {
  baseProductIds?: string[];
  productVariantIds?: string[];
  productName?: string;
  slug?: string;
  categorySystemId?: string;
  facets?: string[];
}

export enum ProductQueryExpansion {
  PRODUCT_TYPE = 'PRODUCT_TYPE',
  CATEGORIES = 'CATEGORIES',
  CATEGORIES_ANCESTORS = 'CATEGORIES_ANCESTORS',
  VARIANTS = 'VARIANTS',
  VARIANTS_ATTRIBUTES = 'VARIANTS_ATTRIBUTES',
  VARIANTS_IMAGES = 'VARIANTS_IMAGES',
}

export interface ProductResults extends Results {
  items: Product[];
}
