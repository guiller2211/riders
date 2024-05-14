import { View } from '../../../../atomic';
import TableHeader from '../TableHeader';
import type { TableProps } from './Table.types';

const Table = (props: TableProps) => {
  const search = (search: string) => {
    props.searchTerm(search);
  };

  return (
    <View>
      <View.Item columns={12}>
        <TableHeader
          showSearcher={props.showSearcher}
          nameSpace={props.nameSpace}
          fieldNames={props.fieldNames}
          searchTerm={search}
        />
      </View.Item>
      <View.Item columns={12}>
        <View direction="column" gap={3}>
          {props.children}
        </View>
      </View.Item>
    </View>
  );
};

export default Table;
