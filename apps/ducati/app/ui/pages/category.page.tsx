import { View } from 'reshaped';
import { loader } from '../../routes/category';
import {
  AlertNotification,
  AlertNotificationEnum,
  Facets,
  PlpEmpty,
  ProductListForPLP,
  useResponsiveClientValue,
} from '@ducati/ui';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { setLikeProduct } from '../../service/user.data.service';


export const CategoryPage = () => {
  const loaderData = useLoaderData<typeof loader>();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendAddProduct = async (value: string) => {

    try {
      setIsLoading(true);

      const result = await setLikeProduct(value, loaderData.uid)
      setMessage(`${result.message}`);
      setShowAlert(true);
      setIsLoading(false);
      setSuccess(result.success)
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
      direction={useResponsiveClientValue({ s: 'column', l: 'row' })}
      paddingTop={5}
      gap={6}
      paddingInline={useResponsiveClientValue({ s: 10, l: 20 })}
    >
      <View.Item columns={useResponsiveClientValue({ s: 12, l: 3 })}>
        <Facets facets={loaderData.facets} />
      </View.Item>

      <View.Item columns={useResponsiveClientValue({ s: 12, l: 9 })}>
        {loaderData.getProduct && loaderData.getProduct.length > 0 ? (
          <View direction="column" gap={4} paddingBottom={5}>
            {
              success &&
              <AlertNotification
                type={AlertNotificationEnum.Success}
                message={message}
                close={() => setShowAlert(false)}
              />
            }
            <ProductListForPLP
              products={loaderData.getProduct}
              sendForm={sendAddProduct}
              isLoading={isLoading} />
          </View>
        ) : (
          <PlpEmpty />
        )}
      </View.Item>
    </View>
  );
};

