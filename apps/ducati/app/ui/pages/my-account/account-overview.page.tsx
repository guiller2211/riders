import {
  I18nContext,
  Text,
  View,
} from '@ducati/ui';
import { useTypedLoaderData, useTypedRouteLoaderData } from 'remix-typedjson';

import type { loader as myAccountLoader } from '../../../routes/my-account';
import type { loader } from '../../../routes/my-account._index';

export default function AccountOverviewPage() {
  const loaderData = useTypedLoaderData<typeof loader>();
  const userProps =
    useTypedRouteLoaderData<typeof myAccountLoader>('routes/my-account')?.user;
  const user = userProps;

  return (
      <View direction="row" gap={12}>
        <View.Item columns={12}>
          {user && (
            <Text variant="featured-1">
              {`${user.firstName} ${user?.lastName}`}
            </Text>
          )}
        </View.Item>
        <View.Item columns={12}>
          {/* <AccountOverview /> */}
        </View.Item>
      </View>
  );
}
