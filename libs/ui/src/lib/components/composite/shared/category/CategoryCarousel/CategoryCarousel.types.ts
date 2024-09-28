import type { UIComposedProps } from '@smithcommerce/types';

export type CategoryCarouselProps = {
  title?: string;
  items: UIComposedProps[];
  showButton?: boolean;
  visibleItems?: number;
  hideDisplay?: boolean;
  blendMode?: boolean;
};
