import { View } from 'reshaped';
import { action, loader } from '../../routes/category';
import {
  Facets,
  PlpEmpty,
  ProductListForPLP,
  useResponsiveClientValue,
} from '@ducati/ui';
import { useActionData, useFetcher, useLoaderData, useSubmit } from '@remix-run/react';
import { FormEvent, useEffect, useState } from 'react';


export const CategoryPage = () => {
  const loaderData = useLoaderData<typeof loader>();
  const { result } = useActionData<typeof action>() ?? {};
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState(result);
  const fetcher = useFetcher();
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
            <ProductListForPLP
              products={loaderData.getProduct}
              sendForm={sendAddProduct}
              isLoading={isLoading}
              result={cart} />
          </View>
        ) : (
          <PlpEmpty />
        )}
      </View.Item>
    </View>
  );
};

