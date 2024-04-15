import {
  Button,
  Divider,
  I18nContext,
  IconCart2,
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

  const [page, setPage] = useState(1);



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
          <View.Item columns={12}>
            <View direction="row" gap={9}>
              <View.Item columns={12}>
                {/* <OrdersHistory orders={displayedOrders} /> */}
              </View.Item>
              <View.Item columns={12}>
                <View>
                  <Divider />
                </View>
                <View paddingTop={4}>
                  {/* <Pagination /> */}
                </View>
              </View.Item>
            </View>
          </View.Item>
    {/*       <View.Item columns={12}>
            <Empty />
          </View.Item> */}
      </View>
  );
}
