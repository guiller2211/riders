import { loader } from '../../routes/_index';
import { useLoaderData } from '@remix-run/react';
import { CategoryCarousel, Herobanner, ProductListForPLP, View, useResponsiveClientValue } from '@riders/ui';

export const HomePage = () => {
  const { layout, product } = useLoaderData<typeof loader>();

  return (
    <View gap={10}>
      <Herobanner images={layout.homeImage} />

      <View paddingInline={useResponsiveClientValue({ s: 10, l: 20 })} direction="column" gap={10}>
        <CategoryCarousel images={layout.categoryImage} />
        <ProductListForPLP products={product} />
      </View>
    </View>
  );
};


