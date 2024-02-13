import type { ImageProps } from 'reshaped';

import type { UILinkProps } from './UILink';
import type { UITextProps } from './UIText';

export type ProductsCarouselProps = {
  title?: string;
  text?: UITextProps;
  visibleItems?: number;
  hideDisplay?: boolean;
  items?: ProductCarouselProps[];
  blendMode?: boolean;
};

export type ProductCarouselProps = {
  code?: string;
  title?: UITextProps;
  description?: UITextProps;
  price?: UITextProps;
  link?: UILinkProps;
  image?: ImageProps;
};
