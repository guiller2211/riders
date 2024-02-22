import { IconFilter } from '../../../../icons';
import { Icon, View, Text } from '../../../atomic';
import React from 'react';

export const PlpEmpty = () => {

  return (
    <View direction="column" gap={6}>
      <Icon svg={IconFilter} size={10} />
      <Text variant="featured-1" weight="regular" align="center">
        Vacio
      </Text>
      <Text variant="featured-3" weight="regular" align="center">
        Vacio
      </Text>
    </View>
  );
};
