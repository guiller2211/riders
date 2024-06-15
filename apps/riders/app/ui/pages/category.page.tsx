import { View } from 'reshaped';
import { loader } from '../../routes/category';
import {
  AlertNotification,
  AlertNotificationEnum,
  Facets,
  Pagination,
  PlpEmpty,
  ProductListForPLP,
  displayedPerPage,
  useResponsiveClientValue,
} from '@riders/ui';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { setLikeProduct } from '../../service/user.data.service';
import { ProductData } from '@riders/types';


export const CategoryPage = () => {
  const loaderData = useLoaderData<typeof loader>();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ProductData[]>(loaderData?.getProduct || []);
  const [displayedProductsList, setDisplayedProductsList] = useState<ProductData[]>([]);
  const displayPage = 5;
  const numPage = (num: number) => {
    setPage(num);
  };

  useEffect(() => {
    const displayedProducts = displayedPerPage(displayPage, page, items);
    setDisplayedProductsList(displayedProducts);
  }, [items, page]);

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
              products={displayedProductsList}
              sendForm={sendAddProduct}
              isLoading={isLoading} />

            <Pagination
              hideSearch
              numPage={numPage}
              itemsPerPage={displayPage}
              totalItems={loaderData.getProduct.length ? loaderData.getProduct.length : 0}
            />

          </View>
        ) : (
          <PlpEmpty />
        )}
      </View.Item>
    </View>
  );
};

