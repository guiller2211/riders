import { Fragment } from 'react';

import type { PriceData } from '../../../../../types/PriceData.types';
import { Badge, Link, Text, View } from '../../../../atomic';
import type { OrdersHistoryBodyProps } from './OrderHistoryBody.types';
import { IconBoxArrowUpRight } from '../../../../../icons';
import { Price } from '../../../shared';
import { AppRoutes, OrderStatus } from '@riders/types';
import { ColorUtils, FormatDate } from '@riders/ui';



const renderField = (field: string, value: unknown) => {
  switch (field) {
    case 'numOrder':
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
    case 'status': {
      const status = value as OrderStatus
      return (
        <View.Item columns="auto" grow>
          <Badge color={ColorUtils.badgeColor(status)} rounded>
            <Text variant="caption-1">{status}</Text>
          </Badge>
        </View.Item>
      );
    }
    case 'createdDate':
      const formattedDate = FormatDate.format(value);
      return (
        <View.Item columns="auto" grow>
          <Text variant="caption-1">{`${formattedDate}`}</Text>
        </View.Item>
      );

    case 'totalPrice': {
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
      ? orders?.filter((_o) => {
        const codeString = _o.numOrder?.toString() || '';
        const statusString = _o.status?.toString() || '';
        const createdDateString = _o.createdDate?.toString() || '';
        const totalPriceString =
          _o?.totalPriceWithTax?.value?.centsAmount.toString() || '';

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
          key={`${item.id}-${item.id}`}
        >
          {Object.entries(item).map(([field, value]) => (
            <Fragment key={`${item.id}-${field}-${index}`}>
              {renderField(field, value)}
            </Fragment>
          ))}
        </View>
      ))}
    </View>
  );
};

export default OrdersHistoryBody;
