import React from 'react';
import type { CarouselProps } from 'reshaped';
import { Carousel as ReshapedCarousel } from 'reshaped';

const Carousel = (props: CarouselProps) => {
  return <ReshapedCarousel {...props} />;
};
export default Carousel;
