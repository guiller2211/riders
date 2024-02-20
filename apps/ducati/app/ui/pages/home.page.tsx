import { loader } from '../../routes/_index';
import { useLoaderData } from '@remix-run/react';
import { CategoryCarousel, Herobanner, ProductListForPLP, View, useResponsiveClientValue } from '@ducati/ui';

 
export const HomePage = () => {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <View gap={10}>
      <Herobanner images={loaderData.layout.homeImage} />

      <View paddingInline={useResponsiveClientValue({ s: 10,l: 20 })} direction="column" gap={10}>
        <CategoryCarousel images={loaderData.layout.categoryImage} />
        <ProductListForPLP products={loaderData.getProduct} />
      </View>
    </View>
  );
};
