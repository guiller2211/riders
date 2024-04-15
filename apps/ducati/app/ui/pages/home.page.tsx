import { loader } from '../../routes/_index';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { CategoryCarousel, Herobanner, ProductListForPLP, View, useResponsiveClientValue, Text } from '@ducati/ui';
import { FormEvent, useState } from 'react';


export const HomePage = () => {
  const loaderData = useLoaderData<typeof loader>();
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

  return (
    <View gap={10}>
      <Herobanner images={loaderData.layout.homeImage} />

      <View paddingInline={useResponsiveClientValue({ s: 10, l: 20 })} direction="column" gap={10}>
        <CategoryCarousel images={loaderData.layout.categoryImage} />
        <ProductListForPLP products={loaderData.product} sendForm={sendAddProduct} isLoading={isLoading} />

      </View>

    </View>
  );
};


