import {
  AddToCart,
  ImageGallery,
  View,
  Print,
  Share,
  ProductOverview,
  Divider,
  useResponsiveClientValue,
  Text
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';

import type { loader } from '../../routes/motorcycles.$skuId';
import { FormEvent, useState } from 'react';
import { useFetcher } from '@remix-run/react';

const ProductDetailPage = () => {
  const loaderData = useTypedLoaderData<typeof loader>();
  const [isLoading, setIsLoading] = useState(false);
  const fetcher = useFetcher();

  const sendAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const addToCartQuantity: string = formData.get('addToCartQuantity') as string;
    const productCode: string = formData.get('productCode') as string;

    await fetcher.submit({ addToCartQuantity, productCode }, { method: "post" });
    setIsLoading(false)
  };
  console.log(loaderData.product)
  return (
    /*   <View
        direction="column"
        gap={useResponsiveClientValue({ l: 8, s: 0 })}
        paddingInline={useResponsiveClientValue({ s: 10, l: 20 })}
      >
        <View direction="row" gap={useResponsiveClientValue({ l: 6, s: 9 })}>
          <View.Item columns={useResponsiveClientValue({ s: 12, l: 7 })}>
            <View direction="column" gap={useResponsiveClientValue({ l: 12, s: 9 })}>
              {loaderData.product && loaderData.product.images && (
                <ImageGallery images={loaderData.product.images} />
              )}
            </View>
          </View.Item>
          
          <View.Item>
  
          <Text>
            {loaderData.product?.description}
          </Text>
          {
            loaderData.product?.sku
            &&
            <AddToCart
              productCode={loaderData.product?.sku}
              stockAvailable={230}
              sendForm={sendAddProduct}
              isLoading={isLoading} />
          }
          </View.Item>
        </View>
  
  
      </View> */
    <View
      direction="column"
      gap={{ l: 8, s: 0 }}
      paddingInline={{ l: 0, s: 6 }}
    >
      <View.Item columns={12}>
        <View direction="row" align="center">

          <View.Item columns={{ l: 1 }}>
            <View direction="row" gap={4} justify="end">
              <Print />
              <Share />
            </View>
          </View.Item>
        </View>
      </View.Item>
      <View.Item columns={12}>
        <View direction="row" gap={useResponsiveClientValue({ l: 6, s: 9 })}>
          <View.Item columns={useResponsiveClientValue({ s: 12, l: 7 })}>
            <View direction="column" gap={useResponsiveClientValue({ l: 12, s: 9 })} backgroundColor='page' padding={8} borderRadius='large'>
              {loaderData.product?.images && (
                <View.Item columns={12}>
                  <ImageGallery images={loaderData.product.images} />
                </View.Item>
              )}
              {loaderData.product?.description && (
                <View.Item columns={12}>
                  <Text variant="featured-3" weight="bold" color="neutral">
                  Descripcion
                  </Text>
                  <ProductOverview summary={loaderData.product?.description} />
                </View.Item>
              )}
            </View>
          </View.Item>

          <View.Item columns={useResponsiveClientValue({ s: 12, l: 5 })} >
            <View direction="column" gap={8} backgroundColor='page' padding={8} borderRadius='large'>

              {loaderData.product?.price && (
                <View.Item columns={12}>
                  {loaderData.product?.price.value.centsAmount}
                </View.Item>
              )}
              <View.Item columns={12}>
                <Divider />
              </View.Item>


              {loaderData.product?.id && (
                <View.Item columns={12}>
                  <AddToCart
                    productCode={loaderData.product?.id}
                    showInPlp
                    stockAvailable={230}
                    sendForm={sendAddProduct}
                    isLoading={isLoading}
                  />
                </View.Item>
              )}
            </View>
          </View.Item>
        </View>
      </View.Item>

      <View.Item columns={12}>
        <View paddingTop={useResponsiveClientValue({ l: 4, s: 8 })} paddingBottom={useResponsiveClientValue({ l: 2, s: 8 })}>
          <Divider />
        </View>
      </View.Item>

    </View>
  );
};
export default ProductDetailPage;
