import type {
  Category,
  Image,
  Price,
  ProductAttributeDefinition,
  ProductVariant,
} from '@ducati/types';


export class ProductUtils {
  static getPrimaryCategory(
    categories?: Category[],
    primaryCategoryId?: string,
  ) {
    return categories?.find((category) => category.id === primaryCategoryId);
  }

  static getBrand(variant?: ProductVariant) {
    return variant?.attributes?.find((attribute) => attribute.id === 'designer')
      ?.value?.label;
  }

  static getManufacturerNumber(variant?: ProductVariant) {
    return variant?.attributes?.find(
      (attribute) => attribute.id === 'manufacturerProductNumber',
    )?.value;
  }


  static getImages(images?: Image[]) {
    return images?.map((image) => image.url);
  }

  static getPrice(price?: Price, locale?: string) {
    return { value: price?.value, locale };
  }

/*   static getDiscount(discount?: ProductDiscount, locale?: string) {
    return { value: discount?.value, locale };
  } */

  static getSpecifications(
    variant?: ProductVariant,
    attrDefinitions?: ProductAttributeDefinition[],
  ) {
    return variant?.attributes?.map((attribute, index) => {
      return {
        code: attribute.id,
        label: attrDefinitions && attrDefinitions[index]?.label,
        value: attribute.value,
      };
    });
  }


}
