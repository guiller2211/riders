import {
  ImageGallery,
  View,
  useResponsiveClientValue,
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';

import type { loader } from '../../routes/product.$skuId';

const ProductDetailPage = () => {
  const loaderData = useTypedLoaderData<typeof loader>();

  return (
    <View
      direction="column"
      gap={useResponsiveClientValue({ l: 8, s: 0 })}
      paddingInline={useResponsiveClientValue({ s: 10,l: 20 })}
    >
      <View direction="row" gap={useResponsiveClientValue({ l: 6, s: 9 })}>
        <View.Item columns={useResponsiveClientValue({ s: 12, l: 7 })}>
          <View direction="column" gap={useResponsiveClientValue({ l: 12, s: 9 })}>
            {loaderData.product && loaderData.product.images && (
              <ImageGallery images={loaderData.product.images} />
            )}
          </View>
        </View.Item>
      </View>


    </View>
  );
};
export default ProductDetailPage;
