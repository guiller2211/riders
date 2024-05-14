import { Fragment } from 'react';

import type { OrderStatus } from '../../../../../types';
import type { PriceData } from '../../../../../types/PriceData.types';
import { Badge, Link, Text, View } from '../../../../atomic';
import type { OrdersHistoryBodyProps } from './OrderHistoryBody.types';
import { IconBoxArrowUpRight } from '../../../../../icons';
import { Price } from '../../../shared';
import { AppRoutes } from '@ducati/types';

const renderField = (field: string, value: unknown) => {
  switch (field) {
    case 'code':
      return (
        <View.Item columns="auto" grow>
          <Link
            icon={IconBoxArrowUpRight}
            variant="plain"
            href={`${AppRoutes.Orders}/${value}`}
          >
            <Text color="primary" variant="caption-1">{`${value}`}</Text>
          </Link>
        </View.Item>
      );
    case 'orderStatus': {
      const status = value as OrderStatus;
      return (
        <View.Item columns="auto" grow>
          <Badge color={status.data.badgeColor} rounded>
            <Text variant="caption-1">{status.name}</Text>
          </Badge>
        </View.Item>
      );
    }
    case 'createdDate':
    case 'poNumber':
      return (
        <View.Item columns="auto" grow>
          <Text variant="caption-1">{`${value}`}</Text>
        </View.Item>
      );
    case 'totalPriceWithTax': {
      const total = value as PriceData;
      return (
        <View.Item columns="auto" grow>
          <Price
            locale={total?.value?.currency.isocode}
            text={{ variant: 'caption-1' }}
            value={total?.value}
          />
        </View.Item>
      );
    }
    default:
      return null;
  }
};

const OrdersHistoryBody = (props: OrdersHistoryBodyProps) => {
  const { searchTerm, orders } = props;
  const filteredOrders =
    searchTerm && searchTerm.trim() !== ''
      ? orders?.filter((order) => {
          const codeString = order.code?.toString() || '';
          const statusString = order.status?.toString() || '';
          const createdDateString = order.createdDate?.toString() || '';
          const totalPriceString =
            order?.totalPriceWithTax?.value?.centsAmount.toString() || '';

          return (
            codeString.includes(searchTerm) ||
            statusString.includes(searchTerm) ||
            createdDateString.includes(searchTerm) ||
            totalPriceString.includes(searchTerm)
          );
        })
      : orders;

  return (
    <View>
      {filteredOrders?.map((item, index) => (
        <View
          backgroundColor={index % 2 !== 0 ? 'disabled-faded' : 'page'}
          padding={3}
          paddingStart={2}
          direction="row"
          key={item.code}
        >
          {Object.entries(item).map(([field, value]) => (
            <Fragment key={item.code + field}>
              {renderField(field, value)}
            </Fragment>
          ))}
        </View>
      ))}
    </View>
  );
};

export default OrdersHistoryBody;
