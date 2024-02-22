import { Button, Text, TextField, View } from '../../../../atomic';
import { PaginationProps } from './Pagination.types';
import { useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '../../../../../icons';

const Pagination = (props: PaginationProps) => {
  const [page, setPage] = useState(1);
  const totalNumPage = props.itemPerPage === 0 ? 1 : props.itemPerPage;
  const count = Math.ceil(props.totalItems / totalNumPage);
  const countArray = Array.from({ length: count }, (_, index) => index + 1);


  const showing = page * props.itemPerPage;
  const fullDemo = showing > props.totalItems ? props.totalItems : showing;
  const handleChange = (value: number) => {
    if (isNaN(value) || value === 0 || value > Math.ceil(props.totalItems / props.itemPerPage) || value < 0) {
      setPage(page);
      props.numPage(page);
    } else {
      setPage(value);
      props.numPage(value);
    }
  };

  return (
    <View direction="row" align="center">
      <View.Item columns={2}>
        <Text>
        10 de 10
        </Text>
      </View.Item>
      <View.Item columns={7} gapBefore={props.showInput ? 0 : 'auto'}>
        <View direction="row" gap={2} justify="center">
          <Button color="primary" variant="outline" icon={IconChevronLeft} onClick={() => handleChange(page - 1)} />

          {countArray?.map((index) => (
            <Button key={index} color="primary" variant={page === index ? 'solid' : 'outline'}>
              {index}
            </Button>
          ))}

          <Button color="primary" variant="outline" icon={IconChevronRight} onClick={() => handleChange(page + 1)} />
        </View>
      </View.Item>
      {props.showInput && (
        <View.Item columns={3}>
          <View direction="row" align="center" justify="end">
            <View.Item columns={5}>
              <Text align="center"> siguiente</Text>
            </View.Item>
            <View.Item columns={2}>
              <TextField
                name="pagination-go-page"
                size="medium"
                onChange={(e) => handleChange(parseInt(e.value))}
              />
            </View.Item>
            <View.Item columns={2}>
              <Text color="primary" align="center" variant='body-3' weight='medium'>
                siguiente
              </Text>
            </View.Item>
          </View>
        </View.Item>
      )}
    </View>
  );
};

export default Pagination;
