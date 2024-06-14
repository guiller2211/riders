import { useEffect, useState } from 'react';
import { Scrim, View, Image, Text, Button } from '../../../atomic';
import { HerobannerProps } from './Herobanner.types';
import { StandaloneSearchBox, useResponsiveClientValue } from '@riders/ui';

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
    <View overflow="hidden" height={useResponsiveClientValue({ s: 120, l: 250 })}>
      <Scrim backgroundSlot={<Image src={imagePath} width="100%" />} position='full'>
        <View align='center' direction="column" gap={5}>
          <Text variant={useResponsiveClientValue({ s: 'title-6', l: 'title-2' })} weight="bold">
            ¡SABER MÁS, ANTES!
          </Text>

          <Text variant={useResponsiveClientValue({ s: 'featured-3', l: 'featured-1' })} weight="bold">
            Conozca todo sobre el vehículo antes de decidirse.
          </Text>

          <Text variant={useResponsiveClientValue({ s: 'featured-3', l: 'featured-1' })} weight="bold">
            {' '}
            BUSCA 956 VEHÍCULOS
          </Text>

          <StandaloneSearchBox />

          <Text variant={useResponsiveClientValue({ s: 'featured-3', l: 'featured-1' })}weight="bold">
            -O-
          </Text>

          <Button color="critical" size="large" rounded>
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
