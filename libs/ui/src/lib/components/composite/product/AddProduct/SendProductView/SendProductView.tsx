import { useState } from 'react';

import { Text, View } from '../../../../atomic';
import { AlertNotification, AlertNotificationEnum } from '../../../shared';
import { SendProduct, useResponsiveClientValue } from '@ducati/ui';
import { SendProductViewProps } from './SendProductView.types';

export const SendProductView = (props: SendProductViewProps) => {
  const { sendForm, isLoading, notification, success } = props;
  const [hideNotification, setHideNotification] = useState(false);

  return (
    <View align="center" paddingTop={{ l: 4 }}>
      <View direction="column" gap={12} align="center" paddingTop={useResponsiveClientValue({ l: 4 })}>
        <View width={useResponsiveClientValue({ s: undefined, l: 160 })} gap={6} direction="row">
          {notification && !hideNotification && (
            <View.Item columns={12}>
              <AlertNotification
                type={
                  success
                    ? AlertNotificationEnum.Success
                    : AlertNotificationEnum.Error
                }
                message={notification}
                close={() => setHideNotification(true)}
              />
            </View.Item>
          )}
          <View backgroundColor='white' padding={6} borderRadius="large">

            <View.Item columns={12}>
              <View paddingBottom={{ l: 3, s: 6 }}>
                <Text variant="featured-1">crear</Text>
              </View>
            </View.Item>
            <View.Item columns={12}>
              <SendProduct
                sendForm={sendForm}
                isLoading={isLoading}
              />
            </View.Item>
          </View>
        </View>
      </View>
    </View>
  );
};