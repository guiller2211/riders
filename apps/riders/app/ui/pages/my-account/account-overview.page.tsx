import {
  AccountOverview,
  Text,
  View,
} from '@riders/ui';

import type { loader as myAccountLoader } from '../../../routes/my-account';
import type { loader } from '../../../routes/my-account._index';
import { useLoaderData, useRouteLoaderData } from '@remix-run/react';

export default function AccountOverviewPage() {
  const loaderData = useLoaderData<typeof loader>();
  const userProps =
    useRouteLoaderData<typeof myAccountLoader>('routes/my-account')?.user;
  const user = userProps;

  return (
    <View direction="row" gap={12}>
      <View.Item columns={12}>
        {user && (
          <Text variant="featured-1">
            {user.firstName} {user?.lastName}
          </Text>
        )}
      </View.Item>
      <View.Item columns={12}>
        <AccountOverview />
      </View.Item>
    </View>
  );
}
