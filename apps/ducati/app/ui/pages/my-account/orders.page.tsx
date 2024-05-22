import {
  Button,
  Divider,
  I18nContext,
  IconCart2,
  OrdersHistory,
  Pagination,
  Text,
  View,
} from '@ducati/ui';
import { useState } from 'react';
import { useTypedLoaderData } from 'remix-typedjson';

import type { loader } from '../../../routes/my-account.orders._index';

const Empty = () => {
  return (
    <View direction="row" gap={9}>
      <View.Item columns={12}>
        <View gap={2}>
          <View.Item columns={12}>
            <Text variant="body-2" weight="medium">
              Vacio
            </Text>
            <Text variant="body-3">Vacio</Text>
          </View.Item>
        </View>
      </View.Item>

      <View.Item columns={12}>
        <Button icon={IconCart2} size="xlarge" color="primary">
          Vacio
        </Button>
      </View.Item>
    </View>
  );
};

export default function OrdersPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const { orders } = loaderData;
  const [page, setPage] = useState(1);

  const ordersPerPage = 10;
  const startIndex = (page - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const pageOrders = orders?.slice(startIndex, endIndex);
  const displayedOrders = pageOrders;

  const numPage = (num: number) => {
    setPage(num);
  };

  return (
    <View direction="row" gap={9}>
      <View.Item columns={12}>
        <Text variant="featured-1">
          Ordenes
        </Text>
      </View.Item>
      {orders && orders.length > 0 ? (
        <View.Item columns={12}>
          <View direction="row" gap={9}>
            <View.Item columns={12}>
              <OrdersHistory orders={displayedOrders} />
            </View.Item>
            <View.Item columns={12}>
              <View paddingTop={4}>
                <Pagination
                  hideSearch
                  numPage={numPage}
                  itemsPerPage={ordersPerPage}
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
