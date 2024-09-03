import { loader } from '../../routes/_index';
import { useLoaderData } from '@remix-run/react';
import { AlertNotification, AlertNotificationEnum, CategoryCarousel, Herobanner, ProductListForPLP, View, useAuth, useResponsiveClientValue } from '@riders/ui';
import { useState } from 'react';
import { setLikeProduct } from '../../service/user.data.service';

export const HomePage = () => {
  const { layout, product } = useLoaderData<typeof loader>();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const { auth } = useAuth();

  const limitedProducts = product.slice(0, 3);

  const sendAddProduct = async (value: string) => {

    try {
      setIsLoading(true);

      const result = await setLikeProduct(value, auth?.currentUser?.uid ?? '')
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
    <View gap={10}>
      <Herobanner images={layout.homeImage} />

      <View paddingInline={useResponsiveClientValue({ s: 10, l: 20 })} direction="column" gap={10}>
        <CategoryCarousel images={layout.categoryImage} />
        <ProductListForPLP
          products={limitedProducts}
          sendForm={sendAddProduct}
          isLoading={isLoading}
          isGridView={isGridView}
        />
        {
          success &&
          <AlertNotification
            type={AlertNotificationEnum.Success}
            message={message}
            close={() => setShowAlert(false)}
          />
        }
      </View>
    </View>
  );
};


