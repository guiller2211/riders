import { IconFilter } from '../../../../icons';
import { Icon, View, Text } from '../../../atomic';
import { useTranslation } from '../../../../hooks';
import React from 'react';

export const PlpEmpty = () => {
  const translate = useTranslation();

  return (
    <View direction="column" gap={6}>
      <Icon svg={IconFilter} size={10} />
      <Text variant="featured-1" weight="regular" align="center">
        {translate('empty.title')}
      </Text>
      <Text variant="featured-3" weight="regular" align="center">
        {translate('empty.subTitle')}
      </Text>
    </View>
  );
};
