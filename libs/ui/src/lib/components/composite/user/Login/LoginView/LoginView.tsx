import { useState } from 'react';

import { useResponsiveClientValue } from '../../../../../hooks';
import { Text, View } from '../../../../atomic';
import LoginForm from '../LoginForm';
import type { LoginViewProps } from './LoginView.types';
import { AlertNotification, AlertNotificationEnum } from '../../../shared';

const LoginView = (props: LoginViewProps) => {
  const { sendForm, isLoading, notification } = props;
  const [hideNotification, setHideNotification] = useState(false);

  return (
    <View direction="column" gap={12} align="center" paddingTop={useResponsiveClientValue({ l: 4 })}>
      <View width={useResponsiveClientValue({ s: undefined, l: 100 })} gap={6} direction="row">
        {notification && !hideNotification && (
          <View.Item columns={12}>
            <AlertNotification
              type={AlertNotificationEnum.Error}
              message={notification}
              close={() => setHideNotification(false)}
            />
          </View.Item>
        )}
        <View backgroundColor='white' padding={6} borderRadius="large">

          <View.Item columns={12}>
            <View paddingBottom={useResponsiveClientValue({ l: 3, s: 6 })}>
              <Text variant="featured-1">
                Login
              </Text>
            </View>
          </View.Item>
          <View.Item columns={12}>
            <LoginForm sendForm={sendForm} isLoading={isLoading} />
          </View.Item>
        </View>
      </View>
    </View>
  );
};
export default LoginView;
