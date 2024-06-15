import { useEffect, useState } from 'react';
import { Scrim, View, Image, Text, Button } from '../../../atomic';
import { HerobannerProps } from './Herobanner.types';
import { StandaloneSearchBox, useResponsiveClientValue } from '@riders/ui';
import { AppRoutes } from '@riders/types';

export const Herobanner = (props: HerobannerProps) => {
  const { images } = props;
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => {
        const homeImage = images;
        return prevIndex === (homeImage?.length ?? 0) - 1 ? 0 : prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images]);

  const imagePath = images?.[imageIndex]?.src || '';

  return (
    <View overflow="hidden"  >
      <Scrim backgroundSlot={<Image src={imagePath} width="100%" />} >
        <View align='center' direction="column" gap={5}>
          <Text variant={useResponsiveClientValue({ s: 'title-6', l: 'title-2' })} weight="bold">
            SIENTETE EN LIBERTAD
          </Text>

          <Text variant={useResponsiveClientValue({ s: 'featured-3', l: 'featured-1' })} weight="bold">
            Conozca todo sobre calidad.
          </Text>

          <StandaloneSearchBox />

          <Text variant={useResponsiveClientValue({ s: 'featured-3', l: 'featured-1' })}weight="bold">
            -O-
          </Text>

          <Button color="critical" size="large" rounded href={AppRoutes.Category}>
            <Text variant={useResponsiveClientValue({ s: 'featured-3', l: 'featured-1' })} weight="bold">
              {' '}
              VER TODO EL INVENTARIO
            </Text>
          </Button>
        </View>
      </Scrim>
    </View>
  );
};
