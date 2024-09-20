import { Outlet, useLocation } from '@remix-run/react';
import {
  AccountQuickLinks,
  Loading,
  useIsMobile,
  View,
} from '@riders/ui';
import { useState } from 'react';
import { useTypedLoaderData } from 'remix-typedjson';

import type { loader } from '../../../routes/my-account';

const MyAccountPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loaderData = useTypedLoaderData<typeof loader>();
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <View
      direction="row"
      gap={12}
      paddingBlock={0}
      paddingInline={{ s: 6, l: 6 }}
    >
      <View.Item columns={12}>
        <AccountQuickLinks
          selected={location.pathname}
          isLoading={setIsLoading}
        />
      </View.Item>
      <View.Item columns={12}>
        {!isLoading ? (
          <View paddingInline={isMobile ? 0 : 30}>
            <Outlet />
          </View>
        ) : (
          <Loading
            ariaLabel="layout:loader.ariaLabel"
            size="xlarge"
            text={{ message: 'Cargando' }}
            view={{
              align: 'center',
              justify: 'center',
              paddingBlock: 20,
              paddingInline: 0,
            }}
          />
        )}
      </View.Item>
    </View>
  );
};
export default MyAccountPage;
