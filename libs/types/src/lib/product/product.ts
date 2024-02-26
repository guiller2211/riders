import type { Resource } from '../resource';
import type { Category } from '../category';
import type { Enum } from '../primitive';
import type { Price, PriceSummary } from '../price';
import type { Image } from '../media';

export interface AbstractProduct extends Resource {
  name?: string;
  description?: string;
  sku?: string;
  type?: ProductType;
  categories?: Category[];
//  primaryCategoryId?: string;
  price?: Price;
  attributes?: ProductAttribute[];
  image?: Image;
  images?: Image[];
  // discountPrice?: string;
  // discounts?: string;
  // inStock?: string;
}

export interface Product extends AbstractProduct {
  variants?: ProductVariant[];
}

export interface ProductVariant extends AbstractProduct {
  baseProductId?: string;
  sequenceId?: number;
}

export interface ProductVariantDefinition {
  primaryVariant?: ProductVariant;
  // variantAttributes: Map<number, ProductAttribute>;
}

export interface ProductType extends Resource {
  name?: string;
  description?: string;
  attributeDefinitions?: ProductAttributeDefinition[];
}

/** Dynamic Product Attributes * */

export interface ProductAttribute extends Resource {
  typeDefinition?: ProductAttributeDefinition;
  value?: any;
  swatchUrl?: string;
}

export interface ProductAttributeDefinition extends Resource {
  type: ProductAttributeType;
  label?: string;
}

export interface ProductAttributeType {
  id: ProductAttributeTypeId;
}

export interface ProductAttributeLocalizedEnumType
  extends ProductAttributeType {
  id: ProductAttributeTypeId.LOCALIZED_ENUM;
  values?: Enum[];
}

export interface ProductAttributeEnumType extends ProductAttributeType {
  id: ProductAttributeTypeId.ENUM;
  values?: Enum[];
}

export interface ProductAttributeSetType extends ProductAttributeType {
  id: ProductAttributeTypeId.SET;
  elementType?: ProductType;
}

export interface ProductAttributeNestedType extends ProductAttributeType {
  id: ProductAttributeTypeId.NESTED;
  elementReferenceType: ProductType;
}

export interface ProductAttributeReferenceType extends ProductAttributeType {
  id: ProductAttributeTypeId.REFERENCE;
  referenceType: string;
}

export enum ProductAttributeTypeId {
  BOOLEAN = 'boolean',
  LOCALIZED_TEXT = 'ltext',
  TEXT = 'text',
  LOCALIZED_ENUM = 'lenum',
  ENUM = 'enum',
  NUMBER = 'number',
  MONEY = 'money',
  DATE = 'date',
  REFERENCE = 'reference',
  SET = 'set',
  NESTED = 'nested',
  ANY = 'any',
}
