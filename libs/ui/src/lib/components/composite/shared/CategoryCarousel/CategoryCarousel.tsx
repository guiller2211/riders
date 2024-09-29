import { IconArrowRight, IconEyeFill, IconMotorcycles } from '../../../../icons';
import { useResponsiveClientValue } from '../../../../hooks';
import { Carousel, View, Image, Text, Icon, Button, Link, Popover } from '../../../atomic';
import { CategoryCarouselProps } from './CategoryCarousel.types';
import { AppRoutes } from '@riders/types';

export const CategoryCarousel = (props: CategoryCarouselProps) => {
  const { category } = props;

  return (
    <View gap={10}>
      <Carousel visibleItems={useResponsiveClientValue({ s: 1, l: 3 })}>

        {category.map((item, i) => {
          const image = item.image?.find((_image) => _image.default);

          return (
            <View backgroundColor='white' key={i} direction='column'>
              <View
                direction="column"
                padding={6}
                borderColor="neutral"
                borderRadius="medium"
                backgroundColor="neutral"
                gap={3}
              >
                <Link href={`${AppRoutes.Product}/${item.id}`}>
                  <Image
                    {...item.image}
                    displayMode="contain"
                    src={image?.url}
                    height={70}
                    width="100%"
                  />
                </Link>

                <Text variant="body-2" weight="bold" maxLines={2}>
                  <Popover triggerType="hover">
                    <Popover.Trigger>
                      {(attributes: any) => (
                        <Link
                          attributes={attributes}
                          href={`${AppRoutes.Product}/${item.id}`}
                          variant="plain"
                          color="inherit"
                        >
                          {item.name}
                        </Link>
                      )}
                    </Popover.Trigger>
                    <Popover.Content>
                      <View>{item.name}</View>
                    </Popover.Content>
                  </Popover>
                </Text>

                <Text variant="body-3">
                  SKU: {item.sku}{' '}
                </Text>

                <Text variant="body-3">
                  Stock: {item.stock?.quantity} {' '}
                </Text>

                <Button
                  size='xlarge'
                  color="primary"
                  variant="solid"
                  type="submit"
                  href={AppRoutes.Product + '/' + item.id}
                  fullWidth
                  icon={IconEyeFill}
                >
                  Ver Producto
                </Button>
                <Button
                  size='xlarge'
                  color="primary"
                  variant="solid"
                  href={AppRoutes.Category + '/' + item.categories?.name}
                  endIcon={IconArrowRight}
                >
                  {item.categories?.name}
                </Button>
              </View>
            </View>
          );
        })}
      </Carousel>
    </View>
  );
};
