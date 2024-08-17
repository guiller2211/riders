import { PriceData, ShippingMethod } from '@riders/types';
import type { GenericCarouselProps, PriceProps } from '../../../shared';

export type ShippingMethodsProps = Omit<
  GenericCarouselProps<ShippingMethod>,
  'children'
> & {
  methods: ShippingMethod[];
  cart?: any
  onChangeShippingMethod?: (ShippingMethod: ShippingMethod) => void;
};

