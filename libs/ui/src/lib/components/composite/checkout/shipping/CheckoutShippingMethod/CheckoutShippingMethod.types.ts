import { PriceData } from '@riders/types';
import type { GenericCarouselProps, PriceProps } from '../../../shared';

export type ShippingMethodsProps = Omit<
  GenericCarouselProps<ShippingMethod>,
  'children'
> & {
  methods: ShippingMethod[];
  cart?: any
  onChangeShippingMethod?: (ShippingMethod: ShippingMethod) => void;
};
export type ShippingMethod = {
  id: string;
  name: string;
  price: PriceData;
  duration: string;
};
