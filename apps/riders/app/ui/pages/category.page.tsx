import { View } from 'reshaped';
import { loader } from '../../routes/category.$';
import {
  AlertNotification,
  AlertNotificationEnum,
  Facets,
  Pagination,
  PlpEmpty,
  ProductListForPLP,
  displayedPerPage,
  useResponsiveClientValue,
  ProductGridListToggleForPLP,
  Modal,
  useToggle,
  Dismissible,
  PlpHeader
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
  const [isGridView, setIsGridView] = useState(true);
  const { active, activate, deactivate } = useToggle(false);

  useEffect(() => {
    const displayedProducts = displayedPerPage(displayPage, page, items);
    setDisplayedProductsList(displayedProducts);
  }, [items, page]);

  const displayPage = 6;
  const numPage = (num: number) => {
    setPage(num);
  };


  const sendAddProduct = async (value: string) => {
    try {
      setIsLoading(true);
      const result = await setLikeProduct(value, loaderData.uid);
      setMessage(result.message);
      setShowAlert(true);
      setSuccess(result.success);
      activate();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setMessage(`${error}`);
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const viewGrid = (value: boolean) => {
    setIsGridView(value);
  };
  return (
    <View
      direction={useResponsiveClientValue({ s: 'column', l: 'row' })}
      paddingTop={5}
      gap={6}
      paddingInline={useResponsiveClientValue({ s: 10, l: 20 })}
    >
      <View.Item columns={12}>
        <PlpHeader
          categoryName={'Categorias'}
          category={loaderData.categories}
        />
      </View.Item>

      <View.Item columns={useResponsiveClientValue({ s: 12, l: 3 })}>
        <Facets facets={loaderData.facets} />
      </View.Item>

      <View.Item columns={useResponsiveClientValue({ s: 12, l: 9 })}>
        {items && items.length > 0 ? (
          <View direction="column" gap={4} paddingBottom={5}>
            <Modal active={active} onClose={deactivate}>
              <View gap={3}>
                <View backgroundColor="neutral-faded" >
                  <AlertNotification
                    type={AlertNotificationEnum.Success}
                    message={message}
                    close={deactivate}
                  />
                </View>
              </View>
            </Modal>
            <ProductGridListToggleForPLP
              isGridView={viewGrid}
              view={isGridView}
            />
            <ProductListForPLP
              products={displayedProductsList}
              sendForm={sendAddProduct}
              isLoading={isLoading}
              isGridView={isGridView}
            />
            <Pagination
              numPage={numPage}
              itemsPerPage={displayPage}
              totalItems={items.length ? items.length : 0}
            />
          </View>
        ) : (
          <PlpEmpty />
        )}
      </View.Item>
    </View>
  );
};

