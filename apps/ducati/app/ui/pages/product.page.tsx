import {
  AddToCart,
  ImageGallery,
  View,
  Print,
  ProductOverview,
  Divider,
  useResponsiveClientValue,
  Text,
  Button,
  IconHeart,
  RadioGroup,
  Radio,
  Card,
  AlertNotification,
  AlertNotificationEnum,
} from '@ducati/ui';
import { useTypedLoaderData } from 'remix-typedjson';

import { FormEvent, useState } from 'react';
import { useActionData, useSubmit } from '@remix-run/react';
import { action, loader } from '../../routes/product.$id';
import { AppRoutes, TypeVariamEnum } from '@ducati/types';
import { setLikeProduct } from '../../service/user.data.service';
import { useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { result } = useActionData<typeof action>() ?? {};
  const [size, setSize] = useState<{ type: TypeVariamEnum, name: string }>();
  const [color, setColor] = useState<{ type: TypeVariamEnum, name: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

  const submit = useSubmit();

  const sendAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await submit(e.currentTarget, { method: 'post' });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const sendWishlistProduct = async () => {

    try {
      setIsLoading(true);
      if (loaderData.user?.anonymous || loaderData.user == undefined) {
        navigate(AppRoutes.Login)
      } else {
        const result = await setLikeProduct(`${loaderData.product?.id}`, loaderData.user?.id!)
        setMessage(`${result.message}`);
        setShowAlert(true);
        setIsLoading(false);
        setSuccess(result.success)
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setMessage(`${error}`);
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      direction="column"
      gap={useResponsiveClientValue({ l: 8, s: 0 })}
      paddingInline={useResponsiveClientValue({ l: 0, s: 6 })}
    >
      {
        success &&
        <AlertNotification
          type={AlertNotificationEnum.Success}
          message={message}
          close={() => setShowAlert(false)}
        />
      }
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
                        <Card key={`${_c.id}`}>
                          <View gap={3} direction="row" align="center">
                            <Radio
                              value={_c.name!}
                              onChange={(e) => setSize({ type: TypeVariamEnum.Color, name: _c.name! })}>
                              {_c.name}
                            </Radio>
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
                            <Radio
                              value={_s.name!}
                              onChange={(e) => setColor({ type: TypeVariamEnum.Size, name: _s.name! })}>
                              {_s.name}
                            </Radio>
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
                    productCode={loaderData.product?.sku ?? ''}
                    showInPlp
                    stockAvailable={230}
                    sendForm={sendAddProduct}
                    variant={[size!, color!]}
                    result={result}
                  />
                </View.Item>
              )}

              <Button
                onClick={sendWishlistProduct}
                size='xlarge'
                color="primary"
                icon={IconHeart}
                loading={isLoading}
                fullWidth>
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
