import {
  AddToCart,
  ImageGallery,
  View,
  Print,
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
  ProductSpecifications,
  FormControl,
  useAuth,
  Price,
  PlpHeader,
} from '@riders/ui';
import { useTypedLoaderData } from 'remix-typedjson';

import { FormEvent, useState } from 'react';
import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { action, loader } from '../../routes/product.$id';
import { AppRoutes } from '@riders/types';
import { setLikeProduct } from '../../service/user.data.service';
import { useNavigate } from 'react-router-dom';
import { TextProps } from 'reshaped';

const ProductDetailPage = () => {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { result } = useActionData<typeof action>() ?? {};
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string[] }>({});
  const navigate = useNavigate()
  const { auth } = useAuth();

  const submit = useSubmit();

  const priceText: TextProps = {
    color: 'neutral',
    weight: 'bold',
    variant: 'body-1',
  };

  const sendAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append('variant', JSON.stringify(selectedVariants));

    try {
      await submit(formData, { method: 'post' });
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
        const resultWishlist = await setLikeProduct(`${loaderData.product?.id}`, loaderData.user?.id!)
        setMessage(`${resultWishlist.message}`);
        setShowAlert(true);
        setIsLoading(false);
        setSuccess(resultWishlist.success)
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setMessage(`${error}`);
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRadioChange = (name: string, value: string) => {
    setSelectedVariants(prevState => ({
      ...prevState,
      [name]: [value]
    }));
  };
  return (
    <View
      direction="column"
      gap={useResponsiveClientValue({ l: 8, s: 0 })}
      paddingInline={useResponsiveClientValue({ l: 0, s: 6 })}
    >
       <PlpHeader
          category={loaderData.categoryBreadcrumbs}
          categoryName={loaderData?.categoryBreadcrumbs?.ancestors?.[0]?.name ?? ''}
        />
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
            </View>
          </View.Item>

          <View.Item columns={useResponsiveClientValue({ s: 12, l: 5 })} >
            <View direction="column" gap={5} backgroundColor='page' padding={8} borderRadius='large'>

              <View direction='row' gap={4}>
                <View direction='row' gap={1} align='center'>
                  <Text variant='body-2' weight='bold'>
                    SKU:
                  </Text>
                  <Text variant='caption-1' >
                    {loaderData.product?.sku}
                  </Text>
                </View>
                <View direction='row' gap={1} align='center'>
                  <Text variant='body-2' weight='bold'>
                    Categoria:
                  </Text>
                  <Text variant='caption-1' >
                    {loaderData.product?.categories?.name}
                  </Text>
                </View>
              </View>

              <Text variant='body-2' weight='bold'>
                Nombre: {loaderData.product?.name}
              </Text>

              {loaderData.variants?.map((variant, index) => {
                const hasMatchingSubvariant = variant.subvariant?.some((data) =>
                  loaderData.product?.variants?.some(_v => `${_v.id}` === `${data.id}`)
                );

                if (!hasMatchingSubvariant) return null;

                return (
                  <View.Item columns={6} key={variant.id}>
                    <FormControl>
                      <FormControl.Label>{variant.type}:</FormControl.Label>
                      <RadioGroup name={`variant_${index}`} onChange={(e: any) => handleRadioChange(`variant_${index}`, e.value)}>
                        <View gap={3} direction='row'>
                          {
                            variant.subvariant?.map((data) => {
                              const isChecked = loaderData.product?.variants?.some(_v => `${_v.id}` === `${data.id}`);
                              return isChecked && (
                                <Card key={data.id}>
                                  <View gap={3} direction="row" align="center">
                                    <Radio value={`${data.id}__${data.name}__${variant.type}`}>{data.name}</Radio>
                                  </View>
                                </Card>
                              );
                            })
                          }
                        </View>
                      </RadioGroup>
                      <FormControl.Error>
                        error
                      </FormControl.Error>
                    </FormControl>
                  </View.Item>
                );
              })}


              {loaderData.product?.value && (
                <View direction='row' gap={2}>

                  <Text variant='body-2' weight='bold'>
                    Precio:
                  </Text>
                  <Price
                    text={priceText}
                    locale={loaderData.product.value?.currency.isocode}
                    value={loaderData.product.value}
                  />
                </View>
              )}

              <Text variant='body-2' weight='bold'>
                Stock: {loaderData.product?.stock?.quantity}
              </Text>
              <View.Item columns={12}>
                <Divider />
              </View.Item>

              {loaderData.product?.id && (
                <View.Item columns={12}>
                  <AddToCart
                    productCode={loaderData.product?.sku ?? ''}
                    showInPlp
                    min={1}
                    stockAvailable={loaderData.product?.stock?.quantity!}
                    sendForm={sendAddProduct}
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

      {loaderData.product?.description && (
        <View.Item columns={12}>
          <View backgroundColor='white' borderRadius='large' padding={10}>

            <ProductSpecifications
              defaultActive
              specifications={[{ label: 'Descripcion', value: loaderData.product?.description }]}
            />

          </View>
        </View.Item>
      )}

    </View>
  );
};
export default ProductDetailPage;
