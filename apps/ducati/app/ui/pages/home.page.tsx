import { action, loader } from '../../routes/_index';
import { useActionData, useFetcher, useLoaderData, useSubmit } from '@remix-run/react';
import { CategoryCarousel, Herobanner, ProductListForPLP, View, useResponsiveClientValue, Text, useOpenState, MiniCart } from '@ducati/ui';
import { FormEvent, useEffect, useState } from 'react';
import { ProductData, CartEntry } from '@ducati/types';


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

  return (
    <View gap={10}>
      <Herobanner images={layout.homeImage} />

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


