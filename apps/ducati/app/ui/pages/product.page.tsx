import {
  AddToCart,
  ImageGallery,
  View,
  Print,
  Share,
  ProductOverview,
  Divider,
  useResponsiveClientValue,
  Text,
  Button,
  IconHeart,
  RadioGroup,
  Radio,
  Card
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';

import { FormEvent, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import { loader } from '../../routes/product.$id';
import { CartEntry, TypeVariamEnum } from '@ducati/types';

const ProductDetailPage = () => {
  const loaderData = useTypedLoaderData<typeof loader>();
  const [isLoading, setIsLoading] = useState(false);
  const fetcher = useFetcher();

  const sendAddProduct = async (e: FormEvent<HTMLFormElement>): Promise<CartEntry | null> => {
    e.preventDefault();
  
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const addToCartQuantity: string = formData.get('addToCartQuantity') as string;
      const productCode: string = formData.get('productCode') as string;
  
      const product = await fetcher.submit({ addToCartQuantity, productCode }, { method: "post" });
  
      return product!;
  
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      return null;
    } finally {
      setIsLoading(false);
      return null;
    }
  };



  return (
    <View
      direction="column"
      gap={useResponsiveClientValue({ l: 8, s: 0 })}
      paddingInline={useResponsiveClientValue({ l: 0, s: 6 })}
    >
      <View.Item columns={12}>
        <View direction="row" align="center">

          <View.Item columns={useResponsiveClientValue({ l: 1 })}>
            <View direction="row" gap={4} justify="end">
              <Print />
            </View>
          </View.Item>
        </View>
      </View.Item>
      <View.Item columns={12}>
        <View direction="row" gap={useResponsiveClientValue({ l: 6, s: 9 })}>
          <View.Item columns={useResponsiveClientValue({ s: 12, l: 7 })}>
            <View direction="column" gap={useResponsiveClientValue({ l: 12, s: 9 })} backgroundColor='page' padding={8} borderRadius='large'>
              {loaderData.product?.image && (
                <View.Item columns={12}>
                  <ImageGallery images={loaderData.product.image} />
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
            <View direction="column" gap={5} backgroundColor='page' padding={8} borderRadius='large'>

              <Text variant='body-2' weight='bold'>
                SKU: {loaderData.product?.sku}
              </Text>

              <Text variant='body-2' weight='bold'>
                Categoria: {loaderData.product?.categories?.name}
              </Text>

              <RadioGroup name="color" >
                <View gap={1} direction='column'>
                  <Text variant='body-1' weight='bold'>
                    Color:
                  </Text>
                  <View gap={4} direction='row'>
                    {loaderData.product?.variants
                    ?.filter(_c => _c.type === TypeVariamEnum.Color)
                    ?.map((_c) => (
                      <Card >
                        <View gap={3} direction="row" align="center">
                          <Radio value={_c.name!}>{_c.name}</Radio>
                        </View>
                      </Card>
                    ))}
                  </View>
                </View>
              </RadioGroup>

              <RadioGroup name="size" >
                <View gap={1} direction='column'>
                  <Text variant='body-1' weight='bold'>
                    Talla:
                  </Text>
                  <View gap={4} direction='row'>
                    {loaderData.product?.variants
                      ?.filter(_s => _s.type === TypeVariamEnum.Size)
                      ?.sort((a, b) => (a.name! > b.name! ? 1 : -1))
                      ?.reverse()
                      ?.map((_s) => (
                        <Card key={_s.id}>
                          <View gap={3} direction="row" align="center">
                            <Radio value={_s.name!}>{_s.name}</Radio>
                          </View>
                        </Card>
                      ))}
                  </View>
                </View>
              </RadioGroup>


              {loaderData.product?.value && (
                <Text variant='body-2' weight='bold'>
                  Precio: ${loaderData.product?.value.centsAmount}
                </Text>
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

              <Button size='xlarge' color="primary" icon={IconHeart} fullWidth>
                Favorito
              </Button>

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
