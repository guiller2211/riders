import { View } from 'reshaped';
import {
  Table,
  useResponsiveClientValue,
} from '@backoffice/ui';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { FormEvent, useState } from 'react';
import { loader } from 'apps/backoffice/app/routes/backoffice.products';
import { User } from '@backoffice/types';

export const ProductPage = () => {
  const loaderData = useLoaderData<typeof loader>();
  const [page, setPage] = useState(1);
  const items: User[] = loaderData?.Customers.map((customer: any) => {
    return customer;
  });

  const usersPerPage = 6;
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedOrders: User[] = items.slice(startIndex, endIndex);

  return (
    <View
      direction={useResponsiveClientValue({ s: 'column', l: 'row' })}
      paddingTop={5}
      gap={6}
      paddingInline={useResponsiveClientValue({ s: 10, l: 20 })}
    >
      <View.Item columns={useResponsiveClientValue({ s: 12, l: 9 })}>
        {/* <UsersHistory users={displayedOrders} /> */}
      </View.Item>
    </View>
  );
};
