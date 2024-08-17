import { Button, Divider, Link, Text, TextField, View } from '../../../../atomic';
import { PaginationProps } from './Pagination.types';
import { useEffect, useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '../../../../../icons';
import { useResponsiveClientValue } from 'reshaped';

const Pagination = (props: PaginationProps) => {
  const {
    itemsPerPage = 20,
    numPage,
    totalItems,
    currentPage = 1,
    hideButton,
    hideSearch,
  } = props;

  const [page, setPage] = useState(currentPage);
  const [pageNo, setPageNo] = useState('');
  const itemsByPage = itemsPerPage;
  const numberOfPages = Math.ceil(totalItems / itemsByPage);

  const pagesArray = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1,
  );
  const startIndex = (page - 1) * itemsByPage + 1;
  const endIndex = Math.min(page * itemsByPage, totalItems);

  useEffect(() => {
    setPage(currentPage || 1);
  }, [currentPage]);

  const handleChange = (value: number) => {
    window.scrollTo(0, 0);
    if (Number.isNaN(value)) {
      setPage(page);
      numPage(page);
    } else {
      if (value <= 0) {
        value = 1;
      } else if (value > numberOfPages) {
        value = numberOfPages;
      }

      setPage(value);
      numPage(value);
    }

    setPageNo('');
  };

  return (
    <View direction="row">
      <View.Item columns={12}>
        {!hideButton && (
          <View paddingBottom={4}>
            <Divider />
          </View>
        )}
      </View.Item>
      <View.Item columns={12}>
        <View
          direction="row"
          align="center"
          gap={useResponsiveClientValue({ s: 6, m: 0 })}
        >
          <View.Item columns={useResponsiveClientValue({ s: 12, m: !hideButton ? 2 : 12 })}>
            <View align={useResponsiveClientValue({ s: 'center', m: 'start' })}>
              <Text>
                Mostrando {startIndex} - {endIndex} de {totalItems}
              </Text>
            </View>
          </View.Item>
          {!hideButton && numberOfPages > 1 && (
            <View.Item columns={useResponsiveClientValue({ s: 12, m: 8 })}>
              <View direction="row" gap={2} justify="center">
                <Button
                  color="primary"
                  variant="outline"
                  disabled={page === 1}
                  icon={IconChevronLeft}
                  onClick={() => handleChange(page - 1)}
                />
                {pagesArray?.map((index) =>
                  page === index ? (
                    <Button key={index} color="primary" variant="solid">
                      {index}
                    </Button>
                  ) : (
                    <Button
                      key={index}
                      color="primary"
                      variant="outline"
                      onClick={() => handleChange(index)}
                    >
                      {index}
                    </Button>
                  ),
                )}

                <Button
                  color="primary"
                  variant="outline"
                  disabled={page === numberOfPages}
                  icon={IconChevronRight}
                  onClick={() => handleChange(page + 1)}
                />
              </View>
            </View.Item>
          )}
          {!hideSearch && numberOfPages > 1 && (
            <View.Item columns={useResponsiveClientValue({ s: 12, m: 2 })}>
              <View direction="row" align="center" justify='center' gap={3}>
                <Text align="center">
                  Ir a
                </Text>
                <View maxWidth={8}>
                  <TextField
                    name="pagination-go-page"
                    size="medium"
                    value={pageNo}
                    onChange={(e) => setPageNo(e.value)}
                  />
                </View>
                <Link onClick={() => handleChange(parseInt(pageNo))}>
                  <Text
                    color="primary"
                    align="center"
                    variant="body-3"
                    weight="medium"
                  >
                    Ir
                  </Text>
                </Link>
              </View>
            </View.Item>
          )}
        </View>
      </View.Item>
    </View>
  );
};

export default Pagination;
