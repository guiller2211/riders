import { View } from 'reshaped';
import { loader } from '../../routes/category.$';
import {
  Facets,
  PlpEmpty,
  ProductListForPLP,
  useResponsiveClientValue,
} from '@ducati/ui';
import { useLoaderData } from '@remix-run/react';

export const CategoryPage = () => {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <View
      direction={useResponsiveClientValue({ s: 'column', l: 'row' })}
      paddingTop={5}
      gap={6}
      paddingInline={20}
    >
      <View.Item columns={useResponsiveClientValue({ s: 12, l: 3 })}>
        <Facets facets={loaderData.facets} />
      </View.Item>

      <View.Item columns={useResponsiveClientValue({ s: 12, l: 9 })}>
        {loaderData.getProduct && loaderData.getProduct.length > 0 ? (
          <View direction="column" gap={4} paddingBottom={5}>
            <ProductListForPLP products={loaderData.getProduct} />
          </View>
        ) : (
          <PlpEmpty />
        )}
      </View.Item>
    </View>
  );
};
