import { action, loader } from '../../routes/_index';
import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { CategoryCarousel, Herobanner, ProductListForPLP, View, useResponsiveClientValue } from '@ducati/ui';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  const { layout, product } = useLoaderData<typeof loader>();
  const [isLoading, setIsLoading] = useState(false);

  const sendAddProduct = async (value: string) => {

    try {
      setIsLoading(true);


    } catch (error) {
      console.error("Error al enviar el formulario:", error);
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
          products={product}
          sendForm={sendAddProduct}
          isLoading={isLoading} />
      </View>
    </View>
  );
};


