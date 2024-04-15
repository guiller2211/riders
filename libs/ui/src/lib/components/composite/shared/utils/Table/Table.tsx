import { View } from '../../../../atomic';
import { TableHeader } from '../TableHeader';
import type { TableProps } from './Table.types';

export const Table = (props: TableProps) => {
  const { children, fieldNames,  open, searchTerm, showSearcher } = props;
  const search = (search: string) => {
    searchTerm(search);
  };

  return (
    <View>
      <View.Item columns={12}>
        <TableHeader
          showSearcher={showSearcher}
          fieldNames={fieldNames}
          searchTerm={search}
          open={open}
        />
      </View.Item>
      <View.Item columns={12}>
        <View direction="column" gap={3}>
          {children}
        </View>
      </View.Item>
    </View>
  );
};
