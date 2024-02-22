import {
  Divider,
  Hidden,
  I18nContext,
  ImageGallery,
  View,
  IconBoxSeam,
  ProductUtils,
  useResponsiveClientValue,
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';
import { useState } from 'react';

import type { loader } from '../../routes/product.$skuId';
import { Product } from '@ducati/types';

const ProductDetailPage = () => {
  const loaderData = useTypedLoaderData<typeof loader>();
  const product: Product = loaderData.product && loaderData.product.length > 0
    ? loaderData.product[0] : null;


  return (
    <View
      direction="column"
      gap={useResponsiveClientValue({ l: 8, s: 0 })}
      paddingInline={useResponsiveClientValue({ s: 10,l: 20 })}
    >
      <View direction="row" gap={useResponsiveClientValue({ l: 6, s: 9 })}>
        <View.Item columns={useResponsiveClientValue({ s: 12, l: 7 })}>
          <View direction="column" gap={useResponsiveClientValue({ l: 12, s: 9 })}>
            {product && product.images && (
              <ImageGallery images={product.images} />
            )}
          </View>
        </View.Item>
      </View>


    </View>
  );
};
export default ProductDetailPage;
