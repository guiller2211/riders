import {
  ProductHistory,
  View,
  Loader,
  displayedPerPage,
  BoxLoader
} from '@backoffice/ui';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { FormEvent, useEffect, useState } from 'react';
import { loader } from '../../../routes/backoffice.products';
import { CategoryData, ProductData, ProductVariant } from '@backoffice/types';
import { getCategories } from '../../../service/category.data.service';
import { addProduct, deleteProductById } from '../../../service/product.data.service';

export const ProductPage = () => {
  const loaderData = useLoaderData<typeof loader>();
  const [notification, setNotification] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isLoadingFrom, setIsloadingForm] = useState(true);
  const [categories, setCategories] = useState<{
    categoriesData: CategoryData[];
    productVariantsData: ProductVariant[];
  } | null>(null);

  const items: ProductData[] = loaderData?.products.map((customer: any) => {
    return customer;
  });

  const [displayedProductList, setDisplayedProductList] = useState<ProductData[]>(displayedPerPage(6, 1, items));

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    setIsloading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const authResult = await addProduct(formData);

      if (authResult && authResult.success) {
        setSuccess(authResult.success);
        setNotification(authResult.message);
        setIsloading(false);
        setDisplayedProductList(displayedPerPage(6, 1, authResult.data))

      } else {
        setNotification(authResult ? authResult.message : "error");
        setIsloading(false);
      }
    } catch (error) {
      console.error('Error:', error); // eslint-disable-line no-console
    } finally {
      setIsloading(false);
    }
  };

  const sendProduct = async (data: ProductData) => {
    try {
      setIsloading(true);
      const authResult = await deleteProductById(data.id ?? '');
      setIsloading(false);
      setDisplayedProductList(displayedPerPage(6, 1, authResult))

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      } finally {
        setIsloadingForm(false);
      }
    };

    fetchCategories();
  }, [displayedProductList]);

  return (
    <View
      paddingTop={5}
      paddingInline={10}
    >
      <View.Item columns={12}>
        {isLoadingFrom ? (
          <View align='center' justify='center'>
            <BoxLoader />
          </View>
        ) : (
          <ProductHistory
            products={displayedProductList}
            sendForm={submitForm}
            notification={notification}
            success={success}
            isLoading={isLoading}
            categories={categories}
            sendProduct={sendProduct} />
        )}
      </View.Item>
    </View>
  );
};