import { Badge, Link, Text, View } from '../../../../atomic';
import type { TableBodyProps } from './OrdersTable.types';
import { IconBoxArrowUpRight } from '../../../../../icons';

const OrdersTable = (props: TableBodyProps) => {
  return (
    <>
      {props.body.map((item, index) => (
        <View
          backgroundColor={index % 2 !== 0 ? 'disabled-faded' : 'page'}
          padding={3}
          paddingStart={2}
          direction="row"
          key={index}
        >
          {Object.entries(item).map(([field, value]) =>
            renderField(field, value),
          )}
        </View>
      ))}
    </>
  );
};

export default OrdersTable;

const badgeColor = (
  statusCode: number,
): 'primary' | 'positive' | 'critical' | undefined => {
  switch (statusCode) {
    case 1:
      return 'primary';
    case 2:
      return 'positive';
    case 3:
      return undefined;
    default:
      return 'critical';
  }
};

const renderField = (field: string, value: any) => {
  switch (field) {
    case 'numOrder':
      return (
        <View.Item columns="auto" grow>
          <Link icon={IconBoxArrowUpRight} variant="plain">
            <Text color="primary" variant="caption-1">{`${value}`}</Text>
          </Link>
        </View.Item>
      );
    case 'status':
      return (
        <View.Item columns="auto" grow>
          <Badge color={badgeColor(value.statusCode)} rounded>
            <Text variant="caption-1">{value.statusName}</Text>
          </Badge>
        </View.Item>
      );
    default:
      return (
        <View.Item columns="auto" grow>
          <Text variant="caption-1">{`${value}`}</Text>
        </View.Item>
      );
  }
};
