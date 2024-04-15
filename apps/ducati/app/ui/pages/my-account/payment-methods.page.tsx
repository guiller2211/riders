import {
  AlertNotification,
  AlertNotificationEnum,
  I18nContext,
  Text,
  View,
} from '@ducati/ui';
import { useState } from 'react';
import { useTypedActionData, useTypedLoaderData } from 'remix-typedjson';

import type {
  action,
  loader,
} from '../../../routes/my-account.payment-methods';

export default function PaymenMethodsPage() {
  const loaderData = useTypedLoaderData<typeof loader>();

  const { result } = useTypedActionData<typeof action>() ?? {};

  const [showAlert, setShowAlert] = useState(true);

  return (
      <View direction="row" gap={12}>
        <View.Item columns={12}>
          <Text variant="featured-1">
            Metodos de Pago 
          </Text>
        </View.Item>
        {result && showAlert && (
          <View.Item columns={12}>
            <AlertNotification
              type={
                result.success
                  ? AlertNotificationEnum.Success
                  : AlertNotificationEnum.Error
              }
              message={result.message}
              close={() => setShowAlert(false)}
            />
          </View.Item>
        )}
        <View.Item columns={12}>
          {/* <PaymentMethods methods={loaderData.methods} /> */}
        </View.Item>
      </View>
  );
}
