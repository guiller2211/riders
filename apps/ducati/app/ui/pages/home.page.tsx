import { loader } from '../../routes/_index';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { CategoryCarousel, Herobanner, ProductListForPLP, View, useResponsiveClientValue, Text, useOpenState, MiniCart } from '@ducati/ui';
import { FormEvent, useState } from 'react';
import { ProductData, CartEntry } from '@ducati/types';


export const HomePage = () => {
  const { layout, product } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);

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
    <View gap={10}>
      <Herobanner images={layout.homeImage} />

      <View paddingInline={useResponsiveClientValue({ s: 10, l: 20 })} direction="column" gap={10}>
        <CategoryCarousel images={layout.categoryImage} />
        <ProductListForPLP
          products={product}
          sendForm={sendAddProduct}
          isLoading={isLoading} />
      </View>
    </View>
  );
};


