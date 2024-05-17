import { action, loader } from '../../routes/_index';
import { useActionData, useFetcher, useLoaderData, useSubmit } from '@remix-run/react';
import { CategoryCarousel, Herobanner, ProductListForPLP, View, useResponsiveClientValue, Text, useOpenState, MiniCart, Button } from '@ducati/ui';
import { FormEvent, useEffect, useState } from 'react';
import { ProductData, CartEntry } from '@ducati/types';
import { handlePays, tx } from '../../server/transbank.server';


export const HomePage = () => {
  const { layout, product } = useLoaderData<typeof loader>();
  const { result } = useActionData<typeof action>() ?? {};
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState(result);

  const submit = useSubmit();

  const sendAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const addToCartQuantity: string = formData.get('addToCartQuantity') as string;
      const productCode: string = formData.get('productCode') as string;

      await submit({ addToCartQuantity, productCode }, { method: "post" });

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      setCart(result);
    }
  }, [result]);
  const handlePay = async () => {
    try {
      setIsLoading(true);
      const buyOrder = 'ridersRealm123'; // Genera tu buyOrder
      const sessionId = '123'; // Genera tu sessionId
      const amount = 1000; // El monto de la transacción
      const returnUrl = '/'; // La URL de retorno

      const paymentResponse = await handlePays()
      console.log('Payment Response:', paymentResponse);
      // Maneja la respuesta de pago según sea necesario
    } catch (error) {
      console.error('Error during payment:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View gap={10}>
      <Herobanner images={layout.homeImage} />
      <Button onClick={handlePay}>pagar</Button>
      <View paddingInline={useResponsiveClientValue({ s: 10, l: 20 })} direction="column" gap={10}>
        <CategoryCarousel images={layout.categoryImage} />
        <ProductListForPLP
          products={product}
          sendForm={sendAddProduct}
          isLoading={isLoading}
          result={cart} />
      </View>
    </View>
  );
};


