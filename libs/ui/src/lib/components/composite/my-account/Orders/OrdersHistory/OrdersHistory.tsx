import { useState } from 'react';

import { View } from '../../../../atomic';
import type { OrdersHistoryProps } from './OrdersHistory.types';
import OrdersHistoryBody from '../OrdersHistoryBody';
import Table from '../../../shared/utils/Table';

const OrdersHistory = (props: OrdersHistoryProps) => {
  const nameSpace = 'orders';
  const [searchTerm, setSearchTerm] = useState('');
  const { orders } = props;

  const searchOrders = (search: string) => {
    setSearchTerm(search);
  };

  return (
    <View>
      <Table
        nameSpace={nameSpace}
        searchTerm={searchOrders}
      >
        <OrdersHistoryBody orders={orders} searchTerm={searchTerm} />
      </Table>
    </View>
  );
};

export default OrdersHistory;
