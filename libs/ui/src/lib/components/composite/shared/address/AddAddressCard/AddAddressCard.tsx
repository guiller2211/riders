import { Card } from 'reshaped';

import { IconPlusCircleDotted } from '../../../../../icons';
import { View, Button, Text, Icon } from '../../../../atomic';
import type { AddAddressCardProps } from './AddAddressCard.type';

export const AddAddressCard = (props: AddAddressCardProps) => {
  const { onChange } = props;

  return (
    <Card padding={0} onClick={onChange}>
      <Button variant="ghost" color="primary">
        <View
          paddingBlock={8}
          paddingInline={10}
          direction="column"
          textAlign="center"
          align="center"
          gap={4}
          justify="center"
        >
          <View.Item columns={12}>
            <Icon
              svg={IconPlusCircleDotted}
              size={7}
              color="primary"
              attributes={{
                style: {
                  margin: 'auto',
                },
              }}
            />
          </View.Item>
          <View.Item>
            <Text variant="body-2" weight="medium" color="neutral">
              Add New Address
            </Text>
          </View.Item>
        </View>
      </Button>
    </Card>
  );
};
