import { useState } from 'react';

import { Actionable, Icon, Text, TextField, View } from '../../../../atomic';
import { IconArrowDown, IconArrowUp } from '../../../../../icons';
import type { TableHeaderProps } from './TableHeaderProps.types';

const TableHeader = (props: TableHeaderProps) => {
  const { searchTerm, showSearcher, fieldNames } = props;
  const [showIconIndex, setShowIconIndex] = useState<number | null>(null);
  const [icon, setIcon] = useState<typeof IconArrowDown>(IconArrowDown);

  const sort = (index: number) => {
    setShowIconIndex(index);
    setIcon((prevIcon) =>
      prevIcon === IconArrowDown ? IconArrowUp : IconArrowDown,
    );
  };

  const search = (search: string) => {
    searchTerm(search);
  };


  return (
    <View>
      <View.Item columns={12}>
        {showSearcher && (
          <View paddingBottom={6}>
            <TextField
              name="order"
              placeholder='Buscar'
              size="xlarge"
              onChange={(e) => search(e.value)}
            />
          </View>
        )}
      </View.Item>
      <View backgroundColor="disabled" padding={3} direction="row">
        {fieldNames.map((_, index) => {
          return (
            <View.Item columns="auto" grow key={index}>
              <Actionable onClick={() => sort(index)}>
                <View direction="row">
                  <View.Item>
                    <Text color="primary" variant="caption-1">
                      {fieldNames[index]}
                    </Text>
                  </View.Item>
                  {showIconIndex === index && (
                    <View.Item>
                      <Icon svg={icon} color="primary" />
                    </View.Item>
                  )}
                </View>
              </Actionable>
            </View.Item>
          );
        })}
      </View>
    </View>
  );
};

export default TableHeader;
