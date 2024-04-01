import { View } from 'reshaped';
import { loader } from '../../routes/motorcycles.$';
import {
  Facets,
  PlpEmpty,
  ProductListForPLP,
  useResponsiveClientValue,
} from '@ducati/ui';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { FormEvent, useState } from 'react';

export const CategoryPage = () => {
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
            <ProductListForPLP products={loaderData.getProduct} sendForm={sendAddProduct} isLoading={isLoading} />
          </View>
        ) : (
          <PlpEmpty />
        )}
      </View.Item>
    </View>
  );
};
