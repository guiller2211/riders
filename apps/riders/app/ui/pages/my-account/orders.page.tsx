import {
  Empty,
  OrderData,
  OrdersHistory,
  Pagination,
  Text,
  View,
  displayedPerPage,
} from '@riders/ui';
import { useEffect, useState } from 'react';

import type { loader } from '../../../routes/my-account.orders._index';
import { useLoaderData } from '@remix-run/react';

export default function OrdersPage() {
  const loaderData = useLoaderData<typeof loader>();
  const { orders } = loaderData;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<OrderData[]>(loaderData?.orders || []);
  const [displayedOrdersList, setDisplayedOrdersList] = useState<OrderData[]>([]);
  const displayPage = 10;
  const numPage = (num: number) => {
    setPage(num);
  };

  useEffect(() => {
    const displayedOrders = displayedPerPage(displayPage, page, items);
    setDisplayedOrdersList(displayedOrders);
  }, [items, page]);

  return (
    <View direction="row" gap={9} backgroundColor='white'
      padding={10}
      borderRadius='large'>
      <View.Item columns={12}>
        <Text variant="featured-1">
          Ordenes
        </Text>
      </View.Item>
      {orders && orders.length > 0 ? (
        <View.Item columns={12}>
          <View direction="row" gap={9}>
            <View.Item columns={12}>
              <OrdersHistory orders={displayedOrdersList} />
            </View.Item>
            <View.Item columns={12}>
              <View paddingTop={4}>
                <Pagination
                  hideSearch
                  numPage={numPage}
                  itemsPerPage={displayPage}
                  totalItems={orders.length ? orders.length : 0}
                />
              </View>
            </View.Item>
          </View>
        </View.Item>
      )
        :
        <View.Item columns={12}>
          <Empty />
        </View.Item>
      }
    </View>
  );
}
