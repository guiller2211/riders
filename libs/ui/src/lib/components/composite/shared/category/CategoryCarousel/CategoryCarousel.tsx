import {
  Button,
  Carousel,
  Container,
  Hidden,
  Image,
  Link,
  Text,
  View,
} from '../../../../atomic';
import { IconArrowRight } from '../../../../../icons';
import type { CategoryCarouselProps } from './CategoryCarousel.types';

const CategoryCarousel = (carousel: CategoryCarouselProps) => {
  return (
    <View direction="column">
      <Container>
        <View paddingBottom={6}>
          <Text variant="featured-2" weight="bold">
            {carousel.title}
          </Text>
        </View>
      </Container>
      {carousel.items && (
        <Carousel
          gap={6}
          navigationDisplay={carousel.hideDisplay ? 'hidden' : undefined}
          visibleItems={{ l: carousel.visibleItems, s: 2 }}
        >
          {getItemList(carousel)}
        </Carousel>
      )}
    </View>
  );
};

function getItemList(carousel: CategoryCarouselProps) {
  return carousel.items.map((item, index) => {
    return (
      <View key={index} gap={5} direction="row">
        <View.Item columns={12}>
          <Link href={item.link?.props?.href}>
            <View
              borderColor="neutral"
              backgroundColor="page-faded"
              borderRadius="small"
              textAlign="center"
              align="center"
              padding={3}
            >
              <Hidden hide={{ s: true, l: false }}>
                <Image
                  src={item.image?.desktop?.src}
                  attributes={{
                    style: {
                      mixBlendMode: carousel.blendMode ? 'darken' : 'unset',
                    },
                  }}
                />
              </Hidden>
              <Hidden hide={{ s: false, l: true }}>
                <Image
                  src={item.image?.mobile?.src}
                  attributes={{
                    style: {
                      mixBlendMode: carousel.blendMode ? 'darken' : 'unset',
                    },
                  }}
                />
              </Hidden>
            </View>
          </Link>
        </View.Item>
        <View.Item columns={12}>
          <View textAlign="center">
            <Text variant="featured-3" weight="bold">
              {item.text?.message}
            </Text>
          </View>
        </View.Item>

        {carousel.showButton && (
          <View.Item columns={12}>
            <View align="center">
              <Button
                color="primary"
                variant="ghost"
                size="xlarge"
                href={item.link?.props?.href}
                endIcon={IconArrowRight}
              >
                Shop Now
              </Button>
            </View>
          </View.Item>
        )}
      </View>
    );
  });
}

export default CategoryCarousel;
