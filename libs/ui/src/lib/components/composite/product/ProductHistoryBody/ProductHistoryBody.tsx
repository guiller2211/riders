import { Fragment, useState } from 'react';
import { Avatar, Button, Tabs, Text, View } from '../../../atomic';
import { IconPerson } from '../../../../icons';
import { Drawer, DrawerContent, DrawerHeader } from '../../shared';
import { useOpenState } from '../../../../hooks/useOpenState';
import { CategoryData, ProductData } from '@backoffice/types';
import { ProductsHistoryBodyProps } from './ProductHistoryBody.types';
import { FormProduct } from '../FormProduct';
import { SendProduct } from '../AddProduct';

const renderField = (field: string, value: unknown) => {
  const renderText = (text: string) => (
    <View.Item columns="auto" grow>
      <Text variant="caption-1">{text}</Text>
    </View.Item>
  );
  const renderCategory = (category: CategoryData) => (
    <View.Item columns="auto" grow key={category.name}>
      <Text variant="caption-1">{category.name}</Text>
    </View.Item>
  );


  switch (field) {
    case 'categories':
      const categoryValue = value as CategoryData;
      return renderCategory(categoryValue);
    case 'id':
    case 'name':
    case 'sku':
    case 'active':
      return renderText(`${value ?? ''}`);
    default:
      return null;
  }
};

export const ProductHistoryBody = (props: ProductsHistoryBodyProps) => {
  const { products, searchTerm, sendForm, categories, sendProduct, isLoading } = props;
  const [open, onOpenDrawerHandler, onCloseDrawerHandler] = useOpenState();
  const [data, setData] = useState<ProductData | null>();
  const filteredProducts =
    searchTerm && searchTerm.trim() !== ''
      ? products?.filter(
        (_product) =>
          _product.id?.includes(searchTerm) ||
          _product.name?.includes(searchTerm) ||
          _product.sku?.includes(searchTerm) ||
          _product.categories?.name?.includes(searchTerm)
      )
      : products;

  const product = (data: ProductData) => {
    setData(data)
    onOpenDrawerHandler();
  }


  return (
    <View>
      {filteredProducts?.map((item, index) => (
        <View
          backgroundColor={index % 2 !== 0 ? 'disabled-faded' : 'page'}
          padding={3}
          paddingStart={2}
          direction="row"
          key={item.id}
        >
          {Object.entries(item).map(([field, value]) => (
            <Fragment key={`${item.sku}-${field}-${index}`}>
              {renderField(field, value)}
            </Fragment>
          ))}
          <View.Item columns="auto" grow >
            <View direction='row' gap={4}>
              <Button onClick={() => product(item)}>
                Select
              </Button>
              <Button loading={isLoading} color='critical' onClick={() => sendProduct(item)}>
                Eliminar
              </Button>
            </View>
          </View.Item>
        </View>
      ))}

      {
        data &&
        <Drawer active={open} onClose={onCloseDrawerHandler} position='bottom' size='auto'>
          <DrawerHeader
            title={data.name}
            onClose={onCloseDrawerHandler}
          />
          <DrawerContent>
            <SendProduct dataProduct={data} sendForm={sendForm} categories={categories} />
          </DrawerContent>
        </Drawer>
      }
    </View>
  );
};
