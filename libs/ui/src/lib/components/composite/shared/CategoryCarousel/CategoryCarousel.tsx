import { useResponsiveClientValue } from '../../../../hooks';
import { Carousel, View, Image } from '../../../atomic';
import { CategoryCarouselProps } from './CategoryCarousel.types';

export const CategoryCarousel = (props: CategoryCarouselProps) => {
  const { images } = props;
  return (
    <View gap={10}>
      <Carousel visibleItems={useResponsiveClientValue({ s: 2,l: 3 })}>
        {images?.map((item, i) => (
          <View backgroundColor='white' key={i}>
            <Image src={item.src} />
          </View>
        ))}
      </Carousel>
    </View>
  );
};
