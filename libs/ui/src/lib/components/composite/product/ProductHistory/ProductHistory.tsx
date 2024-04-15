import { FormEvent, useState } from 'react';

import { Drawer, DrawerContent, DrawerHeader, Table } from '../../shared';
import { View } from '../../../atomic';
import { ProductHistoryBody } from '../ProductHistoryBody';
import { ProductHistoryProps } from './ProductHistory.types';
import { useOpenState } from '../../../../hooks/useOpenState';
import { SendProductView } from '../AddProduct';

export const ProductHistory = (props: ProductHistoryProps) => {
  const { products, sendForm, categories, isLoading, sendProduct } = props;
  const fieldNames = ['Id', 'Nombre', 'Tipo', 'Sku', 'Disponibilidad', 'Acciones'];
  const [searchTerm, setSearchTerm] = useState('');
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();


  const search = (search: string) => {
    setSearchTerm(search);
  };

  return (
    <Table
      showSearcher
      fieldNames={fieldNames}
      searchTerm={search}
      open={onOpenDrawerHandler}
    >
      <ProductHistoryBody
        products={products}
        searchTerm={searchTerm}
        sendForm={sendForm}
        categories={categories}
        sendProduct={sendProduct}
        isLoading={isLoading}
      />
      <Drawer active={open} onClose={onCloseDrawerHandler} position='bottom' size='auto'>
        <DrawerHeader
          title=""
          onClose={onCloseDrawerHandler}
        />
        <DrawerContent>
          <SendProductView sendForm={sendForm} categories={categories} isLoading={isLoading} />
        </DrawerContent>
      </Drawer>
    </Table>
  );
};
