import { useState } from 'react';

import { useResponsiveClientValue } from '../../../../../hooks';
import { Text, View } from '../../../../atomic';
import LoginForm from '../LoginForm';
import type { LoginViewProps } from './LoginView.types';
import { AlertNotification, AlertNotificationEnum } from '../../../shared';

const LoginView = (props: LoginViewProps) => {
  const { sendForm, isLoading, notification, showOTP } = props;
  const [hideNotification, setHideNotification] = useState(false);

  return (

    <View
      gap={12}
      align="center"
      justify='center'
      paddingTop={useResponsiveClientValue({ s: undefined, l: 20 })}
      direction="row">
      {notification && !hideNotification && (
        <View.Item columns={12}>
          <AlertNotification
            type={AlertNotificationEnum.Error}
            message={notification}
            close={() => setHideNotification(!hideNotification)}
          />
        </View.Item>
      )}
      <View
        gap={6}
        width={100}
        padding={6}
        borderRadius="large"
        shadow='overlay'
        borderColor='critical'
        justify="center"
        align="center"
        direction='column'
      >
        <Text variant="featured-1">
          Login
        </Text>
        <LoginForm sendForm={sendForm} showOTP={showOTP} isLoading={isLoading} />
      </View>
    </View>

  );
};
export default LoginView;
