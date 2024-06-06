import { loader } from '../../routes/_index';
import { useLoaderData } from '@remix-run/react';
import { Button, CategoryCarousel, Herobanner, ProductListForPLP, View, useResponsiveClientValue } from '@ducati/ui';
import { useState } from 'react';

export const HomePage = () => {
  const { layout, product } = useLoaderData<typeof loader>();

  return (
    <View gap={10}>
      <Herobanner images={layout.homeImage} />
      <Button href='/send'>Enviar</Button>
      <View paddingInline={useResponsiveClientValue({ s: 10, l: 20 })} direction="column" gap={10}>
        <CategoryCarousel images={layout.categoryImage} />
        <ProductListForPLP products={product} />
      </View>
    </View>
  );
};


