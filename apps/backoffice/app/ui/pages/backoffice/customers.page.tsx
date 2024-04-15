import { View } from 'reshaped';
import {
  BoxLoader,
  CustomersHistory,
  useResponsiveClientValue,
} from '@backoffice/ui';
import { useFetcher, useLoaderData } from '@remix-run/react';
import {  useState } from 'react';
import { loader } from '../../../routes/backoffice.customers';
import { Customer } from '@backoffice/types';

export const CustomersPage = () => {
  const loaderData = useLoaderData<typeof loader>();
  const [page, setPage] = useState(1);
  const [isLoadingFrom, setIsloadingForm] = useState(true);

  const items: Customer[] = loaderData?.Customers.map((customer: any) => {
    return customer;
  });

  const usersPerPage = 6;
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedCustomers: Customer[] = items.slice(startIndex, endIndex);

  return (
    <View
    paddingTop={5}
    paddingInline={10}
  >
    <View.Item columns={12}>
      {!isLoadingFrom ? (
        <View align='center' justify='center'>
          <BoxLoader />
        </View>
      ) : (
        <CustomersHistory users={displayedCustomers} />
      )}
      </View.Item>
    </View>
  );
};
