import React from 'react';
import { View, Text, Checkbox, Link } from '../../../../atomic';
import { FacetValueTypeEnum, FacetValuesProps } from './FacetValues.types';

export const FacetValues = (props: FacetValuesProps) => {
  return (
    props.visible && (
      <View.Item>
        {props.type === FacetValueTypeEnum.Link ? (
          <View direction="row">
            <Link variant="plain" color="inherit" href="?filter=">
              <Text variant="body-2">{props.name}</Text>
            </Link>
            <View.Item gapBefore="auto">
              <Text variant="body-3">{props.quantity}</Text>
            </View.Item>
          </View>
        ) : (
          <View.Item>
            <Checkbox checked={props.selected}>{props.name}</Checkbox>
          </View.Item>
        )}
      </View.Item>
    )
  );
};

